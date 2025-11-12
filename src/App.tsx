import { MeetingPage } from "./pages/MeetingPage/MeetingPage.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/Global.tsx";
import { useMemo, useState } from "react";
import { themeHelper } from "./lib/themeHelper.ts";

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const palette = useMemo(() => themeHelper.setColorPalette(isDark), [isDark]);
  const appTheme = useMemo(() => theme(palette), [palette]);

  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <MeetingPage setIsDark={setIsDark} />
    </ThemeProvider>
  );
};

export default App;
