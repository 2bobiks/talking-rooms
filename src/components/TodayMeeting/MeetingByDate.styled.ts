import styled from "@emotion/styled";

export const MeetingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  background-color: ${({ theme }) => theme.palette.colors.meetingContainer};
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 6px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;
