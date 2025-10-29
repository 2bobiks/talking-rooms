import { createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import { meetingsAdapter } from "./adapters.ts";
import { DateString, Meeting, MeetingId } from "./Meeting.ts";
import { rules } from "../rules/rules.ts";
import { api } from "../api/api.ts";
import { isSameDay, isToday } from "date-fns";
import { Filter } from "../components/AllMeetings/AllMeetings.tsx";

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

export const selectMeetingsIdsByFilter = createSelector(
  [meetingsAdapterSelectors.selectAll, (_, filter: Filter) => filter],
  (meetings, filter: Filter) => {
    return rules.getSortedMeetingIds(
      meetings.filter((meeting) => {
        const filterByStatus =
          !filter.status ||
          rules.statusName(rules.meetingStatus(meeting)) === filter.status;

        const filterByRoomName =
          !filter.meetingRoom ||
          meeting.calendarId ===
            rules.getCalendarIdByRoomName(filter.meetingRoom);

        const filterByWho = !filter.who || meeting.who === filter.who;

        return filterByStatus && filterByRoomName && filterByWho;
      }),
    );
  },
);

export const selectMeetingsIdsByCalendarIdAndDate = createSelector(
  [
    meetingsAdapterSelectors.selectAll,
    (_, props: { calendarId: number; date: DateString }) => props,
  ],
  (meetings, { calendarId, date }) => {
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

export const selectIsOngoingMeetingByCalendarId = createSelector(
  [meetingsAdapterSelectors.selectAll, (_, calendarId: number) => calendarId],
  (meetings, calendarId) => {
    return Boolean(
      meetings.filter(
        (meeting) =>
          meeting.calendarId === calendarId && rules.isMeetingOngoing(meeting),
      ).length,
    );
  },
);

export const selectMeetingWhoDuplicates = createSelector(
  [meetingsAdapterSelectors.selectAll],
  (meetings) => {
    const meetingWhoDuplicates = meetings
      .map((meeting) => meeting.who)
      .filter(
        (meetingWho, index, meetingsWho) =>
          meetingWho && meetingsWho.indexOf(meetingWho) !== index,
      );

    return [...new Set(meetingWhoDuplicates)];
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
