import { ConferenceRoom } from "../../components/ConferenceRoom/ConferenceRoom.tsx";
import { AllMeetings } from "../../components/AllMeetings/AllMeetings.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { api } from "../../api/api.ts";
import * as S from "./MeetingPage.styled.ts";
import { MeetingsDate } from "../../components/MeetingsDate/MeetingsDate.tsx";
import { format } from "date-fns";
import { MeetingPageSkeleton } from "../../components/MeetingPageSkeletons/MeetingPageSkeleton.tsx";
import { selectMeetingsStatus } from "../../redux/meetingsSlice.ts";
import ThemeIcon from "../../assets/themeIcon.svg?react";
import { useAppTheme } from "../../theme/theme.ts";

interface MeetingPageProps {
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

export const MeetingPage = ({ setIsDark }: MeetingPageProps) => {
  const dispatch = useAppDispatch();
  const meetingsStatus = useAppSelector((state) => selectMeetingsStatus(state));
  const [date, setDate] = useState(new Date().toISOString());
  const theme = useAppTheme();

  useEffect(() => {
    dispatch(api.fetchMeetingsThunk());
  }, [dispatch]);

  const isLoading =
    meetingsStatus === "loading" || meetingsStatus === undefined;

  return (
    <div>
      <S.TitleAndButtonContainer>
        <S.Title>Переговорки</S.Title>
        <S.Button onClick={() => setIsDark((prev) => !prev)}>
          <ThemeIcon
            height={"20px"}
            fill={theme.palette.colors.textColor.primary}
          />
        </S.Button>
      </S.TitleAndButtonContainer>
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
