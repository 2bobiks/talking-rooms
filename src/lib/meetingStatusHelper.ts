import { Meeting } from "../redux/Meeting.ts";
import {
  differenceInHours,
  differenceInMinutes,
  isSameHour,
  isToday,
} from "date-fns";
import { rules } from "../rules/rules.ts";
import { dateHelper } from "./dateHelper.ts";

type MeetingStatus = "no meeting" | "current" | "previous" | "next" | undefined;

const getStatusColors = (meetingStatus: MeetingStatus) => {
  switch (meetingStatus) {
    case "previous":
      return {
        color: "#F3F4F6",
        fontColor: "#1D2939",
      };
    case "current":
      return {
        color: "#FFE2E2",
        fontColor: "#9F0811",
      };
    case "next":
      return {
        color: "#DBEAFE",
        fontColor: "#1A3CB9",
      };
    default:
      return {
        color: "#F3F4F6",
        fontColor: "#1D2939",
      };
  }
};

const getStatusName = (meetingStatus: MeetingStatus) => {
  switch (meetingStatus) {
    case "current":
      return "Текущая";
    case "next":
      return "Предстоящая";
    case "previous":
      return "Прошедшая";
  }
};

const getStatusOfFirstMeeting = (meeting: Meeting | undefined) => {
  if (meeting) {
    if (rules.isMeetingOngoing(meeting)) {
      return "Сейчас используется";
    } else if (isSameHour(meeting.startDate, new Date())) {
      return `Следующая встреча через ${differenceInMinutes(meeting!.startDate, new Date())} ${dateHelper.getMinuteWord(meeting!.startDate)}`;
    } else if (isToday(meeting.startDate)) {
      return `Следующая встреча через ${differenceInHours(meeting!.startDate, new Date())} ${dateHelper.getHourWord(meeting!.startDate)}`;
    }

    return `Первая встреча в ${dateHelper.getDayOfTheWeek(meeting.startDate)}`;
  }
};

export const meetingStatusHelper = {
  statusColors: getStatusColors,
  statusName: getStatusName,
  getStatusOfFirstMeeting,
};
