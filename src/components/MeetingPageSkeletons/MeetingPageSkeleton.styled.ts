import styled from "@emotion/styled";

export const allMeetingsSkeleton = {
  borderRadius: "16px",
  padding: "28px",
  backgroundColor: "#f6f6f6",
  height: "150px",
  margin: "22px",
};

export const conferenceRoomSkeleton = {
  height: "330px",
  borderRadius: "16px",
  backgroundColor: "#f6f6f6",
};

export const dateSkeleton = {
  height: "56px",
  borderRadius: "16px",
  backgroundColor: "#f6f6f6",
  margin: "0 22px 22px 22px",
};

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
