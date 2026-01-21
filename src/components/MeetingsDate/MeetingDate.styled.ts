import styled from "@emotion/styled";

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: ${({ theme }) => theme.mainContainer.flex};
  min-width: ${({ theme }) => theme.mainContainer?.minWidth};
  border: ${({ theme }) => theme.mainContainer?.border};
  border-radius: ${({ theme }) => theme.mainContainer?.borderRadius};
  padding: 12px;
  gap: 20px;
  margin: 0 22px 22px 22px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 8px;
  border: ${({ theme }) => theme.mainContainer?.border};
  border-radius: 6px;
  background-color: transparent;
  font-size: 0.88em;
  transition: transform 0.1s ease, backgroundColor 0.1s ease;

  &:hover {
    transform: scale(0.97);
    background-color: #F9FAFC;
  },
`;
export const Image = styled.img`
  max-height: 14px;
  fill: ${({ theme }) => theme.palette.colors.textColor.primary};
`;
