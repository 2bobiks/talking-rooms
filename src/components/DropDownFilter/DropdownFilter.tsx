import { Dropdown } from "primereact/dropdown";
import { Dispatch, SetStateAction } from "react";
import * as S from "./DropdownFilter.styled.ts";
import { Filter } from "../AllMeetings/AllMeetings.tsx";
import { rules } from "../../rules/rules.ts";

interface DropdownFilterProps {
  filterType: keyof Filter;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  meetingWhoDuplicates: string[];
}

export const DropdownFilter = ({
  filterType,
  filter,
  setFilter,
  meetingWhoDuplicates,
}: DropdownFilterProps) => {
  return (
    <div>
      {!(filterType === "who" && meetingWhoDuplicates.length === 0) && (
        <Dropdown
          value={filter[filterType]}
          onChange={(e) =>
            setFilter((prev) =>
              filterType ? { ...prev, [filterType]: e.value } : prev,
            )
          }
          options={
            filterType === "who"
              ? rules.getDropdownOptions(filterType, meetingWhoDuplicates)
              : rules.getDropdownOptions(filterType)
          }
          optionLabel="name"
          showClear
          placeholder={rules.getDropdownPlaceholder(filterType)}
          style={S.dropdownFilterStyled}
          panelClassName={S.dropdownAllElements}
          itemTemplate={(option) => (
            <S.DropdownWrapper>{option}</S.DropdownWrapper>
          )}
        />
      )}
    </div>
  );
};
