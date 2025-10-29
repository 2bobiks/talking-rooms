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

export const Button = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "auto",
  padding: "8px",
  border: "1px solid #E8E8E8",
  borderRadius: "6px",
  backgroundColor: "#FFFFFF",
  fontSize: "0.88em",
  transition: "transform 0.1s ease, backgroundColor 0.1s ease",

  "&:hover": {
    transform: "scale(0.97)",
    backgroundColor: "#F9FAFC",
  },
});

export const Image = styled.img({
  maxHeight: "14px",
});
