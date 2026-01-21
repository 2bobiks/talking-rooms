import styled from "@emotion/styled";

export const Title = styled.h5`
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.palette.colors.textColor.primary};
  font-size: 0.94em;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 22px;
  align-items: center;
`;
