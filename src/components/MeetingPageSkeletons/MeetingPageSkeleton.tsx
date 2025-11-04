import { Skeleton } from "@gravity-ui/uikit";
import * as S from "./MeetingPageSkeleton.styled.ts";

export const MeetingPageSkeleton = () => {
  return (
    <>
      <Skeleton style={S.dateSkeleton} animation={"pulse"} />
      <S.Container>
        <Skeleton style={S.conferenceRoomSkeleton} animation={"pulse"} />
        <Skeleton style={S.conferenceRoomSkeleton} animation={"pulse"} />
      </S.Container>
      <Skeleton style={S.allMeetingsSkeleton} animation={"pulse"} />
    </>
  );
};
