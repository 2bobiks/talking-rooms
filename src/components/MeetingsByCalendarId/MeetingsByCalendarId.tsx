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
import { Meeting, MeetingId } from "../../redux/Meeting.ts";

interface MeetingsByCalendarIdProps {
  meetingIds: string[];
}

const getText = (meetingLength: number, startDate: string | undefined) => {
  return `Расписание на
  ${dateHelper.getDayOfTheWeekOrToday(startDate)}
  (Встреч: ${meetingLength})`;
};

const FirstMeetingsContainer = ({
  firstMeeting,
  meetingIds,
  meetingsIdsByDate,
}: {
  firstMeeting: Meeting | undefined;
  meetingIds: MeetingId[] | undefined;
  meetingsIdsByDate: MeetingId[] | undefined;
}) => {
  const isValidFirstMeeting = useMemo(
    () => rules.isValidFirstMeeting(firstMeeting),
    [firstMeeting],
  );

  const firstMeetingsIds = useGetFirstMeetings({
    allMeetingIds: meetingIds,
    ongoingMeetingIds: meetingsIdsByDate,
  });

  return (
    (firstMeetingsIds?.length ?? 0) > 0 && (
      <S.FirstMeetingsContainer isValidFirstMeeting={isValidFirstMeeting}>
        {firstMeetingsIds?.map((meetingId) => (
          <FirstMeeting key={meetingId} meetingId={meetingId} />
        ))}
      </S.FirstMeetingsContainer>
    )
  );
};

const MeetingByDateContainer = ({
  meetingIdsByDate,
}: {
  meetingIdsByDate: MeetingId[] | undefined;
}) => {
  return (
    (meetingIdsByDate?.length ?? 0) > 0 &&
    meetingIdsByDate?.map((meetingId) => (
      <MeetingByDate key={meetingId} meetingId={meetingId} />
    ))
  );
};

export const MeetingsByCalendarId = ({
  meetingIds,
}: MeetingsByCalendarIdProps) => {
  const firstMeetingId = meetingIds[0];

  const firstMeeting = useAppSelector((state) =>
    selectMeetingById(state, firstMeetingId),
  );

  const ongoingMeetingsByCalendarId = useAppSelector((state) =>
    selectOngoingMeetingsIdsByCalendarId(state, firstMeeting?.calendarId),
  );

  const meetingsIdsByDate = useMemo(
    () =>
      meetingsSortHelper.getMeetingsByDate(
        meetingIds,
        ongoingMeetingsByCalendarId,
      ),
    [meetingIds, ongoingMeetingsByCalendarId],
  );

  console.log(meetingsIdsByDate);

  return (
    <>
      <S.AmountOfMeetingsTitle>
        {getText(meetingIds.length, firstMeeting?.startDate)}
      </S.AmountOfMeetingsTitle>
      <FirstMeetingsContainer
        firstMeeting={firstMeeting}
        meetingIds={meetingIds}
        meetingsIdsByDate={meetingsIdsByDate}
      />
      <MeetingByDateContainer meetingIdsByDate={meetingsIdsByDate} />
    </>
  );
};
