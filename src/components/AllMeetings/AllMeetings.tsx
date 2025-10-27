import { useAppSelector } from "../../redux/store.ts";
import { selectMeetingsIdsByFilter } from "../../redux/meetingsSlice.ts";
import { Meeting } from "../Meeting/Meeting.tsx";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../theme/theme.ts";
import * as S from "./AllMeetings.styled.ts";
import { DropdownFilter } from "../DropDownFilter/DropdownFilter.tsx";
import { useState } from "react";

export interface Filter {
  meetingRoom: string | undefined;
  status: string | undefined;
}

export const AllMeetings = () => {
  const [filter, setFilter] = useState<Filter>({
    meetingRoom: undefined,
    status: undefined,
  });

  const meetingIds = useAppSelector((state) =>
    selectMeetingsIdsByFilter(state, filter),
  );
  const theme: MyTheme = useTheme();

  return (
    <S.AllMeetingsContainer theme={theme}>
      <S.TitleContainer>Все встречи</S.TitleContainer>
      <S.FilterContainer>
        <DropdownFilter
          filterType={"meetingRoom"}
          filter={filter}
          setFilter={setFilter}
        />
        <DropdownFilter
          filterType={"status"}
          filter={filter}
          setFilter={setFilter}
        />
      </S.FilterContainer>
      <S.MeetingsContainer>
        {meetingIds.map((meetingId) => (
          <Meeting meetingId={meetingId} key={meetingId} />
        ))}
      </S.MeetingsContainer>
    </S.AllMeetingsContainer>
  );
};
