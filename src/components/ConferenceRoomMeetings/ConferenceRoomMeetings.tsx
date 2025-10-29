import { useState } from "react";
import * as S from "./ConferenceRoomMeetings.styled.ts";
import { MeetingByCalendarId } from "../MeetingByCalendarId/MeetingByCalendarId.tsx";

interface ConferenceRoomMeetingsProps {
  meetingIdsByCalendarId: string[] | null;
}

export const ConferenceRoomMeetings = ({
  meetingIdsByCalendarId,
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
            {meetingIdsByCalendarId.map((meetingId, index) => (
              <MeetingByCalendarId
                meetingId={meetingId}
                key={meetingId}
                indexOfMeeting={index}
                amountOfMeetings={meetingIdsByCalendarId.length}
              />
            ))}
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
