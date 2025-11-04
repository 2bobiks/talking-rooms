import { meetingRoomA, meetingRoomB } from "../data/meetingRoomsIds.ts";

const getCalendarIdByRoomName = (roomName: string | undefined) => {
  if (roomName === meetingRoomA.meetingRoomName) {
    return meetingRoomA.calendarId;
  }

  if (roomName === meetingRoomB.meetingRoomName) {
    return meetingRoomB.calendarId;
  }
};

const getMeetingRoomName = (meetingRoomId: number | undefined) => {
  if (meetingRoomId) {
    if (meetingRoomA.calendarId === meetingRoomId) {
      return meetingRoomA.meetingRoomName;
    }

    return meetingRoomB.meetingRoomName;
  }
};

export const meetingCalendarIdHelper = {
  getCalendarIdByRoomName,
  getMeetingRoomName,
};
