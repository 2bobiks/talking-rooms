import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";
import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { isFuture, isToday } from "date-fns";

interface MeetingByCalendarIdProps {
  meetingId: string;
  indexOfMeeting: number;
}

export const MeetingByCalendarId = ({
  meetingId,
  indexOfMeeting,
}: MeetingByCalendarIdProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );

  return (
    <>
      {indexOfMeeting === 0 &&
        (isToday(meeting!.startDate) || isFuture(meeting!.startDate)) && (
          <FirstMeeting meetingId={meetingId} />
        )}

      {indexOfMeeting !== 0 && <MeetingByDate meetingId={meetingId} />}
    </>
  );
};
