import styled from "@emotion/styled";

interface RoomStatusProps {
  ongoing?: boolean;
}

export const RoomStatusTitle = styled.h5<RoomStatusProps>(
  ({ ongoing, theme }) => ({
    fontWeight: 400,
    margin: 0,
    padding: "4px 10px 4px 10px",
    backgroundColor: ongoing
      ? `${theme.palette.colors.statusTitleOccupied.backgroundColor}`
      : `${theme.palette.colors.statusTitleAvailable.backgroundColor}`,
    borderRadius: "6px",
    color: ongoing
      ? `${theme.palette.colors.statusTitleOccupied.color}`
      : `${theme.palette.colors.statusTitleAvailable.color}`,
  }),
);
