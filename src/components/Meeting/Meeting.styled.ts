import styled from "@emotion/styled";

interface MeetingStatusProps {
  color: string;
  fontColor: string;
}

export const MeetingStatus = styled.h5<MeetingStatusProps>((props) => ({
  margin: 0,
  padding: "4px 10px 4px 10px",
  color: props.fontColor,
  backgroundColor: props.color,
  border: "1px solid #F3F4F6",
  borderRadius: "7px",
  fontSize: "0.8em",
  fontWeight: 400,
}));

export const ContentContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
});

export const Image = styled.img({
  width: "14px",
  height: "14px",
});

export const MeetingTime = styled.h5({
  paddingRight: "8px",
});
