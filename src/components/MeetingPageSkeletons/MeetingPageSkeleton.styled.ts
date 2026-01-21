import styled from "@emotion/styled";

export const allMeetingsSkeleton = (skeletonColor: string) => {
  return {
    borderRadius: "16px",
    padding: "28px",
    backgroundColor: skeletonColor,
    height: "150px",
    margin: "22px",
  };
};

export const conferenceRoomSkeleton = (skeletonColor: string) => {
  return {
    height: "330px",
    borderRadius: "16px",
    backgroundColor: skeletonColor,
  };
};

export const dateSkeleton = (skeletonColor: string) => {
  return {
    height: "56px",
    borderRadius: "16px",
    backgroundColor: skeletonColor,
    margin: "0 22px 22px 22px",
  };
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
