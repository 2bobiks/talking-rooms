import { useTheme } from "@emotion/react";
import { CSSProperties } from "react";

export interface AppTheme {
  meetingTitle: CSSProperties;
  meetingTime: CSSProperties;
  meetingWho: CSSProperties;
  mainContainer: CSSProperties;
  meetingContainer: CSSProperties;
}

export const theme: AppTheme = {
  meetingTitle: {
    color: "#0a0a0a",
    fontSize: "0.9em",
    fontWeight: 400,
    margin: 0,
  },
  meetingTime: {
    margin: 0,
    color: "#717182",
    fontWeight: 400,
    fontSize: "0.74em",
  },
  meetingWho: {
    margin: 0,
    color: "#717182",
    fontWeight: 400,
    fontSize: "0.83em",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    border: "1px solid #E8E8E8",
    borderRadius: "16px",
    padding: "28px",
    gap: "8px",
  },
  meetingContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "14px",
    gap: "8px",
    border: "1px solid #EAEAEA",
    borderRadius: "10px",
  },
};

export const useAppTheme = (): AppTheme => useTheme() as AppTheme;
