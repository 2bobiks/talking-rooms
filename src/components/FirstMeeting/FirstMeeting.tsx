import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingById } from "../../redux/meetingsSlice.ts";
import { isFuture, isToday } from "date-fns";
import { MeetingByDate } from "../TodayMeeting/MeetingByDate.tsx";
import { ValidFirstMeeting } from "../ValidFirstMeeting/ValidFirstMeeting.tsx";

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
  const isValidFirstMeeting = Boolean(
    meeting && (isToday(meeting.startDate) || isFuture(meeting.startDate)),
  );

  return (
    <>
      {isValidFirstMeeting && <ValidFirstMeeting meeting={meeting} />}
      {!isValidFirstMeeting && <MeetingByDate meetingId={meetingId} />}
    </>
  );
};
