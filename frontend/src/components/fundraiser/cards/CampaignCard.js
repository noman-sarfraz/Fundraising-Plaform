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
import React, { useState } from "react";
import styled from "styled-components";
import campaignPic1 from "../../../assets/images/Fundraise1.jpg";
// import campaignPic1 from "../../assets/images/Fundraise1.jpg";
import campaignPic2 from "../../../assets/images/Fundraise2.jpg";
import campaignPic3 from "../../../assets/images/Fundraise3.jpg";
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
import { useNavigate } from "react-router-dom";
import LinkDialogue from "../../dialogues/LinkDialogue";
import DeleteCampaignDialogue from "../../dialogues/campaign/ConfirmDeleteCampaign";
import StopCampaignDialogue from "../../dialogues/campaign/ComfirmStopCampaign";
import { useGetAllCategoriesQuery, useGetCategoryQuery } from "../../../features/category/categoryApiSlice";
import CircularLoader from "../../general/CircularLoader";

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

const startDate = "Jan 20, 2021";
const defaultImage = campaignPic1;
const raisedAmount = 0;
const donors = 0;

// just a detour to access the campaign id
var deleteCampaignId = null;
var stopCampaignId = null;

function CampaignCard({
  campaign: {
    _id,
    category,
    image,
    title,
    story,
    amountNeeded,
    status,
    amountCollected,
    noOfDonations,
  },
}) {
  const navigate = useNavigate();
  // var deleteCampaignId = null;
  // const [deleteCampaignId, setDeleteCampaignId] = useState(null);

  const [openLinkDialogue, setOpenLinkDialogue] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [openStopDialogue, setOpenStopDialogue] = useState(false);

  // if (isLoading) return <CircularLoader />;
  // if (error) return <p>error</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        borderRadius: 5,
        // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        // boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
        boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
        width: {
          xs: "100%",
          md: "70%",
        },
        mb: 10,
      }}
    >
      <LinkDialogue
        open={openLinkDialogue}
        setOpen={setOpenLinkDialogue}
        title={"Campaign Link"}
        link={`localhost:3000/campaign/${_id}`}
      />

      <DeleteCampaignDialogue
        open={openDeleteDialogue}
        setOpen={setOpenDeleteDialogue}
        id={deleteCampaignId}
        title={"Delete Campaign"}
        message={"Are you sure you want to delete this campaign?"}
      />

      <StopCampaignDialogue
        open={openStopDialogue}
        setOpen={setOpenStopDialogue}
        id={stopCampaignId}
        title={"Stop Campaign"}
        message={"Are you sure you want to stop this campaign?"}
      />

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "70%",
          },
          px: {
            xs: 2,
            md: 3,
          },
          pt: 2,
          pb: 4,
        }}
      >
        {/* Image */}
        <Box>
          <img
            src={image ? image : defaultImage}
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
              value={
                amountNeeded > 0
                  ? Math.round((raisedAmount * 100) / amountNeeded).toFixed(2)
                  : 0
              }
            />
          </Box>
          <Box sx={{ display: "flex", px: 1 }}>
            <Typography
              sx={{ color: "#4A90E2", fontSize: 14, fontWeight: 600 }}
            >
              {`Raised: PKR ${amountCollected.toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                marginLeft: "auto",
                color: "#7989B6",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {`Goal: PKR ${amountNeeded.toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="caption">Donors:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="caption">{noOfDonations}</Typography>
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
        </Box>
      </Box>

      {/* Side Buttons */}
      <Box
        sx={{
          bgcolor: "#EEF5FE",
          width: {
            xs: "100%",
            md: "30%",
          },
          py: 1,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CampaignSideButton startIcon={<AiOutlineEye color="#0D54BC" />}>
            <SideButtonText
              color="#0D54BC"
              onClick={() => navigate(`../../campaign/${_id}`)}
            >
              View Campaign
            </SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton startIcon={<AiOutlineLink color="#0D54BC" />}>
            <SideButtonText
              color="#0D54BC"
              onClick={() => setOpenLinkDialogue(true)}
            >
              Campaign Link
            </SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            startIcon={<AiOutlineDollarCircle color="#0D54BC" />}
          >
            <SideButtonText color="#0D54BC">
              Add amount raised offline
            </SideButtonText>
          </CampaignSideButton>

          <CampaignSideButton
            // color="teal"
            sx={{ mt: 3 }}
            customBorderColor="#00897b"
            startIcon={<TbEdit color="#00897b" />}
            onClick={() => navigate(`/fr_account/edit-campaign/${_id}`)}
          >
            <SideButtonText color="#00897b">Edit Campaign</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            color="warning"
            startIcon={<TiDeleteOutline color="#ED6E2B" />}
            onClick={() => {
              stopCampaignId = _id;
              setOpenStopDialogue(true);
            }}
            // disabled={status == ''}
          >
            <SideButtonText color="#e65100">Stop</SideButtonText>
          </CampaignSideButton>
          <CampaignSideButton
            color="error"
            startIcon={<MdDeleteOutline color="#D32F2F" />}
            onClick={() => {
              deleteCampaignId = _id;
              setOpenDeleteDialogue(true);
            }}
          >
            <SideButtonText color="inherit">Delete Campaign</SideButtonText>
          </CampaignSideButton>
        </Box>
      </Box>
    </Box>
  );
}

export default CampaignCard;
