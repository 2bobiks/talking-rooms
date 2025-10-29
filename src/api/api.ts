import { createAsyncThunk } from "@reduxjs/toolkit";
import { MeetingsDto } from "../redux/dto.ts";

const url = import.meta.env.VITE_REACT_APP_API_KEY;

const fetchMeetingsThunk = createAsyncThunk(
  "meetings/fetchMeetings",
  async () => {
    const response = await fetch(`${url}/week-events`);
    const result: MeetingsDto = await response.json();

    return result.body.events.map((meeting) => ({
      meetingId: meeting.id,
      title: meeting.title,
      who: meeting.who,
      startDate: meeting.start_dt,
      endDate: meeting.end_dt,
      calendarId: meeting.subcalendar_id,
    }));
  },
);

export const api = { fetchMeetingsThunk };
