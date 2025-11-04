import { DateString, Meeting, MeetingId } from "../redux/Meeting.ts";
import { isFuture, isPast, isToday, isValid, isWithinInterval } from "date-fns";

type MeetingStatus = "no meeting" | "current" | "previous" | "next" | undefined;

const isTodayNextMeeting = (startDate: DateString, endDate: DateString) => {
  return (
    isToday(startDate) &&
    (isFuture(startDate) || (isPast(startDate) && isFuture(endDate)))
  );
};

const isMeetingOngoing = (meeting: Meeting | undefined) => {
  if (!meeting) {
    return false;
  }

  if (
    isValid(new Date(meeting.startDate)) &&
    isValid(new Date(meeting.endDate))
  ) {
    return isWithinInterval(new Date(), {
      start: meeting.startDate,
      end: meeting.endDate,
    });
  }
};

const getMeetingStatus = (meeting: Meeting | undefined): MeetingStatus => {
  const isOngoing = rules.isMeetingOngoing(meeting);
  if (!meeting) {
    return "no meeting";
  }
  const { startDate, endDate } = meeting;

  if (isValid(new Date(startDate)) && isValid(new Date(endDate))) {
    if (isOngoing) {
      return "current";
    } else if (isPast(startDate)) {
      return "previous";
    } else if (isFuture(endDate)) return "next";
  }
};

const getSortedMeetingIds = (meetings: Meeting[]) => {
  const meetingIds: MeetingId[] = [];

  meetings.forEach((meeting) => {
    if (rules.isMeetingOngoing(meeting) || isFuture(meeting.startDate)) {
      meetingIds.push(meeting.meetingId);
    }
  });

  meetings.forEach((meeting) => {
    if (isPast(meeting.startDate) && !rules.isMeetingOngoing(meeting)) {
      meetingIds.push(meeting.meetingId);
    }
  });

  return meetingIds;
};

export const rules = {
  isTodayNextMeeting,
  isMeetingOngoing,
  meetingStatus: getMeetingStatus,
  getSortedMeetingIds,
};
