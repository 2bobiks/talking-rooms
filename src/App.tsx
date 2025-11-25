import { MeetingPage } from "./pages/MeetingPage/MeetingPage.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/Global.tsx";
import { useEffect, useState } from "react";
import { themeHelper } from "./lib/themeHelper.ts";

const App = () => {
  // TODO: брать по умолчанию ту что у юзера в системе
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(darkThemeMq.matches);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    darkThemeMq.addEventListener("change", handleChange);

    return () => {
      darkThemeMq.removeEventListener("change", handleChange);
    };
  }, [darkThemeMq]);

  return (
    <ThemeProvider theme={theme(themeHelper.setColorPalette(isDark))}>
      <GlobalStyles />
      <MeetingPage toggleTheme={() => setIsDark((prev) => !prev)} />
    </ThemeProvider>
  );
};

export default App;
