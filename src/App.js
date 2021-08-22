import logo from "./logo.svg";
import Spinner from "component/Spinner";
import "./App.css";
import Prerender from "component/Prerender";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const Landing = Prerender(() => import("page/landing"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Landing />
    </ThemeProvider>
  );
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {
    primary: {
      main: "#fcba03",
      light: "#e8e8e8",
    },
    bg: {
      main: "#121212",
    },
  },
});

export default App;
