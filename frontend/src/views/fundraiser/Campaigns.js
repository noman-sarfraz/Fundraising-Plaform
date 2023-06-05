import { Campaign, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import CampaignPic2 from "../../assets/images/Fundraise2.jpg";
import CampaignPic3 from "../../assets/images/Fundraise3.jpg";
import LengthyPic from "../../assets/images/lengthyImage.jpg";
import CampaignCard from "../../components/fundraiser/cards/CampaignCard";
import CircularLoader from "../../components/general/CircularLoader";
import PageHeader from "../../components/general/PageHeader";
import { useGetAllBanksQuery } from "../../features/bank/bankApiSlice";
import { useGetCampaignsQuery } from "../../features/campaign/campaignApiSlice";

const dummyCampaign = {
  image: CampaignPic1,
  category: "Flood Relief",
  startDate: "Dec 22, 2022",
  title: "Flood Relief Fund",
  story: `As my previous 4 fundraisings, this one will have a goal to achieve too. If you don't know Adrian, he used to be the vocalist of the Polish death metal band Decapitated and recorded the album Organic Hallucinosis with them in 2006.`,
  raisedAmount: 1000,
  goalAmount: 7000,
  donors: 5,
  status: "Active",
  stripeAccount: "Not Connected",
  paypalAccount: "Not Connected",
};

function Campaigns() {
  const { data, isLoading, isError, isSuccess, error } = useGetCampaignsQuery();
  const {
    data: banksData,
    isLoading: banksLoading,
    isError: banksIsError,
    error: banksError,
    isSuccess: banksIsSuccess,
  } = useGetAllBanksQuery();

  if (isLoading || banksLoading) {
    return <CircularLoader />;
  }
  if (isError || !data.campaigns || banksIsError || !banksData.banks) {
    console.log(error, banksError);
    return <h1>Error</h1>;
  }

  let campaigns, count;
  if (isSuccess && banksIsSuccess) {
    campaigns = data.campaigns;
    count = data.count;
    console.log(campaigns);
  }

  return (
    <Box sx={{}}>
      <PageHeader
        header="Your Campaigns"
        text="See all of your campaigns and manage them however you want"
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        {count === 0 ? (
          <Typography
            sx={{ textAlign: "center", fontSize: 14, fontStyle: "italic" }}
          >
            You don't have any campaigns.
          </Typography>
        ) : (
          campaigns.map((campaign) => {
            // campaign.bankName = banksData.banks.find(
            //   (bank) => bank._id === campaign.bankName
            // ).name;
            return (
              <CampaignCard
                campaign={{
                  ...campaign,
                  bankName: banksData.banks.find(
                    (bank) => bank._id === campaign.bankName
                  ).name,
                }}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
}

export default Campaigns;
