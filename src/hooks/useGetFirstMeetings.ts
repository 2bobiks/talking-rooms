import { useAppSelector } from "../redux/store.ts";
import { selectMeetingById } from "../redux/meetingsSlice.ts";
import { isSameDay } from "date-fns";
import { useMemo } from "react";

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

  return useMemo(() => {
    if (!meetingIdsByCalendarId) return undefined;

    if (!ongoingMeetingsByCalendarId?.length) {
      return [meetingIdsByCalendarId[0]];
    }

    if (
      firstOngoingMeetingId &&
      firstMeetingIdByCalendarId &&
      isSameDay(
        firstOngoingMeetingId.startDate,
        firstMeetingIdByCalendarId.startDate,
      )
    ) {
      return ongoingMeetingsByCalendarId;
    }

    return undefined;
  }, [
    meetingIdsByCalendarId,
    ongoingMeetingsByCalendarId,
    firstOngoingMeetingId,
    firstMeetingIdByCalendarId,
  ]);
};
