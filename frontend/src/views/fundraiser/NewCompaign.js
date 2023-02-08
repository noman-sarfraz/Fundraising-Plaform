import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StartFundraiseStep from "../../components/fundraiser/compaign-steps/StartFundraiseStep";

function Step({ stepNumber, stepName, selected, onClick }) {
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
          cursor: "pointer",
        }}
        onClick={onClick}
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

const stepHeaders = [
  { stepNo: 1, heading: "Get Started" },
  { stepNo: 2, heading: "Fundraiser Story" },
  { stepNo: 3, heading: "Payment Methods" },
];

function NewCompaign() {
  const [stepNo, setStepNo] = useState(1);

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
        {stepHeaders.map((stepHeader) => (
          <Step
            stepNumber={stepHeader.stepNo}
            stepName={stepHeader.heading}
            selected={stepNo === stepHeader.stepNo}
            onClick={() => setStepNo(stepHeader.stepNo)}
          />
        ))}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <StartFundraiseStep stepNo={stepNo} />
    </Box>
  );
}

export default NewCompaign;
