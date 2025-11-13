import styled from "@emotion/styled";

interface FirstMeetingContainerProps {
  ongoing?: boolean;
  conflict: boolean;
}

interface StatusTitleProps {
  ongoing?: boolean;
  conflict: boolean;
}

export const FirstMeetingContainer = styled.div<FirstMeetingContainerProps>(
  ({ ongoing, theme, conflict }) => {
    let borderColor = theme.palette.colors.firstMeetingNext.border;
    let backgroundColor = theme.palette.colors.firstMeetingNext.backgroundColor;

    if (ongoing && !conflict) {
      borderColor = theme.palette.colors.firstMeetingOngoing.border;
      backgroundColor =
        theme.palette.colors.firstMeetingOngoing.backgroundColor;
    } else if (ongoing && conflict) {
      borderColor = theme.palette.colors.firstMeetingOngoingConflict.border;
      backgroundColor =
        theme.palette.colors.firstMeetingOngoingConflict.backgroundColor;
    }

    return {
      display: "flex",
      flexDirection: "column",
      paddingBottom: "20px",
      border: `1px solid ${borderColor}`,
      borderRadius: "10px",
      backgroundColor,
      padding: "14px",
      maxHeight: "125px",
      gap: "8px",
      flex: 1,
    };
  },
);

export const StatusContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  paddingBottom: "6px",
});

export const StatusTitle = styled.h5<StatusTitleProps>(
  ({ ongoing, theme, conflict }) => {
    let textColor = "#145DFC";
    if (ongoing && !conflict) {
      textColor = "#E7000A";
    }
    if (ongoing && conflict) {
      textColor = "#D18700";
    }

    return {
      color: textColor,
      fontSize: theme.meetingTitle?.fontSize,
      fontWeight: theme.meetingTitle?.fontWeight,
      margin: theme.meetingTitle?.margin,
    };
  },
);
