import "@emotion/react";
import { AppTheme } from "./theme.ts";

declare module "@emotion/react" {
  export type Theme = AppTheme;
}
