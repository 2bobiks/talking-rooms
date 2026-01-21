import { Filter } from "../components/AllMeetings/AllMeetings.tsx";
import { meetingRoomA, meetingRoomB } from "../data/meetingRoomsIds.ts";

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

export const dropdownHelper = {
  getDropdownOptions,
  getDropdownPlaceholder,
};
