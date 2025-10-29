import { useTheme } from "@emotion/react";
import * as S from "./MeetingDate.styled.ts";
import { MyTheme } from "../../theme/theme.ts";
import { addDays, format, isToday, startOfDay, subDays } from "date-fns";
import leftArrow from "../../assets/arrowLeft.svg";
import rightArrow from "../../assets/arrowRight.svg";
import { Dispatch, SetStateAction } from "react";
import { DateString } from "../../redux/Meeting.ts";

interface MeetingDateProps {
  date: DateString;
  setDate: Dispatch<SetStateAction<DateString>>;
}

export const MeetingsDate = ({ date, setDate }: MeetingDateProps) => {
  const theme: MyTheme = useTheme();

  const getNewDate = (button: "left" | "right", date: DateString) => {
    if (button === "left") {
      if (isToday(date)) {
        setDate(new Date().toISOString());
      }
      setDate(startOfDay(subDays(date, 1)).toISOString());
    } else if (button === "right") {
      if (isToday(date)) {
        setDate(new Date().toISOString());
      }
      setDate(startOfDay(addDays(date, 1)).toISOString());
    }
  };

  return (
    <S.DateContainer theme={theme}>
      <S.Button onClick={() => getNewDate("left", date)}>
        <S.Image src={leftArrow} alt={"arrow"} />{" "}
      </S.Button>
      <h5 style={theme.meetingTitle}>{format(date, "dd.MM.yyyy")}</h5>
      <S.Button onClick={() => getNewDate("right", date)}>
        <S.Image src={rightArrow} alt={"arrow"} />{" "}
      </S.Button>
    </S.DateContainer>
  );
};
