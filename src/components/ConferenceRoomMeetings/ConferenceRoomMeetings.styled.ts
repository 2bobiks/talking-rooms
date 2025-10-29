import styled from "@emotion/styled";

interface TodayMeetingsContainerProps {
  isHidden: boolean;
}

export const VisibleMeetingsContainer = styled.div<TodayMeetingsContainerProps>(
  (props) => ({
    display: "flex",
    flexDirection: "column",
    overflow: props.isHidden ? "hidden" : "visible",
    maxHeight: props.isHidden ? "327px" : "auto",
    transition: "max-height 0.2s ease",
  }),
);

export const Button = styled.button({
  display: "flex",
  flex: "1",
  maxHeight: "40px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "auto",
  padding: "10px 0 10px 0",
  fontWeight: 400,
  border: "1px solid #E8E8E8",
  borderRadius: "6px",
  backgroundColor: "#FFFFFF",
  fontSize: "0.88em",
  transition: "transform 0.1s ease, backgroundColor 0.1s ease",

  "&:hover": {
    transform: "scale(0.97)",
    backgroundColor: "#F9FAFC",
  },
});
