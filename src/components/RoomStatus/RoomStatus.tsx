import { useAppSelector } from "../../redux/store.ts";
import { selectIsOngoingMeetingByCalendarId } from "../../redux/meetingsSlice.ts";
import * as S from "./RoomStatus.styled.ts";

interface RoomStatusProps {
  calendarId: number;
}

export const RoomStatus = ({ calendarId }: RoomStatusProps) => {
  const isOngoing = useAppSelector((state) =>
    selectIsOngoingMeetingByCalendarId(state, calendarId),
  );

  return isOngoing ? (
    <S.RoomStatusTitle ongoing title={"Сейчас переговорка занята"}>
      Занято
    </S.RoomStatusTitle>
  ) : (
    <S.RoomStatusTitle title={"Сейчас переговорка свободна"}>
      Свободно
    </S.RoomStatusTitle>
  );
};
