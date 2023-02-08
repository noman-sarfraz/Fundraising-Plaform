import { Delete } from "@mui/icons-material";
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
import CompaignPic1 from "../../../assets/images/Fundraise1.jpg";
// import CompaignPic1 from "../../assets/images/Fundraise1.jpg";
import CompaignPic2 from "../../../assets/images/Fundraise2.jpg";
import CompaignPic3 from "../../../assets/images/Fundraise3.jpg";
import LengthyPic from "../../../assets/images/lengthyImage.jpg";
import { truncate } from "../../../utils/string";
import { MdDeleteOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { GrEdit } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";



const StyledLinearProgress = styled(LinearProgress).attrs((props) => ({}))`
  height: 10px !important;
  border-radius: 5px !important;
`;

const CampaignSideButton = styled(Button).attrs((props) => ({}))`
  text-transform: none !important;
  font-size: 12px !important;
  border: 1px solid !important;
  border-color: ${(props) => props.customBorderColor + ` !important` || null};
  margin-bottom: 4px !important;
  border-radius: 8px !important;
  margin-right: 8px !important;
  margin-left: 8px !important;
  justify-content: flex-start !important;
`;

const SideButtonText = styled(Box).attrs((props) => ({}))`
  color: ${(props) =>
    props.color === "inherit" ? null : props.color ? props.color : "#2F435A"};
  font-weight: 550;
`;

function CampaignCard({
  campaign: {
    image,
    category,
    startDate,
    title,
    story,
    raisedAmount,
    goalAmount,
    donors,
    status,
    stripeAccount,
    paypalAccount,
  },
}) {
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 5,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        width: "70%",
        mb: 10,
      }}
    >
      <Box
        sx={{
          width: "70%",
          px: 3,
          pt: 2,
          pb: 4,
        }}
      >
        {/* Image */}
        <Box>
          <img
            src={image}
            alt="Paris"
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "250px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{ color: "#e65100", fontSize: 12 }}>
            {category}
          </Typography>
          <Typography
            sx={{ marginLeft: "auto", fontSize: "10px", fontWeight: 500 }}
          >
            {`Started on ${startDate}`}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 550, mb: 2 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#798798" }}>
            {truncate(story, 100)}
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 2, mb: 2 }}>
          <Box sx={{ mb: 1 }}>
            <StyledLinearProgress
              variant="determinate"
              value={Math.round((raisedAmount * 100) / goalAmount).toFixed(2)}
            />
          </Box>
          <Box sx={{ display: "flex", px: 1 }}>
            <Typography
              sx={{ color: "#4A90E2", fontSize: 14, fontWeight: 600 }}
            >
              {`Raised: PKR ${raisedAmount.toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                marginLeft: "auto",
                color: "#7989B6",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {`Goal: PKR ${goalAmount.toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Donors:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{donors}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Started on:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{startDate}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Status:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{status}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Stripe Account:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{stripeAccount}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Paypal Account:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{paypalAccount}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Side Buttons */}
      <Box
        sx={{
          bgcolor: "#EEF5FE",
          width: "30%",
          py: 1,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CampaignSideButton
            startIcon={<AiOutlineDollarCircle color="#0D54BC" />}
          >
            <SideButtonText color="#0D54BC">
              Add amount raised offline
            </SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton startIcon={<AiOutlineEye color="#0D54BC" />}>
            <SideButtonText color="#0D54BC">View Campaign</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton startIcon={<AiOutlineLink color="#0D54BC" />}>
            <SideButtonText color="#0D54BC">Campaign Link</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            // color="teal"
            sx={{ mt: 3 }}
            customBorderColor="#00897b"
            startIcon={<TbEdit color="#00897b" />}
          >
            <SideButtonText color="#00897b">Edit Campaign</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            color="warning"
            startIcon={<TiDeleteOutline color="#ED6E2B" />}
          >
            <SideButtonText color="#e65100">Stop</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            color="error"
            startIcon={<MdDeleteOutline color="#D32F2F" />}
          >
            <SideButtonText color="inherit">Delete Campaign</SideButtonText>
          </CampaignSideButton>
        </Box>
      </Box>
    </Box>
  );
}

export default CampaignCard;
