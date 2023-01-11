import React from "react";
import { createTheme } from "@mui/material";

const MainTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  pallete: {
    primary: "#1d548f",
    //  {
    //   main: "#1d548f",
    //   light: "#296fba",
    //   dark: "#143559",
    //   contrastText: "#fff",
    // }, // primary: "#378bbd",
    secondary: {
      main: "#616161",
    },
    error: {
      main: "#b60000",
    },
    warning: {
      main: "#ffc107",
    },
    info: {
      main: "#0dacf0",
    },
    success: {
      main: "#198754",
    },
  },
});

export default MainTheme;
