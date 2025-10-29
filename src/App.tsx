import { MeetingPage } from "./pages/MeetingPage/MeetingPage.tsx";
import { css, Global, ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme.ts";

// TODO: попробовать в темизацию ThemeProvider
const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,1,100..900&display=swap");

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
        }
      `}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MeetingPage />;
    </ThemeProvider>
  );
};

export default App;
