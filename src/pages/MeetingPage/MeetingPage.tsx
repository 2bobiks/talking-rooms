import { ConferenceRoom } from "../../components/ConferenceRoom/ConferenceRoom.tsx";
import { AllMeetings } from "../../components/AllMeetings/AllMeetings.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { api } from "../../api/api.ts";
import * as S from "./MeetingPage.styled.ts";
import { MeetingsDate } from "../../components/MeetingsDate/MeetingsDate.tsx";
import { Skeleton } from "@gravity-ui/uikit";
import { useAppTheme } from "../../theme/theme.ts";
import { format } from "date-fns";

export const MeetingPage = () => {
  const dispatch = useAppDispatch();
  // TODO: в селектор + обьяснить что изменится
  const meetingsStatus = useAppSelector((state) => state.meetings.status);
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(api.fetchMeetingsThunk());
  }, [dispatch]);

  const isLoading =
    meetingsStatus === "loading" || meetingsStatus === undefined;

  const theme = useAppTheme();

  return (
    <div>
      <S.Title>Переговорки</S.Title>
      {isLoading && (
        // TODO: в отдельный компач
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
          <MeetingsDate setDate={setDate}>
            {/*/!*TODO: peredel*!/*/}
            <h5 style={theme.meetingTitle}>{format(date, "dd.MM.yyyy")}</h5>
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
