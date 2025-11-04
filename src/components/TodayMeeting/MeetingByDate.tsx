import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { useAppTheme } from "../../theme/theme.ts";
import * as S from "./MeetingByDate.styled.ts";
import { dateHelper } from "../../lib/dateHelper.ts";

interface TodayMeetingProps {
  meetingId: string;
}

export const MeetingByDate = ({ meetingId }: TodayMeetingProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const theme = useAppTheme();

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
          {dateHelper.hoursTime(meeting?.startDate)}
        </span>
        <span style={theme.meetingTime}>
          {dateHelper.hoursTime(meeting?.endDate)}
        </span>
      </S.TextContainer>
    </S.MeetingContainer>
  );
};
