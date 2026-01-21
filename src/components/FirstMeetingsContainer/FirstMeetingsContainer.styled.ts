import styled from "@emotion/styled";

interface FirstMeetingsContainerProps {
  isValidFirstMeeting: boolean;
}

export const FirstMeetingsContainer = styled.div<FirstMeetingsContainerProps>`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: ${({ isValidFirstMeeting }) =>
    isValidFirstMeeting ? "22px" : 0};

  > * {
    grid-column: auto;
  }

  > :nth-of-type(3),
  > :nth-of-type(4) {
    margin-bottom: 26px;
  }

  > :last-of-type:nth-of-type(odd) {
    grid-column: 1 / -1;
  }

  &:has(> :only-of-type) {
    grid-template-columns: 1fr;
  }
`;
