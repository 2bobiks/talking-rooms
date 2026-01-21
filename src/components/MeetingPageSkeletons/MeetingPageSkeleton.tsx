import { Skeleton } from "@gravity-ui/uikit";
import * as S from "./MeetingPageSkeleton.styled.ts";
import { useAppTheme } from "../../theme/theme.ts";

export const MeetingPageSkeleton = () => {
  const theme = useAppTheme();

  return (
    <>
      <Skeleton
        style={S.dateSkeleton(theme.palette.colors.skeleton)}
        animation={"pulse"}
      />
      <S.Container>
        <Skeleton
          style={S.conferenceRoomSkeleton(theme.palette.colors.skeleton)}
          animation={"pulse"}
        />
        <Skeleton
          style={S.conferenceRoomSkeleton(theme.palette.colors.skeleton)}
          animation={"pulse"}
        />
      </S.Container>
      <Skeleton
        style={S.allMeetingsSkeleton(theme.palette.colors.skeleton)}
        animation={"pulse"}
      />
    </>
  );
};
