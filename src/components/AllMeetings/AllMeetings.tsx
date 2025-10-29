import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingsIdsByFilter,
  selectMeetingWhoDuplicates,
} from "../../redux/meetingsSlice.ts";
import { Meeting } from "../Meeting/Meeting.tsx";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../theme/theme.ts";
import * as S from "./AllMeetings.styled.ts";
import { DropdownFilter } from "../DropDownFilter/DropdownFilter.tsx";
import { useState } from "react";

export interface Filter {
  meetingRoom: string | undefined;
  status: string | undefined;
  who: string | undefined;
}

export const AllMeetings = () => {
  const [filter, setFilter] = useState<Filter>({
    meetingRoom: undefined,
    status: undefined,
    who: undefined,
  });

  const meetingIds = useAppSelector((state) =>
    selectMeetingsIdsByFilter(state, filter),
  );

  const meetingWhoDuplicates = useAppSelector((state) =>
    selectMeetingWhoDuplicates(state),
  );

  const theme: MyTheme = useTheme();

  return (
    <S.AllMeetingsContainer theme={theme}>
      <S.TitleContainer>Все встречи</S.TitleContainer>
      <S.FilterContainer>
        {(Object.keys(filter) as Array<keyof Filter>).map((filterType) => (
          <DropdownFilter
            filterType={filterType}
            filter={filter}
            setFilter={setFilter}
            key={filterType}
            meetingWhoDuplicates={meetingWhoDuplicates}
          />
        ))}
      </S.FilterContainer>
      <S.MeetingsContainer>
        {meetingIds &&
          meetingIds.map((meetingId) => (
            <Meeting meetingId={meetingId} key={meetingId} />
          ))}
      </S.MeetingsContainer>
    </S.AllMeetingsContainer>
  );
};
