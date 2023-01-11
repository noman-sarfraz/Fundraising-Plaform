import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function CircularLoader(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid lightgrey",
            boxShadow: "2px 2px 8px lightgrey",
            borderRadius: "50%",
            padding: "5px",
          }}
        >
          <CircularProgress color="primary" size={20} />
        </Box>
    </Box>
  );
}

export default CircularLoader;
