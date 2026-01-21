import { useTheme } from "@emotion/react";
import { CSSProperties } from "react";
import { Palette } from "../lib/themeHelper.ts";

export interface AppTheme {
  meetingTitle: CSSProperties;
  meetingTime: CSSProperties;
  meetingWho: CSSProperties;
  mainContainer: CSSProperties;
  meetingContainer: CSSProperties;
  container: CSSProperties;
  palette: Palette;
}

export type AppThemeExtended = AppTheme & { palette: Palette };

export const theme = (palette: Palette): AppThemeExtended => {
  const colorPalette = palette.colors;

  return {
    meetingTitle: {
      color: colorPalette.textColor.primary,
      fontSize: "0.9em",
      fontWeight: 400,
      margin: 0,
    },
    meetingTime: {
      margin: 0,
      color: colorPalette.textColor.secondary,
      fontWeight: 400,
      fontSize: "0.74em",
    },
    meetingWho: {
      margin: 0,
      color: colorPalette.textColor.secondary,
      fontWeight: 400,
      fontSize: "0.83em",
    },
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 0,
      border: `1px solid ${colorPalette.borderColor}`,
      borderRadius: "16px",
      padding: "28px",
      gap: "8px",
    },
    meetingContainer: {
      display: "flex",
      flexDirection: "column",
      padding: "14px",
      gap: "8px",
      border: `1px solid ${colorPalette.borderColor}`,
      borderRadius: "10px",
    },
    container: {
      backgroundColor: colorPalette.background,
    },
    palette,
  };
};

export const useAppTheme = (): AppTheme => useTheme() as AppTheme;
