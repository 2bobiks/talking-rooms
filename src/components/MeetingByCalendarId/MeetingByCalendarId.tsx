import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";
import { TodayMeeting } from "../TodayMeeting/TodayMeeting.tsx";
import * as S from "./MeetingByCalendarId.styled.ts";
import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { isFuture, isToday } from "date-fns";
import { rules } from "../../rules/rules.ts";

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
      {indexOfMeeting === 0 &&
        (isToday(meeting!.startDate) || isFuture(meeting!.startDate)) && (
          <FirstMeeting meetingId={meetingId} />
        )}
      {indexOfMeeting === 0 && (
        <S.AmountOfMeetingsTitle>
          Расписание на {rules.getDayOfTheWeekOrToday(meeting?.startDate)}{" "}
          (Встреч: {amountOfMeetings})
        </S.AmountOfMeetingsTitle>
      )}

      {indexOfMeeting !== 0 && <TodayMeeting meetingId={meetingId} />}
    </>
  );
};
