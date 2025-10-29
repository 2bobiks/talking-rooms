export interface MeetingsDto {
  body: MeetingsBody;
}

interface MeetingsBody {
  events: MeetingsEvent[];
  timestamp: number;
}

interface MeetingsEvent {
  id: string;
  subcalendar_id: number;
  title: string;
  who: string;
  start_dt: string;
  end_dt: string;
}
