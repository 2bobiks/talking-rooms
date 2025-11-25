import * as S from "../FirstMeeting/FirstMeeting.styled.ts";
import { meetingStatusHelper } from "../../lib/meetingStatusHelper.ts";
import { dateHelper } from "../../lib/dateHelper.ts";
import { useAppTheme } from "../../theme/theme.ts";
import { rules } from "../../rules/rules.ts";
import { useAppSelector } from "../../redux/store.ts";
import { selectOngoingMeetingsIdsByCalendarId } from "../../redux/meetingsSlice.ts";
import { Meeting } from "../../redux/Meeting.ts";
import { isSameDay } from "date-fns";
import Clock from "../../assets/clock.svg?react";
import Calendar from "../../assets/calendar.svg?react";

interface ValidFirstMeetingProps {
  meeting: Meeting | undefined;
}

export const ValidFirstMeeting = ({ meeting }: ValidFirstMeetingProps) => {
  const ongoingMeetings = useAppSelector((state) =>
    meeting
      ? selectOngoingMeetingsIdsByCalendarId(state, meeting?.calendarId)
      : undefined,
  );

  const theme = useAppTheme();

  const isOngoing = rules.isMeetingOngoing(meeting);

  const isConflict = Boolean(
    ongoingMeetings &&
      ongoingMeetings.length > 1 &&
      meeting &&
      isSameDay(meeting.startDate, new Date()),
  );

  return (
    <S.FirstMeetingContainer ongoing={isOngoing} conflict={isConflict}>
      <S.StatusContainer>
        {isOngoing && (
          <Clock
            width={"18px"}
            height={"18px"}
            fill={isConflict ? "#D18700" : "#E7000A"}
          ></Clock>
        )}
        {!isOngoing && <Calendar width={"18px"} height={"18px"}></Calendar>}
        <S.StatusTitle ongoing={isOngoing} conflict={isConflict}>
          {meetingStatusHelper.getStatusOfFirstMeeting(meeting)}
        </S.StatusTitle>
      </S.StatusContainer>
      <span style={theme.meetingTitle}>
        {meeting?.title ? meeting.title : "Встреча"}
      </span>
      <span style={theme.meetingTime}>
        {dateHelper.getTimeRange(meeting?.startDate, meeting?.endDate)}
      </span>
      {meeting?.who ? (
        <span style={theme.meetingWho}>Организатор: {meeting.who}</span>
      ) : (
        <span style={theme.meetingWho}>Организатора нет</span>
      )}
    </S.FirstMeetingContainer>
  );
};
