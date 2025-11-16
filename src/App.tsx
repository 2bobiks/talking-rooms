import { MeetingPage } from "./pages/MeetingPage/MeetingPage.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/Global.tsx";
import { useState } from "react";
import { themeHelper } from "./lib/themeHelper.ts";

const App = () => {
  // TODO: брать по умолчанию ту что у юзера в системе
  const [isDark, setIsDark] = useState(false);
  const palette = themeHelper.setColorPalette(isDark);

  return (
    <ThemeProvider theme={theme(palette)}>
      <GlobalStyles />
      {/* TODO: функу в контекст */}
      <MeetingPage toggleTheme={() => setIsDark((prev) => !prev)} />
    </ThemeProvider>
  );
};

export default App;
