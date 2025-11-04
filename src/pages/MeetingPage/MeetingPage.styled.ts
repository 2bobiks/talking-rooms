import styled from "@emotion/styled";

export const Title = styled.h1({
  fontWeight: 400,
  margin: 0,
  padding: "15px 0 25px 22px",
  color: "#0A0A0A",
  fontSize: "1.75em",
});

export const DateTitle = styled.h5`
  color: ${({ theme }) => theme.meetingTitle?.color};
  font-size: ${({ theme }) => theme.meetingTitle?.fontSize};
  font-weight: ${({ theme }) => theme.meetingTitle?.fontWeight};
  margin: 0;
`;

export const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: "26px",
  justifyContent: "space-between",
  padding: "0 22px 0 22px",

  "@media (max-width: 700px)": {
    flexDirection: "column",
    gap: "16px",
  },
});
