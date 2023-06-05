import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import OrganizerPic from "../../assets/images/OrganizerPic.jpg";
import UnknownPersonPic from "../../assets/images/unknownPerson.jpg";
import { AiOutlineLink } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCampaignQuery } from "../../features/campaign/campaignApiSlice";
import CircularLoader from "../../components/general/CircularLoader";
import CampaignShortCard from "../../components/donor/cards/CampaignShortCard";
import { useForm } from "react-hook-form";

const StyledHead = styled(Typography).attrs((props) => ({}))`
  color: #0d54a9 !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
`;

const StyledTextField = styled(TextField).attrs((props) => ({
  size: "small",
  inputProps: {
    style: {
      fontSize: 16,
      padding: "12px 12px 12px 12px",
    },
  },
  required: true,
  sx: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: props.error ? "#D32F2F" : null,
      },
    },
  },
}))`
  font-weight: 600 !important;
  color: #0d54a9 !important;
  margin-bottom: 16px !important;
  /* background-color: #f4f1f9; */
  /* background-color: #efefef; */
  width: 80% !important;
  /* color: ; */
`;

const StyledTextArea = styled(TextField).attrs((props) => ({
  size: "small",
  multiline: true,
  rows: 4,
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  type: "text",
  required: true,
}))`
  margin-bottom: 16px !important;
  width: 90% !important;
`;

function Donate() {
  const { id: campaignId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading, isError, isSuccess, error } =
    useGetCampaignQuery(campaignId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [getCampaign, { isLoading, error }] = useGetCampaignQuery();

  if (isLoading) {
    return <CircularLoader />;
  }
  if (isError || !data.campaign) {
    console.log(error);
    return <h1>Error</h1>;
  }

  let campaign;
  // , fundraiser;
  if (isSuccess) {
    campaign = data.campaign;
    // fundraiser = data.fundraiser;
  }

  return (
    <Box
      sx={{
        px: {
          xs: 5,
        },
        py: 1,
      }}
    >
      <Typography
        color={"#1D548F"}
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          px: {
            xs: 2,
            md: 6,
          },
          pt: 2,
          mb: 10,
          textAlign: "center",
        }}
      >
        Make a donation
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <StyledHead>Enter Donation Amount</StyledHead>
                <StyledTextField
                  placeholder="Enter Amount"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{ fontWeight: 600, color: "#0d54a9" }}>
                          PKR
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                  {...register("amount", { required: true, min: 1 })}
                  error={errors.amount ? true : false}
                />

                <StyledHead sx={{ mt: 5 }}>Leave a Comment</StyledHead>
                <StyledTextArea {...register("comment")} />

                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  sx={{
                    mt: 5,
                    width: "90%",
                    py: 1,
                    borderRadius: 10,
                    textTransform: "none",
                  }}
                >
                  Donate
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              <CampaignShortCard
                campaign={{
                  ...campaign,
                  raisedAmount: 0,
                  donors: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Donate;
