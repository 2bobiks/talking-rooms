import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingById,
  selectOngoingMeetingsIdsByCalendarId,
} from "../../redux/meetingsSlice.ts";
import * as S from "./FirstMeeting.styled.ts";
import Clock from "../../assets/clock.svg?react";
import Calendar from "../../assets/calendar.svg?react";
import { rules } from "../../rules/rules.ts";
import { useAppTheme } from "../../theme/theme.ts";
import { isFuture, isSameDay, isToday } from "date-fns";
import { meetingStatusHelper } from "../../lib/meetingStatusHelper.ts";
import { dateHelper } from "../../lib/dateHelper.ts";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";

interface MeetingProps {
  meetingId: string;
}

// TODO: разделит на компоненты
// const A = () => {
//   return (
//     <>
//       <span style={theme.meetingTitle}>
//         {meeting?.title ? meeting.title : "Встреча"}
//       </span>
//       <span style={theme.meetingTime}>
//         {dateHelper.getTimeRange(meeting?.startDate, meeting?.endDate)}
//       </span>
//       {meeting?.who ? (
//         <span style={theme.meetingWho}>Организатор: {meeting.who}</span>
//       ) : (
//         <span style={theme.meetingWho}>Организатора нет</span>
//       )}
//     </>
//   );
// };

export const FirstMeeting = ({ meetingId }: MeetingProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const ongoingMeetings = useAppSelector((state) =>
    meeting
      ? selectOngoingMeetingsIdsByCalendarId(state, meeting?.calendarId)
      : undefined,
  );
  const theme = useAppTheme();

  const isOngoing = rules.isMeetingOngoing(meeting);
  const isValidFirstMeeting = Boolean(
    meeting && (isToday(meeting.startDate) || isFuture(meeting.startDate)),
  );

  const isConflict = Boolean(
    ongoingMeetings &&
      ongoingMeetings.length > 1 &&
      meeting &&
      isSameDay(meeting.startDate, new Date()),
  );

  console.log(`изконфликт ${isConflict}`);

  return (
    <>
      {isValidFirstMeeting && (
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
              {/* TODO: * i18n */}
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
      )}
      {!isValidFirstMeeting && <MeetingByDate meetingId={meetingId} />}
    </>
  );
};
