import { useAppSelector } from "../../redux/store.ts";
import {
  selectMeetingsIdsByFilter,
  selectMeetingWhoDuplicates,
} from "../../redux/meetingsSlice.ts";
import { useAppTheme } from "../../theme/theme.ts";
import * as S from "./AllMeetings.styled.ts";
import { DropdownFilter } from "../DropDownFilter/DropdownFilter.tsx";
import { useState } from "react";
import { Meeting } from "../Meeting/Meeting.tsx";

export interface Filter {
  meetingRoom: string | undefined;
  status: string | undefined;
  who: string | undefined;
}

export const AllMeetings = () => {
  // почему обьект в стейте это чаще всего плохо ? + почему лучше вот такой вариант
  // const [filter, setFilter] = useState<Filter>(() => ({
  //   meetingRoom: undefined,
  //   status: undefined,
  //   who: undefined,
  // }));
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

  const theme = useAppTheme();

  return (
    <S.AllMeetingsContainer theme={theme}>
      <S.TitleContainer>Все встречи</S.TitleContainer>
      {/* TODO: сюда только функцию для обновления  */}
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
      {/* TODO: сюда само значение фильтра */}
      <S.MeetingsContainer>
        {meetingIds &&
          meetingIds.map((meetingId) => (
            <Meeting meetingId={meetingId} key={meetingId} />
          ))}
      </S.MeetingsContainer>
    </S.AllMeetingsContainer>
  );
};
