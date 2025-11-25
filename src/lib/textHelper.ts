import { dateHelper } from "./dateHelper.ts";

const getText = (meetingLength: number, startDate: string | undefined) => {
  return `Расписание на
  ${dateHelper.getDayOfTheWeekOrToday(startDate)}
  (Встреч: ${meetingLength})`;
};

export const textHelper = {
  getText,
};
