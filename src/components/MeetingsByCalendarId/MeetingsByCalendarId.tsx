import * as S from "./MeetingsByCalendarId.styled.ts";
import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingById,
  selectOngoingMeetingsIdsByCalendarId,
} from "../../redux/meetingsSlice.ts";
import { useMemo } from "react";
import { meetingsSortHelper } from "../../lib/meetingsSortHelper.ts";
import { MeetingsByDateContainer } from "../MeetingByDateContainer/MeetingsByDateContainer.tsx";
import { FirstMeetingsContainer } from "../FirstMeetingsContainer/FirstMeetingsContainer.tsx";
import { textHelper } from "../../lib/textHelper.ts";

interface MeetingsByCalendarIdProps {
  meetingIds: string[];
}

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

  return (
    <>
      <S.AmountOfMeetingsTitle>
        {textHelper.getText(meetingIds.length, firstMeeting?.startDate)}
      </S.AmountOfMeetingsTitle>
      <FirstMeetingsContainer
        firstMeeting={firstMeeting}
        meetingIds={meetingIds}
        meetingsIdsByDate={meetingsIdsByDate}
      />
      <MeetingsByDateContainer meetingIdsByDate={meetingsIdsByDate} />
    </>
  );
};
