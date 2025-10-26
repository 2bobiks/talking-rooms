import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingsIdsByCalendarIdAndDate } from "../../redux/meetingsSlice.ts";
import { RoomStatus } from "../RoomStatus/RoomStatus.tsx";
import { ConferenceRoomMeetings } from "../ConferenceRoomMeetings/ConferenceRoomMeetings.tsx";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../theme/theme.ts";
import * as S from "./ConferenceRoom.styled.ts";
import { DateString } from "../../redux/Meeting.ts";
import { useMemo } from "react";

interface ConferenceRoomProps {
  meetingRoom: { calendarId: number; meetingRoomName: string };
  date: DateString;
}

export const ConferenceRoom = ({ meetingRoom, date }: ConferenceRoomProps) => {
  const theme: MyTheme = useTheme();
  const { calendarId, meetingRoomName } = meetingRoom;

  const memoizedProps = useMemo(
    () => ({ calendarId, date }),
    [calendarId, date],
  );

  const meetingIdsByCalendarId = useAppSelector((state) =>
    selectMeetingsIdsByCalendarIdAndDate(state, memoizedProps),
  );

  return (
    <div style={theme.mainContainer}>
      <S.TitleContainer>
        <S.Title>{meetingRoomName}</S.Title>
        {meetingIdsByCalendarId && (
          <RoomStatus meetingId={meetingIdsByCalendarId[0]} />
        )}
      </S.TitleContainer>
      <ConferenceRoomMeetings meetingIdsByCalendarId={meetingIdsByCalendarId} />
    </div>
  );
};
