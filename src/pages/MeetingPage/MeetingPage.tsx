import { ConferenceRoom } from "../../components/ConferenceRoom/ConferenceRoom.tsx";
import { AllMeetings } from "../../components/AllMeetings/AllMeetings.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { api } from "../../api/api.ts";
import * as S from "./MeetingPage.styled.ts";
import { MeetingsDate } from "../../components/MeetingsDate/MeetingsDate.tsx";
import { Skeleton } from "@gravity-ui/uikit";

export const MeetingPage = () => {
  const dispatch = useAppDispatch();
  const meetingsStatus = useAppSelector((state) => state.meetings.status);
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(api.fetchMeetingsThunk());
  }, [dispatch]);

  const isLoading =
    meetingsStatus === "loading" || meetingsStatus === undefined;

  return (
    <div>
      <S.Title>Переговорки</S.Title>
      {isLoading && (
        <>
          <Skeleton style={S.dateSkeleton} animation={"pulse"} />
          <S.Container>
            <Skeleton style={S.conferenceRoomSkeleton} animation={"pulse"} />
            <Skeleton style={S.conferenceRoomSkeleton} animation={"pulse"} />
          </S.Container>
          <Skeleton style={S.allMeetingsSkeleton} animation={"pulse"} />
        </>
      )}
      {!isLoading && (
        <>
          <MeetingsDate date={date} setDate={setDate} />
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
