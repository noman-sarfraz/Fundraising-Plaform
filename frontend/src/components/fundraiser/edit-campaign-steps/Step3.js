import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import stripeLogo from "../../../assets/images/stripe.svg";
import paypalLogo from "../../../assets/images/paypal.svg";
import { GrAddCircle } from "react-icons/gr";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AiOutlineLink } from "react-icons/ai";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";
import {
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} from "../../../features/campaign/campaignApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

const Dot = () => {
  return (
    <span
      style={{
        fontSize: 14,
        color: "#798798",
        fontWeight: 1000,
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      {/* &sdot; */}
      &#x25cf;
    </span>
  );
};

const StyledTextField = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
      // padding: "12px 12px 12px 12px",
    },
  },
  sx: {
    "&.Mui-focused fieldset": {
      borderColor: props.error ? "#D32F2F" : "#1976d2",
    },
  },
  required: true,
}))`
  margin-bottom: 16px !important;
`;

const StyledSelect = styled(Select).attrs((props) => ({
  fullWidth: true,
  size: "small",

  MenuProps: {
    PaperProps: {
      sx: {
        "& .MuiMenuItem-root": {
          fontSize: 14,
          // padding: 0,
        },
        "& .MuiList-padding": {
          padding: 0,
        },
      },
    },
  },
}))`
  font-size: 14px !important;
`;

const StyledAutoComplete = styled(Autocomplete).attrs({
  disablePortal: true,
  size: "small",
  fullWidth: true,
  PaperComponent: ({ children }) => (
    <Paper style={{ fontSize: 14 }}>{children}</Paper>
  ),
  sx: {
    "& .MuiInputBase-input": { fontSize: "14px" },
    mb: 2,
  },
})``;

const StyledLabel = styled(Typography).attrs((props) => ({}))`
  color: #2f435a !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: 4px !important;
`;

const StyledHead = styled(Typography).attrs((props) => ({}))`
  color: #0d54a9 !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  margin-bottom: 16px !important;
`;

const StyledText = styled(Typography).attrs((props) => ({
  variant: "caption",
}))`
  color: #798798;
`;

function Step3({ state, setState, stepNo, setStepNo, setStepDone }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const visited = () => {
    setStepDone((stepDone) => ({ ...stepDone, [`step${stepNo}`]: true }));
  };

  useEffect(() => {
    return () => {
      visited();
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [requestSent, setRequestSent] = React.useState(false);

  const [updateCampaign, { isLoading, error }] = useUpdateCampaignMutation();

  const handleUpdateCampaign = async (data) => {
    // console.log("banks:", banks, "bankname", bankNameValue);
    // const campaignData = {
    //   ...state,
    //   ...data,
    // };
    // setState(campaignData);
    try {
      // console.log('before createCampaign request:', campaignData)
      const { campaign } = await updateCampaign(state).unwrap();
      // console.log('after createCampaign request:', campaignData)
      // console.log("done");
      if (!campaign) {
        toast.error("Could not update campaign!");
        return;
      } else {
        // dispatch(setCredentials({ token }));
        toast.success("Campaign updated successfully!");
        // setRequestSent(true);
        navigate("/fr_account");
        // document.getElementById("send-for-approval-button").innerHTML='Request sent for approval';
        // document.getElementById("send-for-approval-button").disabled=true;
        console.log("campaign:", campaign);
      }
    } catch (err) {
      // console.log(err.data?.msg ? err.data.msg : "Could not login user!");
      toast.error(
        // err.data?.msg ? err.data.msg :
        "Could not update campaign!"
      );
      console.log(err);
      return;
    }
  };

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            px: {
              xs: 2,
              md: 5,
            },
            width: {
              xs: "100%",
              md: "60%",
            },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <StyledHead>Save Changes</StyledHead>
          </Box>

          <StyledText>
            Finally press the below button to save changes and update your
            campaign.
          </StyledText>

          <form onSubmit={handleSubmit((data) => handleUpdateCampaign(data))}>
            <LoadingButton
              id="send-for-approval-button"
              variant="contained"
              disableElevation
              sx={{
                width: "100%",
                py: 1,
                borderRadius: 10,
                textTransform: "none",
                mt: 5,
                // bgcolor: requestSent ? "#eee" : null,
              }}
              // disabled={requestSent}
              loading={isLoading}
              type="submit"
            >
              Update Campaign
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Step3;

/*
<Box sx={{ mb: 5 }}>
              <StyledLabel>Bank Name</StyledLabel>
              <StyledAutoComplete
                value={bankNameValue}
                onChange={(event, newValue) => {
                  setBankNameValue(newValue);
                }}
                inputValue={bankNameInput}
                onInputChange={(event, newInputValue) => {
                  setBankNameInput(newInputValue);
                }}
                options={bankNames}
                renderInput={(params) => <TextField {...params} />}
              />
              <StyledLabel>Account Number (16-digit)</StyledLabel>
              <StyledTextField
                placeholder="Enter Account Number"
                type="number"
                error={errors.bankAccountNo ? true : false}
                defaultValue={state.bankAccountNo}
                {...register("bankAccountNo", {
                  required: true,
                  maxLength: 16,
                  minLength: 16,
                })}
              />
            </Box>
*/
