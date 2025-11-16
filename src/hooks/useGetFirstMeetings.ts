import { useAppSelector } from "../redux/store.ts";
import { selectMeetingById } from "../redux/meetingsSlice.ts";
import { isSameDay } from "date-fns";
import { MeetingId } from "../redux/Meeting.ts";

export interface UseGetFirstMeetingsArgs {
  allMeetingIds: string[] | undefined;
  ongoingMeetingIds: string[] | undefined;
}

export const useGetFirstMeetings = ({
  allMeetingIds,
  ongoingMeetingIds,
}: UseGetFirstMeetingsArgs): MeetingId[] | undefined => {
  const firstOngoingId: MeetingId | undefined = ongoingMeetingIds?.[0];
  const nextMeetingId: MeetingId | undefined = allMeetingIds?.[0];

  const firstOngoingMeeting = useAppSelector((state) =>
    selectMeetingById(state, firstOngoingId),
  );

  const nextMeeting = useAppSelector((state) =>
    selectMeetingById(state, nextMeetingId),
  );

  if (!ongoingMeetingIds?.length && nextMeetingId) {
    return [nextMeetingId];
  }

  if (
    firstOngoingMeeting?.startDate &&
    nextMeeting?.startDate &&
    isSameDay(firstOngoingMeeting.startDate, nextMeeting.startDate)
  ) {
    return ongoingMeetingIds;
  }

  return undefined;
};
