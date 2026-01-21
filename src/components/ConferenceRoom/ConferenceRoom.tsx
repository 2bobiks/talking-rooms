import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingsIdsByCalendarIdAndDate } from "../../redux/meetingsSlice.ts";
import { RoomStatus } from "../RoomStatus/RoomStatus.tsx";
import { ConferenceRoomMeetings } from "../ConferenceRoomMeetings/ConferenceRoomMeetings.tsx";
import { useAppTheme } from "../../theme/theme.ts";
import * as S from "./ConferenceRoom.styled.ts";
import { DateString } from "../../redux/Meeting.ts";

interface ConferenceRoomProps {
  meetingRoom: { calendarId: number; meetingRoomName: string };
  date: DateString;
}

export const ConferenceRoom = ({
  meetingRoom: { calendarId, meetingRoomName },
  date,
}: ConferenceRoomProps) => {
  const theme = useAppTheme();

  const meetingIdsByCalendarId = useAppSelector((state) =>
    selectMeetingsIdsByCalendarIdAndDate(state, calendarId, date),
  );

  return (
    <div style={theme.mainContainer}>
      <S.TitleContainer>
        <S.Title>{meetingRoomName}</S.Title>
        {meetingIdsByCalendarId && <RoomStatus calendarId={calendarId} />}
      </S.TitleContainer>
      <ConferenceRoomMeetings meetingIdsByCalendarId={meetingIdsByCalendarId} />
    </div>
  );
};
