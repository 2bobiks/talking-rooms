import { useState } from "react";
import * as S from "./ConferenceRoomMeetings.styled.ts";
import { MeetingByCalendarId } from "../MeetingByCalendarId/MeetingByCalendarId.tsx";

interface ConferenceRoomMeetingsProps {
  meetingIdsByCalendarId: string[] | null;
}

const isExist = (
  meetingIdsByCalendarId: string[] | null,
): meetingIdsByCalendarId is string[] =>
  Boolean(meetingIdsByCalendarId && meetingIdsByCalendarId.length);

export const ConferenceRoomMeetings = ({
  meetingIdsByCalendarId,
}: ConferenceRoomMeetingsProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const isMeetingsExist = isExist(meetingIdsByCalendarId);

  return (
    <>
      {isMeetingsExist && (
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
          <S.Button onClick={() => setIsHidden((prev) => !prev)}>
            {isHidden ? "Посмотреть расписание" : "Скрыть расписание"}
          </S.Button>
        </>
      )}
      {!isMeetingsExist && (
        <S.NoMeetingTitle>сосамба нету митингов</S.NoMeetingTitle>
      )}
    </>
  );
};
