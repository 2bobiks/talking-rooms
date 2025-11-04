import {
  format,
  getDay,
  getHours,
  getMinutes,
  isToday,
  isValid,
} from "date-fns";
import { DateString } from "../redux/Meeting.ts";

const getHoursTime = (date: string | undefined) => {
  if (date && isValid(new Date(date))) {
    return format(date, "HH:mm");
  }
};

const getTimeRange = (
  startDate: string | undefined,
  endDate: string | undefined,
) => {
  if (
    startDate &&
    endDate &&
    isValid(new Date(startDate)) &&
    isValid(new Date(endDate))
  ) {
    return `${getHoursTime(startDate)} - ${getHoursTime(endDate)}`;
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

export const dateHelper = {
  hoursTime: getHoursTime,
  timeRange: getTimeRange,
  getDayOfTheWeek,
  getDayOfTheWeekOrToday,
  getHourWord,
  getMinuteWord,
};
