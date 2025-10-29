import styled from "@emotion/styled";
import { MyTheme } from "../../theme/theme.ts";

interface FirstMeetingContainerProps {
  ongoing?: boolean;
}

interface StatusTitleProps {
  ongoing?: boolean;
  theme: MyTheme;
}

export const Image = styled.img({
  width: "18px",
  height: "18px",
});

export const FirstMeetingContainer = styled.div<FirstMeetingContainerProps>(
  (props) => ({
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    border: props.ongoing ? "1px solid #FFC9C9" : "1px solid #BEDBFF",
    borderRadius: "10px",
    backgroundColor: props.ongoing ? "#FEF2F2" : "#EFF6FF",
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

export const StatusTitle = styled.h5<StatusTitleProps>((props) => ({
  color: props.ongoing ? "#E7000A" : "#145DFC",
  fontSize: props.theme.meetingTitle?.fontSize,
  fontWeight: props.theme.meetingTitle?.fontWeight,
  margin: props.theme.meetingTitle?.margin,
}));
