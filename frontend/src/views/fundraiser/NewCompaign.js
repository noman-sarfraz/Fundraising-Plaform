import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import Step1 from "../../components/fundraiser/compaign-steps/Step1";

function Step({ stepNumber, stepName, selected }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 1,
        mr: {
          xs: 1,
          md: 2,
          lg: 6,
        },
        my: 1,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          border: selected ? "1px solid #5D9BE5" : "1px solid #ccc",
          borderRadius: "50%",
          textAlign: "center",
          mr: 1,
        }}
      >
        {stepNumber}
      </Typography>
      <Typography
        color={selected ? "#5A9AE5" : "#3F5267"}
        sx={{ fontWeight: "bold" }}
      >
        {stepName}
      </Typography>
    </Box>
  );
}

function NewCompaign() {
  return (
    <Box>
      <Box>
        <Typography
          color={"#1D548F"}
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            px: 2,
            pt: 2,
          }}
        >
          Start Your Fundraise
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "spece-between",
          px: 2,
          my: 2,
        }}
      >
        <Step stepNumber={1} stepName={"Get Started"} selected={true} />
        <Step stepNumber={2} stepName={"Fundraiser Story"} />
        <Step stepNumber={3} stepName={"Final Details"} />
        <Step stepNumber={4} stepName={"Payment Methods"} />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Step1 />
    </Box>
  );
}

export default NewCompaign;
