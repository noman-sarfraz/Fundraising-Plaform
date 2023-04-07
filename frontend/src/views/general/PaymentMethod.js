import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import Jazzcash from "../../assets/images/jazzcash.png";
import Easypaisa from "../../assets/images/easypaisa.png";
import CreditCard from "../../assets/images/credit-card.png";
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

function PaymentMethod() {
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
        Choose a Payment Method
      </Typography>
      <Box>
        <Grid container spacing={2} sx={{ justifyContent: "space-evenly" }}>
          <Grid item xs={12} sm={3}>
            <Box>
              <Box
                component={Link}
                href={`/donate/${campaignId}`}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mb: 10,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  },
                }}
              >
                <img
                  src={Jazzcash}
                  alt="Jazzcash"
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Box
                component={Link}
                href={`/donate/${campaignId}`}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mb: 10,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  },
                }}
              >
                <img
                  src={Easypaisa}
                  alt="Easypaisa"
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Box
                component={Link}
                href={`/donate/${campaignId}`}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mb: 10,
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  },
                }}
              >
                <img
                  src={CreditCard}
                  alt="CreditCard"
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PaymentMethod;
