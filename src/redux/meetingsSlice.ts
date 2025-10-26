import { createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import { meetingsAdapter } from "./adapters.ts";
import { DateString, Meeting, MeetingId } from "./Meeting.ts";
import { rules } from "../rules/rules.ts";
import { api } from "../api/api.ts";
import { isFuture, isPast, isSameDay, isToday } from "date-fns";

type StatusType = "error" | "loading" | "fulfilled";

interface MeetingsState {
  meetings: EntityState<Meeting, MeetingId>;
  status?: StatusType;
}

const initialState: MeetingsState = {
  meetings: meetingsAdapter.getInitialState(),
};

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(api.fetchMeetingsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(api.fetchMeetingsThunk.fulfilled, (state, action) => {
        meetingsAdapter.upsertMany(state.meetings, action.payload);
        state.status = "fulfilled";
      })
      .addCase(api.fetchMeetingsThunk.rejected, (state) => {
        state.status = "error";
      });
  },
  selectors: {
    meetings: (state) => state.meetings,
  },
});

export const { selectors: meetingsSelectors } = meetingsSlice;

export const meetingsAdapterSelectors = meetingsAdapter.getSelectors(
  meetingsSelectors.meetings,
);

export const selectMeetingsIdsByCalendarId = createSelector(
  [
    meetingsAdapterSelectors.selectAll,
    (_, calendarId: number | null) => calendarId,
  ],
  (meetings, calendarId) => {
    return meetings.reduce((acc: string[], meeting) => {
      if (!calendarId || meeting.calendarId === calendarId) {
        acc.push(meeting.meetingId);
      }

      return acc;
    }, []);
  },
);

export const selectMeetingsIdsByFilter = createSelector(
  [meetingsAdapterSelectors.selectAll, (_, filter: string | null) => filter],
  (meetings, filter: string | null) => {
    if (!filter) {
      const meetingIds: MeetingId[] = [];

      meetings.forEach((meeting) => {
        if (rules.isMeetingOngoing(meeting) || isFuture(meeting.startDate)) {
          meetingIds.push(meeting.meetingId);
        }
      });

      meetings.forEach((meeting) => {
        if (isPast(meeting.startDate) && !rules.isMeetingOngoing(meeting)) {
          meetingIds.push(meeting.meetingId);
        }
      });

      return meetingIds;
    }

    return meetings.map((meeting) => meeting.meetingId);
  },
);

export const selectMeetingsIdsByCalendarIdAndDate = createSelector(
  [
    meetingsAdapterSelectors.selectAll,
    (_, props: { calendarId: number; date: DateString }) => props,
  ],
  (meetings, props) => {
    const { calendarId, date } = props;

    if (calendarId) {
      if (isToday(date)) {
        return meetings.reduce((acc: MeetingId[], meeting) => {
          if (
            calendarId === meeting.calendarId &&
            rules.isTodayNextMeeting(meeting.startDate, meeting.endDate)
          ) {
            acc.push(meeting.meetingId);
          }

          return acc;
        }, []);
      } else {
        return meetings.reduce((acc: MeetingId[], meeting) => {
          if (
            calendarId === meeting.calendarId &&
            isSameDay(date, meeting.startDate)
          ) {
            acc.push(meeting.meetingId);
          }

          return acc;
        }, []);
      }
    }

    return null;
  },
);

export const selectMeetingById = createSelector(
  [
    meetingsAdapterSelectors.selectById,
    (_, meetingId: MeetingId | null) => meetingId,
  ],
  (meeting, meetingId) => {
    if (meetingId) {
      return meeting;
    }

    return undefined;
  },
);
