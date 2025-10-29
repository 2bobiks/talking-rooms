export type MeetingId = string;

export type DateString = string;

export interface Meeting {
  meetingId: MeetingId;
  title: string;
  who: string;
  startDate: DateString;
  endDate: DateString;
  calendarId: number;
}
