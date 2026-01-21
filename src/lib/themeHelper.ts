type Color = `#${string}`;

export type Palette = {
  colors: {
    background: Color;
    textColor: {
      primary: Color;
      secondary: Color;
    };
    borderColor: Color;
    meetingColor: Color;
    hoverButton: Color;
    meetingContainer: Color;
    dropdownBackground: Color;
    firstMeetingNext: {
      border: Color;
      backgroundColor: Color;
    };
    firstMeetingOngoing: {
      border: Color;
      backgroundColor: Color;
    };
    firstMeetingOngoingConflict: {
      border: Color;
      backgroundColor: Color;
    };
    statusTitleOccupied: {
      backgroundColor: Color;
      color: Color;
    };
    statusTitleAvailable: {
      backgroundColor: Color;
      color: Color;
    };
    skeleton: Color;
    themeName: string;
  };
};

// TODO: передел на обьект вроде { dark: ..., light: ... }

const setColorPalette = (isDark: boolean): Palette => {
  return {
    colors: {
      background: isDark ? "#171717" : "#FFFFFF",
      textColor: {
        primary: isDark ? "#F0F0F0" : "#0A0A0A",
        secondary: "#717182",
      },
      borderColor: isDark ? "#5f5f5f" : "#E8E8E8",
      meetingColor: isDark ? "#1D1C1C" : "#F9FAFC",
      hoverButton: isDark ? "#252525" : "#f8f8f8",
      meetingContainer: isDark ? "#1D1C1C" : "#f9fafc",
      dropdownBackground: isDark ? "#303030" : "#f6f6f6",
      firstMeetingNext: {
        border: isDark ? "#145DFC" : "#BEDBFF",
        backgroundColor: isDark ? "#141414" : "#EFF6FF",
      },
      firstMeetingOngoing: {
        border: isDark ? "#860101" : "#FFC9C9",
        backgroundColor: isDark ? "#141414" : "#FEF2F2",
      },
      firstMeetingOngoingConflict: {
        border: isDark ? "#D18700" : "#FFEF8D",
        backgroundColor: isDark ? "#141414" : "#FEFCE9",
      },
      statusTitleOccupied: {
        backgroundColor: isDark ? "#1E1E1E" : "#FEF2F2",
        color: isDark ? "#FF020E" : "#9F0811",
      },
      statusTitleAvailable: {
        backgroundColor: isDark ? "#1E1E1E" : "#DCFCE7",
        color: isDark ? "#08D464" : "#036730",
      },
      skeleton: isDark ? "#272727" : "#f6f6f6",
      // не должно быть в палете
      themeName: isDark ? "dark" : "light",
    },
  };
};

export const themeHelper = { setColorPalette };
