import { createSelector, createSlice, EntityState } from "@reduxjs/toolkit";
import { meetingsAdapter } from "./adapters.ts";
import { DateString, Meeting, MeetingId } from "./Meeting.ts";
import { rules } from "../rules/rules.ts";
import { api } from "../api/api.ts";
import { isSameDay, isToday } from "date-fns";
import { Filter } from "../components/AllMeetings/AllMeetings.tsx";
import { RootState } from "./store.ts";
import { meetingStatusHelper } from "../lib/meetingStatusHelper.ts";
import { meetingCalendarIdHelper } from "../lib/meetingCalendarIdHelper.ts";

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
          meetingStatusHelper.getStatusName(rules.meetingStatus(meeting)) ===
            filter.status;

        const filterByRoomName =
          !filter.meetingRoom ||
          meeting.calendarId ===
            meetingCalendarIdHelper.getCalendarIdByRoomName(filter.meetingRoom);

        const filterByWho = !filter.who || meeting.who === filter.who;

        return filterByStatus && filterByRoomName && filterByWho;
      }),
    );
  },
);

export const selectMeetingsIdsByCalendarIdAndDate = createSelector(
  [
    meetingsAdapterSelectors.selectAll,
    (_, calendarId: number) => calendarId,
    (_, __: number, date: DateString) => date,
  ],
  (meetings, calendarId, date) => {
    if (!calendarId) return null;

    const isTodayDate = isToday(date);
    const targetDate = new Date(date);

    return meetings.reduce((acc: MeetingId[], meeting) => {
      if (
        meeting.calendarId === calendarId &&
        (isTodayDate
          ? rules.isTodayNextMeeting(meeting.startDate, meeting.endDate)
          : isSameDay(targetDate, meeting.startDate))
      ) {
        acc.push(meeting.meetingId);
      }

      return acc;
    }, []);
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

// export const selectOngoingMeetingsIdsByCalendarId = createSelector(
//   [meetingsAdapterSelectors.selectAll, (_, calendarId: number) => calendarId],
//   (meetings, calendarId) => {
//     return meetings.reduce((acc: MeetingId[], meeting) => {
//       if (
//         meeting.calendarId === calendarId &&
//         rules.isMeetingOngoing(meeting)
//       ) {
//         acc.push(meeting.meetingId);
//       }
//
//       return acc;
//     }, []);
//   },
// );

export const selectMeetingsStatus = createSelector(
  (state: RootState) => state.meetings,
  (meetings) => meetings.status,
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
