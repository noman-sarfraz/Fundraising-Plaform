import { Box } from "@mui/material";
import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function StartFundraiseStep({
  stepNo,
  setStepNo,
  state,
  setState,
  setStepDone,
  selectOptions,
}) {
  const steps = [
    {
      stepNmbr: 1,
      Step: (
        <Step1
          {...{
            stepNo,
            setStepNo,
            state,
            setState,
            setStepDone,
            selectOptions,
          }}
        />
      ),
      done: false,
    },
    {
      stepNmbr: 2,
      Step: (
        <Step2
          {...{
            stepNo,
            setStepNo,
            state,
            setState,
            setStepDone,
          }}
        />
      ),
      done: false,
    },
    {
      stepNmbr: 3,
      Step: (
        <Step3
          {...{
            stepNo,
            setStepNo,
            state,
            setState,
            setStepDone,
            banks: selectOptions.banks,
          }}
        />
      ),
      done: false,
    },
  ];
  const Step = steps.find((step) => step.stepNmbr === stepNo).Step;
  return Step;
}

export default StartFundraiseStep;
