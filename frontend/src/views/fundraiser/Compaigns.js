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
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import CampaignPic2 from "../../assets/images/Fundraise2.jpg";
import CampaignPic3 from "../../assets/images/Fundraise3.jpg";
import LengthyPic from "../../assets/images/lengthyImage.jpg";
import CampaignCard from "../../components/fundraiser/cards/CampaignCard";

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

function Compaigns() {
  return (
    <Box>
      <Typography
        color={"#1D548F"}
        // display='inline'
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          // textDecordation: "underline",
          textDecorationLine: "underline",
          // textUnderlineOffset: "10px",
          px: {
            xs: 2,
            md: 6,
          },
          pt: 2,
          mb: 3,
          // textAlign: "center",
        }}
      >
        Your Campaigns:
      </Typography>
      <Box
        sx={{
          width: "100%",
          // border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() => (
          <CampaignCard campaign={dummyCampaign} />
        ))}
      </Box>
    </Box>
  );
}

export default Compaigns;
