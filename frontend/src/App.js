import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Routes from "./routes";
// import Practice from "./PRACTICE";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
      {/* <Practice /> */}
    </ThemeProvider>
  );
}

export default App;
