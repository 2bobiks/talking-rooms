import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import * as S from "./FirstMeeting.styled.ts";
import clock from "../../assets/clock.svg";
import calendar from "../../assets/calendar.svg";
import { rules } from "../../rules/rules.ts";
import { useAppTheme } from "../../theme/theme.ts";
import { isFuture, isToday } from "date-fns";
import { meetingStatusHelper } from "../../lib/meetingStatusHelper.ts";
import { dateHelper } from "../../lib/dateHelper.ts";

interface MeetingProps {
  meetingId: string;
}

export const FirstMeeting = ({ meetingId }: MeetingProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const theme = useAppTheme();

  const isOngoing = rules.isMeetingOngoing(meeting);
  const isValidFirstMeeting = Boolean(
    meeting && (isToday(meeting.startDate) || isFuture(meeting.startDate)),
  );

  return (
    isValidFirstMeeting && (
      <S.FirstMeetingContainer ongoing={isOngoing}>
        <S.StatusContainer>
          <S.Image src={isOngoing ? clock : calendar} alt={"clock"} />
          <S.StatusTitle theme={theme} ongoing={isOngoing}>
            {/* TODO: * i18n */}
            {meetingStatusHelper.getStatusOfFirstMeeting(meeting)}
          </S.StatusTitle>
        </S.StatusContainer>
        <span style={theme.meetingTitle}>
          {meeting?.title ? meeting.title : "Встреча"}
        </span>
        <span style={theme.meetingTime}>
          {dateHelper.timeRange(meeting?.startDate, meeting?.endDate)}
        </span>
        {meeting?.who ? (
          <span style={theme.meetingWho}>Организатор: {meeting.who}</span>
        ) : (
          <span style={theme.meetingWho}>Организатора нет</span>
        )}
      </S.FirstMeetingContainer>
    )
  );
};
