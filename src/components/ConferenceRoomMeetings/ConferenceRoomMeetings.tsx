import { useState } from "react";
import * as S from "./ConferenceRoomMeetings.styled.ts";
import { MeetingsByCalendarIdAndDate } from "../MeetingsByCalendarIdAndDAte/MeetingsByCalendarIdAndDate.tsx";

interface ConferenceRoomMeetingsProps {
  meetingIdsByCalendarId: string[] | null;
  calendarId: number;
}

export const ConferenceRoomMeetings = ({
  meetingIdsByCalendarId,
  calendarId,
}: ConferenceRoomMeetingsProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const isMeetingsExist = Boolean(
    meetingIdsByCalendarId && meetingIdsByCalendarId.length,
  );

  return (
    <>
      {isMeetingsExist && meetingIdsByCalendarId && (
        <>
          <S.VisibleMeetingsContainer isHidden={isHidden}>
            <MeetingsByCalendarIdAndDate
              meetingsIds={meetingIdsByCalendarId}
              calendarId={calendarId}
            />
          </S.VisibleMeetingsContainer>
          {isHidden && (
            <S.Button onClick={() => setIsHidden((prev) => !prev)}>
              Посмотреть расписание
            </S.Button>
          )}
          {!isHidden && (
            <S.Button onClick={() => setIsHidden((prev) => !prev)}>
              Скрыть расписание
            </S.Button>
          )}
        </>
      )}
      {!isMeetingsExist && <span>сосамба нету митингов</span>}
    </>
  );
};
