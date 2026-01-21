const getFirstMeetings = (
  meetingIdsByCalendarId: string[] | null,
  ongoingMeetingsByCalendarId: string[] | undefined,
) => {
  if (meetingIdsByCalendarId) {
    if (
      ongoingMeetingsByCalendarId &&
      ongoingMeetingsByCalendarId.length === 0
    ) {
      return [meetingIdsByCalendarId[0]];
    }

    return ongoingMeetingsByCalendarId;
  }
};

const getMeetingsByDate = (
  meetingIdsByCalendarId: string[] | null,
  ongoingMeetingsByCalendarId: string[] | undefined,
) => {
  if (meetingIdsByCalendarId) {
    if (
      ongoingMeetingsByCalendarId &&
      ongoingMeetingsByCalendarId.length === 0
    ) {
      return meetingIdsByCalendarId.slice(1);
    }

    return meetingIdsByCalendarId.filter(
      (meetingId) =>
        ongoingMeetingsByCalendarId &&
        !ongoingMeetingsByCalendarId.includes(meetingId),
    );
  }
};

export const meetingsSortHelper = {
  getFirstMeetings,
  getMeetingsByDate,
};
