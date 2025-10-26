import { ConferenceRoom } from "../../components/ConferenceRoom/ConferenceRoom.tsx";
import { AllMeetings } from "../../components/AllMeetings/AllMeetings.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store.ts";
import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { api } from "../../api/api.ts";
import * as S from "./MeetingPage.styled.ts";
import { MeetingsDate } from "../../components/MeetingsDate/MeetingsDate.tsx";

export const MeetingPage = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(api.fetchMeetingsThunk());
  }, [dispatch]);

  return (
    <div>
      <S.Title>Переговорки</S.Title>
      <MeetingsDate date={date} setDate={setDate} />
      <S.Container>
        <ConferenceRoom date={date} meetingRoom={meetingRoomA} />
        <ConferenceRoom date={date} meetingRoom={meetingRoomB} />
      </S.Container>
      <AllMeetings />
    </div>
  );
};
