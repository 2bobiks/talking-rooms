import styled from "@emotion/styled";

export const Title = styled.h1`
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  font-size: 1.75em;
`;

export const DateTitle = styled.h5`
  color: ${({ theme }) => theme.meetingTitle?.color};
  font-size: ${({ theme }) => theme.meetingTitle?.fontSize};
  font-weight: ${({ theme }) => theme.meetingTitle?.fontWeight};
  margin: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 26px;
  justify-content: space-between;
  padding: 0 22px 0 22px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 16px;
  },`;

export const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

export const TitleAndButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 22px 25px 22px;
`;
