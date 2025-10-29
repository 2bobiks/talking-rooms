import * as S from "./MeetingDate.styled.ts";
import { addDays, startOfDay, subDays } from "date-fns";
import leftArrow from "../../assets/arrowLeft.svg";
import rightArrow from "../../assets/arrowRight.svg";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { DateString } from "../../redux/Meeting.ts";

interface MeetingDateProps extends PropsWithChildren {
  setDate: Dispatch<SetStateAction<DateString>>;
}

const dateActions: Record<"left" | "right", typeof subDays | typeof addDays> = {
  left: subDays,
  right: addDays,
};

const updateDate = (date: DateString, position: "left" | "right") =>
  startOfDay(dateActions[position](date, 1)).toISOString();

export const MeetingsDate = ({ setDate, children }: MeetingDateProps) => {
  const getNewDate = (position: "left" | "right") => {
    setDate((prev) => updateDate(prev, position));
  };

  return (
    <S.DateContainer>
      <S.Button onClick={() => getNewDate("left")}>
        <S.Image src={leftArrow} alt={"arrow"} />
      </S.Button>
      {children}
      <S.Button onClick={() => getNewDate("right")}>
        <S.Image src={rightArrow} alt={"arrow"} />
      </S.Button>
    </S.DateContainer>
  );
};
