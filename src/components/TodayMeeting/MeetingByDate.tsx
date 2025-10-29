import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { rules } from "../../rules/rules.ts";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../theme/theme.ts";
import * as S from "./MeetingByDate.styled.ts";

interface TodayMeetingProps {
  meetingId: string;
}

export const MeetingByDate = ({ meetingId }: TodayMeetingProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const theme: MyTheme = useTheme();

  return (
    <S.MeetingContainer>
      <S.TextContainer>
        <span style={theme.meetingTitle}>
          {meeting?.title ? meeting.title : "Встреча"}
        </span>
        <span style={theme.meetingWho}>{meeting?.who}</span>
      </S.TextContainer>
      <S.TextContainer>
        <span style={theme.meetingTime}>
          {rules.hoursTime(meeting?.startDate)}
        </span>
        <span style={theme.meetingTime}>
          {rules.hoursTime(meeting?.endDate)}
        </span>
      </S.TextContainer>
    </S.MeetingContainer>
  );
};
