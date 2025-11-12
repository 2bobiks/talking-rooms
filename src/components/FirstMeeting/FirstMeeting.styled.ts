import styled from "@emotion/styled";

interface FirstMeetingContainerProps {
  ongoing?: boolean;
}

interface StatusTitleProps {
  ongoing?: boolean;
}

export const Image = styled.img({
  width: "18px",
  height: "18px",
});

export const FirstMeetingContainer = styled.div<FirstMeetingContainerProps>(
  ({ ongoing, theme }) => ({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    border: ongoing
      ? `1px solid ${theme.palette.colors.firstMeetingOngoing.border}`
      : `1px solid ${theme.palette.colors.firstMeetingNext.border}`,
    borderRadius: "10px",
    backgroundColor: ongoing
      ? `${theme.palette.colors.firstMeetingOngoing.backgroundColor}`
      : `${theme.palette.colors.firstMeetingNext.backgroundColor}`,
    padding: "14px",
    maxHeight: "125px",
    gap: "8px",
    flex: 1,
    marginBottom: "22px",
  }),
);

export const StatusContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  paddingBottom: "6px",
});

export const StatusTitle = styled.h5<StatusTitleProps>(
  ({ ongoing, theme }) => ({
    color: ongoing ? "#E7000A" : "#145DFC",
    fontSize: theme.meetingTitle?.fontSize,
    fontWeight: theme.meetingTitle?.fontWeight,
    margin: theme.meetingTitle?.margin,
  }),
);
