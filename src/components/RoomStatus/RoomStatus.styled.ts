import styled from "@emotion/styled";

interface RoomStatusProps {
  ongoing?: boolean;
}

export const RoomStatusTitle = styled.h5((props: RoomStatusProps) => ({
  fontWeight: 400,
  margin: 0,
  padding: "4px 10px 4px 10px",
  backgroundColor: props.ongoing ? "#FEF2F2" : "#DCFCE7",
  borderRadius: "6px",
  color: props.ongoing ? "#9F0811" : "#036730",
}));
