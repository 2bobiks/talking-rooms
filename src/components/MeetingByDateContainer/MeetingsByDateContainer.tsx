import { MeetingId } from "../../redux/Meeting.ts";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";

interface MeetingByDateContainerProps {
  meetingIdsByDate: MeetingId[] | undefined;
}

export const MeetingsByDateContainer = ({
  meetingIdsByDate,
}: MeetingByDateContainerProps) => {
  return (
    (meetingIdsByDate?.length ?? 0) > 0 &&
    meetingIdsByDate?.map((meetingId) => (
      <MeetingByDate key={meetingId} meetingId={meetingId} />
    ))
  );
};
