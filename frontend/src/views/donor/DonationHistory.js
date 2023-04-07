import { Box, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../../components/general/PageHeader";

function DonationHistory() {
  return (
    <Box>
      <PageHeader
        header="Donation History"
        text="See list of all the donations you have made to different campaigns here"
      />
      <Typography
        sx={{ textAlign: "center", fontSize: 14, fontStyle: "italic", mb: 2 }}
      >
        You haven't made any donations yet.
      </Typography>
    </Box>
  );
}

export default DonationHistory;
