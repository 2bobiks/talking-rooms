import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import clock from "../../assets/grayClock.svg";
import location from "../../assets/location.svg";
import { rules } from "../../rules/rules.ts";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../theme/theme.ts";
import * as S from "./Meeting.styled.ts";

interface MeetingProps {
  meetingId: string;
}

export const Meeting = ({ meetingId }: MeetingProps) => {
  const meeting = useAppSelector((state) =>
    selectMeetingById(state, meetingId),
  );
  const theme: MyTheme = useTheme();

  const meetingStatus = rules.meetingStatus(meeting);

  return (
    <div style={theme.meetingContainer}>
      <S.ContentContainer>
        <span style={theme.meetingTitle}>
          {meeting?.title ? meeting.title : "Встреча"}
        </span>
        <S.MeetingStatus {...rules.statusColors(meetingStatus)}>
          {rules.statusName(meetingStatus)}
        </S.MeetingStatus>
      </S.ContentContainer>
      <S.ContentContainer>
        {/* TODO: инлайн свг как реакт компонент */}
        <S.Image src={clock} alt={""} />
        <S.MeetingTime style={theme.meetingTime}>
          {`${rules.getDayOfTheWeek(meeting?.startDate)} ${rules.timeRange(meeting?.startDate, meeting?.endDate)}`}
        </S.MeetingTime>
        <S.Image src={location} alt={""}></S.Image>
        <span style={theme.meetingTime}>
          {rules.getMeetingRoomName(meeting?.calendarId)}
        </span>
      </S.ContentContainer>
      {meeting?.who && (
        <span style={theme.meetingWho}>Организатор: {meeting?.who}</span>
      )}
    </div>
  );
};
