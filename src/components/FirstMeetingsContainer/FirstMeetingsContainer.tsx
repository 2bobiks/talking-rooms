import { Meeting, MeetingId } from "../../redux/Meeting.ts";
import { useMemo } from "react";
import { rules } from "../../rules/rules.ts";
import { useGetFirstMeetings } from "../../hooks/useGetFirstMeetings.ts";
import * as S from "../FirstMeetingsContainer/FirstMeetingsContainer.styled.ts";
import { FirstMeeting } from "../FirstMeeting/FirstMeeting.tsx";

interface FirstMeetingsContainerProps {
  firstMeeting: Meeting | undefined;
  meetingIds: MeetingId[] | undefined;
  meetingsIdsByDate: MeetingId[] | undefined;
}

export const FirstMeetingsContainer = ({
  firstMeeting,
  meetingIds,
  meetingsIdsByDate,
}: FirstMeetingsContainerProps) => {
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
