import { DateString, Meeting, MeetingId } from "../redux/Meeting.ts";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  getDay,
  getHours,
  getMinutes,
  isFuture,
  isPast,
  isSameHour,
  isToday,
  isValid,
  isWithinInterval,
} from "date-fns";
import { meetingRoomA, meetingRoomB } from "../data/meetingRoomsIds.ts";
import { Filter } from "../components/AllMeetings/AllMeetings.tsx";

// без пробела
type MeetingStatus = "no meeting" | "current" | "previous" | "next";

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

  return false;
};

const getMeetingRoomName = (calendarId: number | undefined) => {
  if (calendarId) {
    if (meetingRoomA.calendarId === calendarId) {
      return meetingRoomA.meetingRoomName;
    }

    return meetingRoomB.meetingRoomName;
  }

  return undefined;
};

const hoursTime = (date: string | undefined) => {
  if (date && isValid(new Date(date))) {
    return format(date, "HH:mm");
  }

  return undefined;
};

const timeRange = (
  startDate: DateString | undefined,
  endDate: DateString | undefined,
) => {
  if (
    !startDate ||
    !endDate ||
    !isValid(new Date(startDate)) ||
    !isValid(new Date(endDate))
  ) {
    return undefined;
  }

  return `${hoursTime(startDate)} - ${hoursTime(endDate)}`;
};

const meetingStatus = (meeting: Meeting | undefined): MeetingStatus => {
  if (!meeting) {
    return "no meeting";
  }

  const { startDate, endDate } = meeting;
  if (isValid(new Date(startDate)) && isValid(new Date(endDate))) {
    if (isMeetingOngoing(meeting)) {
      return "current";
    }
    if (isPast(startDate)) {
      return "previous";
    }
    if (isFuture(endDate)) {
      return "next";
    }
  }

  return "no meeting";
};

// мб обьект шлепнуть ?
const statusName = (meetingStatus: MeetingStatus) => {
  switch (meetingStatus) {
    case "current":
      return "Текущая";
    case "next":
      return "Предстоящая";
    case "previous":
      return "Прошедшая";
    default:
      return;
  }
};

const statusColors = (meetingStatus: MeetingStatus) => {
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

const getDayOfTheWeek = (date: DateString | undefined) => {
  if (date) {
    const dayOfTheWeek = getDay(date);

    switch (dayOfTheWeek) {
      case 1:
        return "пн.";
      case 2:
        return "вт.";
      case 3:
        return "ср.";
      case 4:
        return "чт.";
      case 5:
        return "пт.";
      case 6:
        return "сб.";
      case 7:
        return "вс. ";
    }
  }
};

const getDayOfTheWeekOrToday = (date: DateString | undefined) => {
  if (date) {
    if (isToday(date)) {
      return "сегодня";
    }

    return getDayOfTheWeek(date);
  }

  return undefined;
};

const getHourWord = (date: DateString) => {
  const hours = getHours(date);
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "часов";
  }

  if (lastDigit === 1) {
    return "час";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "часа";
  }

  return "часов";
};

const getMinuteWord = (date: DateString) => {
  const minutes = getMinutes(date);
  const lastDigit = minutes % 10;

  if (minutes >= 11 && minutes <= 14) {
    return "минут";
  }

  if (lastDigit === 1) {
    return "минуту";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "минуты";
  }

  return "минут";
};

const getStatusOfFirstMeeting = (meeting: Meeting | undefined) => {
  if (!meeting) {
    return undefined;
  }

  if (isMeetingOngoing(meeting)) {
    return "Сейчас используется";
  }
  if (isSameHour(meeting.startDate, new Date())) {
    return `Следующая встреча через ${differenceInMinutes(meeting.startDate, new Date())} ${getMinuteWord(meeting.startDate)}`;
  }
  if (isToday(meeting.startDate)) {
    return `Следующая встреча через ${differenceInHours(meeting.startDate, new Date())} ${getHourWord(meeting.startDate)}`;
  }

  return `Первая встреча в ${getDayOfTheWeek(meeting.startDate)}`;
};

// в отдельный файл с правилами календаря
const getCalendarIdByRoomName = (roomName: string | undefined) => {
  if (roomName === meetingRoomA.meetingRoomName) {
    return meetingRoomA.calendarId;
  }

  if (roomName === meetingRoomB.meetingRoomName) {
    return meetingRoomB.calendarId;
  }
};

const getSortedMeetingIds = (meetings: Meeting[]): MeetingId[] => {
  return [...meetings]
    .sort((a, b) => {
      const isAOngoing = isMeetingOngoing(a);
      const isBOngoing = isMeetingOngoing(b);
      const isAFuture = isFuture(a.startDate);
      const isBFuture = isFuture(b.startDate);

      if (isAOngoing || (isAFuture && !isBOngoing && !isBFuture)) return -1;
      if (!isBOngoing && !isBFuture) return 1;

      return 0;
    })
    .map((meeting) => meeting.meetingId);
};

const getDropdownOptions = (
  filterType: keyof Filter,
  meetingWhoDuplicate?: string[],
) => {
  switch (filterType) {
    case "meetingRoom":
      return [meetingRoomA.meetingRoomName, meetingRoomB.meetingRoomName];
    case "status":
      return ["Прошедшая", "Текущая", "Предстоящая"];
    case "who":
      return meetingWhoDuplicate;
  }
};

const getDropdownPlaceholder = (filterType: keyof Filter) => {
  switch (filterType) {
    case "meetingRoom":
      return "Переговорки";
    case "status":
      return "Статус";
    case "who":
      return "Организатор";
  }
};

// почикать
export const rules = {
  isTodayNextMeeting,
  isMeetingOngoing,
  getMeetingRoomName,
  hoursTime,
  timeRange,
  statusName,
  meetingStatus,
  statusColors,
  getDayOfTheWeek,
  getDayOfTheWeekOrToday,
  getHourWord,
  getStatusOfFirstMeeting,
  getCalendarIdByRoomName,
  getSortedMeetingIds,
  getMinuteWord,
  getDropdownOptions,
  getDropdownPlaceholder,
};
