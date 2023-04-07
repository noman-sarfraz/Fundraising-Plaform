import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

function PageHeader({header, text}) {
  return (
    <Box sx={{ py: 5, bgcolor: "#EEF5FE", mb: 5 }}>
      <Typography
        sx={{
          color: "#1D548F",
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          mb: 1.5,
        }}
      >
        {header}
      </Typography>
      <Typography
        sx={{
          color: "#2F435A",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default PageHeader
