import { meetingRoomA, meetingRoomB } from "../../data/meetingRoomsIds.ts";
import { Dropdown } from "primereact/dropdown";
import { Dispatch, SetStateAction } from "react";
import * as S from "./DropdownFilter.styled.ts";
import { Filter } from "../AllMeetings/AllMeetings.tsx";

interface DropdownFilterProps {
  filterType: "meetingRoom" | "status";
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export const DropdownFilter = ({
  filterType,
  filter,
  setFilter,
}: DropdownFilterProps) => {
  return (
    <Dropdown
      value={filterType === "meetingRoom" ? filter.meetingRoom : filter.status}
      onChange={(e) =>
        setFilter((prev) =>
          filterType === "meetingRoom"
            ? { ...prev, meetingRoom: e.value }
            : { ...prev, status: e.value },
        )
      }
      options={
        filterType === "meetingRoom"
          ? [meetingRoomA.meetingRoomName, meetingRoomB.meetingRoomName]
          : ["Прошедшая", "Текущая", "Предстоящая"]
      }
      optionLabel="name"
      showClear
      placeholder={filterType === "meetingRoom" ? "Переговорка" : "Статус"}
      style={S.dropdownFilterStyled}
      panelClassName={S.dropdownAllElements}
      itemTemplate={(option) => <div style={S.dropdownElement}>{option}</div>}
    />
  );
};
