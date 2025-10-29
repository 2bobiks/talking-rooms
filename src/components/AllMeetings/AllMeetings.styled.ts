import styled from "@emotion/styled";
import { MyTheme } from "../../theme/theme.ts";

interface AllMeetingsContainerProps {
  theme: MyTheme;
}

export const AllMeetingsContainer = styled.div<AllMeetingsContainerProps>(
  (props) => ({
    display: "flex",
    flex: "1",
    flexDirection: "column",
    margin: "22px",
    padding: props.theme.mainContainer?.padding,
    border: props.theme.mainContainer?.border,
    borderRadius: props.theme.mainContainer?.borderRadius,
  }),
);

export const FilterContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
  paddingBottom: "12px",
});

export const MeetingsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const TitleContainer = styled.h4({
  fontWeight: 400,
  color: "#0A0A0A",
  margin: 0,
  fontSize: "1em",
  paddingBottom: "32px",
});
