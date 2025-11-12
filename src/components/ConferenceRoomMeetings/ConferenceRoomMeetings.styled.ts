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

export const Button = styled.button`
  display: flex;
  flex: 1;
  max-height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 10px 0 10px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  border: 1px solid ${({ theme }) => theme.palette.colors.borderColor};
  border-radius: 6px;
  background-color: transparent;
  font-size: 0.88em;
  transition:
    transform 0.1s ease,
    backgroundColor 0.1s ease;

  &:hover {
    transform: scale(0.97);
    background-color: ${({ theme }) => theme.palette.colors.hoverButton};
  }
`;

export const NoMeetingTitle = styled.h5`
  font-weight: 400;
  margin: 0;
  font-size: 0.94em;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
`;
