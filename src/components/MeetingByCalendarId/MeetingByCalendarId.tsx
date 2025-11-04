import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";
import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import * as S from "./MeetingByCalendarId.styled.ts";
import { dateHelper } from "../../lib/dateHelper.ts";

interface MeetingByCalendarIdProps {
  meetingId: string;
  indexOfMeeting: number;
  amountOfMeetings: number;
}

export const MeetingByCalendarId = ({
  meetingId,
  indexOfMeeting,
  amountOfMeetings,
}: MeetingByCalendarIdProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );

  return (
    <>
      {indexOfMeeting === 0 && (
        <>
          <S.AmountOfMeetingsTitle>
            Расписание на{" "}
            {dateHelper.getDayOfTheWeekOrToday(meeting?.startDate)}
            (Встреч: {amountOfMeetings})
          </S.AmountOfMeetingsTitle>
          <FirstMeeting meetingId={meetingId} />
        </>
      )}
      {indexOfMeeting !== 0 && <MeetingByDate meetingId={meetingId} />}
    </>
  );
};
