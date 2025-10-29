import { MeetingId } from "../../redux/Meeting.ts";
import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingById,
  selectOngoingMeetingsIdsByCalendarId,
} from "../../redux/meetingsSlice.ts";
import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";
import * as S from "./MeetingsByCalendarIdAndDate.styled.ts";
import { MeetingByCalendarId } from "../MeetingByCalendarId/MeetingByCalendarId.tsx";
import { rules } from "../../rules/rules.ts";

interface MeetingsByCalendarIdAndDateProps {
  meetingsIds: MeetingId[];
  calendarId: number;
}

export const MeetingsByCalendarIdAndDate = ({
  meetingsIds,
  calendarId,
}: MeetingsByCalendarIdAndDateProps) => {
  const onGoingMeetingsIds = useAppSelector((state) =>
    selectOngoingMeetingsIdsByCalendarId(state, calendarId),
  );

  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingsIds[0]),
  );

  return (
    <div>
      <S.AmountOfMeetingsTitle>
        Расписание на {rules.getDayOfTheWeekOrToday(meeting?.startDate)}{" "}
        (Встреч: {meetingsIds.length})
      </S.AmountOfMeetingsTitle>
      {onGoingMeetingsIds.length > 1 && (
        <>
          <S.OngoingMeetingsContainer ongoingLength={onGoingMeetingsIds.length}>
            {onGoingMeetingsIds.map((meetingId) => (
              <FirstMeeting meetingId={meetingId} key={meetingId} />
            ))}
          </S.OngoingMeetingsContainer>

          {meetingsIds
            .filter(
              (meetingId: MeetingId) => !onGoingMeetingsIds.includes(meetingId),
            )
            .map((meetingId: MeetingId) => (
              <MeetingByDate meetingId={meetingId} key={meetingId} />
            ))}
        </>
      )}
      {onGoingMeetingsIds.length <= 1 && (
        <>
          {meetingsIds.map((meetingId, indexOfMeeting) => (
            <MeetingByCalendarId
              key={meetingId}
              meetingId={meetingId}
              indexOfMeeting={indexOfMeeting}
            />
          ))}
        </>
      )}
    </div>
  );
};
