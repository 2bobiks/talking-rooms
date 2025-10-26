import { MeetingId } from "../../redux/Meeting.ts";
import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { rules } from "../../rules/rules.ts";
import * as S from "./RoomStatus.styled.ts";

interface RoomStatusProps {
  meetingId: MeetingId;
}

export const RoomStatus = ({ meetingId }: RoomStatusProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const isOngoing = rules.isMeetingOngoing(meeting);

  return isOngoing ? (
    <S.RoomStatusTitle ongoing>Занято</S.RoomStatusTitle>
  ) : (
    <S.RoomStatusTitle>Свободно</S.RoomStatusTitle>
  );
};
