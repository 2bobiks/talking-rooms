import styled from "@emotion/styled";

export const AllMeetingsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 22px;
  padding: ${({ theme }) => theme.mainContainer.padding};
  border: ${({ theme }) => theme.mainContainer.border};
  border-radius: ${({ theme }) => theme.mainContainer.borderRadius};
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-bottom: 12px;
`;

export const MeetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TitleContainer = styled.h4`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  margin: 0;
  font-size: 1em;
  padding-bottom: 32px;
`;
