import styled from "@emotion/styled";

interface OngoingMeetingsContainerProps {
  ongoingLength: number;
}

export const OngoingMeetingsContainer = styled.div`
  display: flex;
  flex-direction: ${(props: OngoingMeetingsContainerProps) =>
    props.ongoingLength === 2 ? "row" : "column"};
  gap: 10px;
  justify-content: ${(props: OngoingMeetingsContainerProps) =>
    props.ongoingLength === 2 && "space-between"};
  margin-bottom: 22px;
`;

export const AmountOfMeetingsTitle = styled.h5({
  margin: 0,
  color: "#0A0A0A",
  padding: "0 0 10px 0",
  fontWeight: 400,
});
