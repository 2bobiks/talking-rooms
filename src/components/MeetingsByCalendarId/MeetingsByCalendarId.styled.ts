import styled from "@emotion/styled";

export const AmountOfMeetingsTitle = styled.h5`
  margin: 0;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  padding: 0 0 10px 0;
  font-weight: 400;
`;

interface FirstMeetingsContainerProps {
  amountOfFirstMeeting: number | undefined;
}

export const FirstMeetingsContainer = styled.div<FirstMeetingsContainerProps>`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 22px;

  > * {
    grid-column: auto;
  }

  > :last-of-type:nth-of-type(odd) {
    grid-column: 1 / -1;
  }

  &:has(> :only-of-type) {
    grid-template-columns: 1fr;
  }
`;
