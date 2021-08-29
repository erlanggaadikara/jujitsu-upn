import "./App.css";
import Prerender from "component/Prerender";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Router, Location } from "@reach/router";
import { LocalizationProvider } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";

const Landing = Prerender(() => import("page/landing"));
const Daftar = Prerender(() => import("page/form/Daftar"));
const Blog = Prerender(() => import("page/blog"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <Landing path="/" />
          <Daftar path="/Daftar" />
          <Blog path="/Blog/:slug" />
        </Router>
      </LocalizationProvider>
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
