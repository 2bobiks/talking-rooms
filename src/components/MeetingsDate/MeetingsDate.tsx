import * as S from "./MeetingDate.styled.ts";
import { addDays, startOfDay, subDays } from "date-fns";
import LeftArrow from "../../assets/arrowLeft.svg?react";
import RightArrow from "../../assets/arrowRight.svg?react";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { DateString } from "../../redux/Meeting.ts";
import { useAppTheme } from "../../theme/theme.ts";

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
  const theme = useAppTheme();
  const getNewDate = (position: "left" | "right") => {
    setDate((prev) => updateDate(prev, position));
  };

  return (
    <S.DateContainer>
      <S.Button onClick={() => getNewDate("left")}>
        <LeftArrow
          height={"14px"}
          fill={`${theme.palette.colors.textColor.primary}`}
        />
      </S.Button>
      {children}
      <S.Button onClick={() => getNewDate("right")}>
        <RightArrow
          height={"14px"}
          fill={`${theme.palette.colors.textColor.primary}`}
        />
      </S.Button>
    </S.DateContainer>
  );
};
