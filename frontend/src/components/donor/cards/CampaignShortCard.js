import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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

const StyledLinearProgress = styled(LinearProgress).attrs((props) => ({}))`
  height: 7px !important;
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

function CampaignShortCard({
  campaign: {
    _id,
    image,
    category,
    city,
    title,
    story,
    raisedAmount,
    amountNeeded,
    donors,
  },
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          // width: "70%",
          // px: 3,
          // pt: 2,
          // pb: 4,
          // border: "1px solid #e0e0e0",
          boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
          // boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
          borderRadius: "24px",
          "&:hover": {
            boxShadow: `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`,
            // boxShadow: `rgba(17, 12, 46, 0.15) 0px 48px 100px 0px`,
            // boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
            // boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
            // boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
            // boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
            // boxShadow: `rgba(17, 12, 46, 0.15) 0px 48px 100px 0px`,
            // boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
            // boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
            // boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`
          },
        }}
      >
        {/* Image */}
        <Box component={Link} href={`/campaign/${_id}`}>
          <img
            src={image}
            alt="Paris"
            style={{
              // borderRadius: "10px",
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              // border: "1px solid #e0e0e0",
            }}
          />
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: "flex", mt: 1, mb: 2 }}>
            <Typography
              sx={{ color: "#e65100", fontSize: 12, fontWeight: 700 }}
            >
              {category}
            </Typography>
            <Typography
              sx={{ marginLeft: "auto", fontSize: "12px", fontWeight: 500 }}
            >
              {/* {`Started on ${startDate}`} */}
              {city}
            </Typography>
          </Box>
          <Box
            component={Link}
            href={`/campaign/${_id}`}
            sx={{ height: "56px", textDecoration: "none", color: "black" }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 550, mb: 2 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#798798" }}>
              {truncate(story, 80)}
            </Typography>
          </Box>
          <Box sx={{}}>
            <Box sx={{}}>
              <Typography sx={{ fontSize: 11, color: "#798798", mb: 1 }}>
                {`${donors} Donors`}
              </Typography>
              <StyledLinearProgress
                variant="determinate"
                value={Math.round((raisedAmount * 100) / amountNeeded).toFixed(
                  2
                )}
                sx={{
                  "& .MuiLinearProgress-bar1Determinate": {
                    backgroundColor: "#6EC052",
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Typography
                sx={{ color: "#2F435A", fontSize: 12, fontWeight: 700 }}
              >
                {`PKR ${raisedAmount.toFixed(2)} raised`}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "auto",
                  color: "#6EC052",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {`${Math.round((raisedAmount * 100) / amountNeeded)}% funded`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CampaignShortCard;
