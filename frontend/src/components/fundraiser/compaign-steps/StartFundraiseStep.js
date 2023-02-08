import { Box } from "@mui/material";
import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const steps = [
  { stepNmbr: 1, Step: <Step1 /> },
  { stepNmbr: 2, Step: <Step2 /> },
  { stepNmbr: 3, Step: <Step3 /> },
];

function StartFundraiseStep({ stepNo }) {
  const Step = steps.find((step) => step.stepNmbr === stepNo).Step;

  return Step
}

export default StartFundraiseStep;
