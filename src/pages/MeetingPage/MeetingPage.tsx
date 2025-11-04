import { ConferenceRoom } from "../../components/ConferenceRoom/ConferenceRoom.tsx";
import { AllMeetings } from "../../components/AllMeetings/AllMeetings.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { api } from "../../api/api.ts";
import * as S from "./MeetingPage.styled.ts";
import { MeetingsDate } from "../../components/MeetingsDate/MeetingsDate.tsx";
import { format } from "date-fns";
import { MeetingPageSkeleton } from "../../components/MeetingPageSkeletons/MeetingPageSkeleton.tsx";
import { selectMeetingsStatus } from "../../redux/meetingsSlice.ts";

export const MeetingPage = () => {
  const dispatch = useAppDispatch();
  const meetingsStatus = useAppSelector((state) => selectMeetingsStatus(state));
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(api.fetchMeetingsThunk());
  }, [dispatch]);

  const isLoading =
    meetingsStatus === "loading" || meetingsStatus === undefined;

  return (
    <div>
      <S.Title>Переговорки</S.Title>
      {isLoading && <MeetingPageSkeleton />}
      {!isLoading && (
        <>
          <MeetingsDate setDate={setDate}>
            <S.DateTitle>{format(date, "dd.MM.yyyy")}</S.DateTitle>
          </MeetingsDate>
          <S.Container>
            <ConferenceRoom date={date} meetingRoom={meetingRoomA} />
            <ConferenceRoom date={date} meetingRoom={meetingRoomB} />
          </S.Container>
          <AllMeetings />
        </>
      )}
    </div>
  );
};
