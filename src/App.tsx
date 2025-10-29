import { MeetingPage } from "./pages/MeetingPage/MeetingPage.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";
import { GlobalStyles } from "./theme/Global.tsx";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MeetingPage />;
    </ThemeProvider>
  );
};

export default App;
