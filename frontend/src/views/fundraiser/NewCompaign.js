import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StartFundraiseStep from "../../components/fundraiser/compaign-steps/StartFundraiseStep";

function Step({ stepNumber, stepName, selected, disabled, onClick }) {
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
          cursor: !disabled ? "pointer" : "default",
        }}
        color={selected ? "#5A9AE5" : disabled ? "#ccc" : "#3F5267"}
        onClick={!disabled ? onClick : null}
      >
        {stepNumber}
      </Typography>
      <Typography
        color={selected ? "#5A9AE5" : disabled ? "#ccc" : "#3F5267"}
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

const stepDoneInit = { step1: false, step2: false, step3: false };

function NewCompaign() {
  const [stepNo, setStepNo] = useState(1);
  const [stepDone, setStepDone] = useState(stepDoneInit);

  const [state, setState] = useState({
    title: "",
    category: "",
    country: "",
    city: "",
    amountNeeded: "",
    endDate: "",
    status: 'Pending',
    bankName: 'National Bank of Pakistan',
    bankAccountNo: 1234567890123456,
    donationType: "",
    story: "",
    videoURL: "",

  });

  

  console.log(state);
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
            stepDone={stepHeader.done}
            selected={stepNo === stepHeader.stepNo}
            disabled={!stepDone[`step${stepHeader.stepNo}`]}
            // disabled={false}
            onClick={() => setStepNo(stepHeader.stepNo)}
          />
        ))}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <StartFundraiseStep
        stepNo={stepNo}
        setStepNo={setStepNo}
        state={state}
        setState={setState}
        setStepDone={setStepDone}
      />
    </Box>
  );
}

export default NewCompaign;
