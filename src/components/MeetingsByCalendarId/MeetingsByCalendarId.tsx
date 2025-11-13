import * as S from "./MeetingsByCalendarId.styled.ts";
import { dateHelper } from "../../lib/dateHelper.ts";
import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";
import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingById,
  selectOngoingMeetingsIdsByCalendarId,
} from "../../redux/meetingsSlice.ts";
import { useMemo } from "react";
import { meetingsSortHelper } from "../../lib/meetingsSortHelper.ts";
import { useGetFirstMeetings } from "../../hooks/useGetFirstMeetings.ts";
import { rules } from "../../rules/rules.ts";

interface MeetingsByCalendarIdProps {
  meetingIdsByCalendarId: string[];
}

export const MeetingsByCalendarId = ({
  meetingIdsByCalendarId,
}: MeetingsByCalendarIdProps) => {
  const firstMeeting = useAppSelector((state) =>
    meetingIdsByCalendarId
      ? selectMeetingById(state, meetingIdsByCalendarId[0])
      : undefined,
  );

  const isValidFirstMeeting = useMemo(
    () => rules.isValidFirstMeeting(firstMeeting),
    [firstMeeting],
  );

  const ongoingMeetingsByCalendarId = useAppSelector((state) =>
    firstMeeting
      ? selectOngoingMeetingsIdsByCalendarId(state, firstMeeting.calendarId)
      : undefined,
  );

  const firstMeetingsIds = useGetFirstMeetings(
    meetingIdsByCalendarId,
    ongoingMeetingsByCalendarId,
  );

  const meetingsIdsByDate = useMemo(
    () =>
      meetingsSortHelper.getMeetingsByDate(
        meetingIdsByCalendarId,
        ongoingMeetingsByCalendarId,
      ),
    [meetingIdsByCalendarId, ongoingMeetingsByCalendarId],
  );
  console.log(meetingsIdsByDate);

  return (
    <>
      <S.AmountOfMeetingsTitle>
        Расписание на{" "}
        {dateHelper.getDayOfTheWeekOrToday(
          firstMeeting && firstMeeting.startDate,
        )}{" "}
        (Встреч: {meetingIdsByCalendarId.length})
      </S.AmountOfMeetingsTitle>
      {firstMeetingsIds && (
        <S.FirstMeetingsContainer isValidFirstMeeting={isValidFirstMeeting}>
          {firstMeetingsIds.map((meetingId) => (
            <FirstMeeting key={meetingId} meetingId={meetingId} />
          ))}
        </S.FirstMeetingsContainer>
      )}

      {meetingsIdsByDate &&
        !!meetingsIdsByDate.length &&
        meetingsIdsByDate.map((meetingId) => (
          <MeetingByDate key={meetingId} meetingId={meetingId} />
        ))}
    </>
  );
};
