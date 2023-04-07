import { Avatar, Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
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

const StyledLinearProgress = styled(LinearProgress).attrs((props) => ({}))`
  height: 10px !important;
  border-radius: 5px !important;
`;

const StyledHead = styled(Typography).attrs((props) => ({}))`
  color: #0d54a9 !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  margin-bottom: 16px !important;
`;

function Donate() {
  const { id: campaignId } = useParams();

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
          xs: 2,
          md: 20,
        },
        py: 6,
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
          mb: 2,
          textAlign: "center",
        }}
      >
        Make a donation
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              <StyledHead>Enter Donation Amount</StyledHead>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <CampaignShortCard
                campaign={{
                  ...campaign,
                  image: CampaignPic1,
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
