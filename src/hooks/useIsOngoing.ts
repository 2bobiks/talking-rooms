import { useAppSelector } from "../redux/store.ts";
import { selectMeetingById } from "../redux/meetingsSlice.ts";
import { isSameDay } from "date-fns";

export const useGetFirstMeetings = (
  meetingIdsByCalendarId: string[] | null,
  ongoingMeetingsByCalendarId: string[] | undefined,
) => {
  const firstOngoingMeetingId = useAppSelector((state) =>
    ongoingMeetingsByCalendarId
      ? selectMeetingById(state, ongoingMeetingsByCalendarId[0])
      : undefined,
  );
  const firstMeetingIdByCalendarId = useAppSelector((state) =>
    meetingIdsByCalendarId
      ? selectMeetingById(state, meetingIdsByCalendarId[0])
      : undefined,
  );

  if (meetingIdsByCalendarId) {
    if (
      ongoingMeetingsByCalendarId &&
      ongoingMeetingsByCalendarId.length === 0
    ) {
      return [meetingIdsByCalendarId[0]];
    }
    if (
      firstOngoingMeetingId &&
      firstMeetingIdByCalendarId &&
      isSameDay(
        firstOngoingMeetingId?.startDate,
        firstMeetingIdByCalendarId?.startDate,
      )
    ) {
      return ongoingMeetingsByCalendarId;
    }

    return undefined;
  }
};
