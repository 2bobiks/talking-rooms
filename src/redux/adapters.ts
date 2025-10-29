import { createEntityAdapter } from "@reduxjs/toolkit";
import { Meeting, MeetingId } from "./Meeting.ts";

export const meetingsAdapter = createEntityAdapter<Meeting, MeetingId>({
  selectId: (meeting: Meeting) => meeting.meetingId,
});
