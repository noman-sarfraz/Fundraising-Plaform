import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import OrganizerPic from "../../assets/images/OrganizerPic.jpg";
import UnknownPersonPic from "../../assets/images/unknownPerson.jpg";
import { AiOutlineLink } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCampaignQuery } from "../../features/campaign/campaignApiSlice";
import CircularLoader from "../../components/general/CircularLoader";
import LayoutDeterminer from "../../layouts/layout-determiner/LayoutDeterminer";
import { Payment } from "@mui/icons-material";
import PaymentDialogue from "../../components/dialogues/fundraiser/PaymentDialogue";
import AmountDialogue from "../../components/dialogues/fundraiser/AmountDialogue";
import { useGetDetailsQuery } from "../../features/donor/donorApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
// import { useGetFundraiseQuery } from "../../features/temp/tempApiSlice";

const StyledLinearProgress = styled(LinearProgress).attrs((props) => ({}))`
  height: 10px !important;
  border-radius: 5px !important;
`;

const Dot = () => {
  return (
    <span
      style={{ fontSize: 16, fontWeight: 1000, marginLeft: 5, marginRight: 5 }}
    >
      &sdot;
    </span>
  );
};

// const campaign = {
//   image: CampaignPic1,
//   category: "Flood Relief",
//   startDate: "Dec 22, 2022",
//   title: "Flood Relief Fund",
//   story: `As my previous 4 fundraisings, this one will have a goal to achieve too. If you don't know Adrian, he used to be the vocalist of the Polish death metal band Decapitated and recorded the album Organic Hallucinosis with them in 2006.`,
//   raisedAmount: 1000,
//   goalAmount: 7000,
//   donors: 5,
//   status: "Active",
//   stripeAccount: "Not Connected",
//   paypalAccount: "Not Connected",
// };

const fetchData = async (id) => {
  const response = await fetch("http://localhost:5000/api/v1/users/" + id)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

function Campaign() {
  const { id } = useParams();
  const { userId } = useSelector(selectCurrentUser);

  const [openPaymentDialogue, setOpenPaymentDialogue] = useState(false);
  const [openAmountDialogue, setOpenAmountDialogue] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    isFulfilled: campaignFulfilled,
  } = useGetCampaignQuery(id);

  const {
    data: organizerData,
    isLoading: organizerLoading,
    error: organizerError,
  } = useGetDetailsQuery(userId);

  // let campaign, organizer;
  // if (isLoading || organizerLoading) {
  //   return <CircularLoader />;
  // }
  // if (data?.campaign && organizerData?.user) {
  //   campaign = data.campaign;
  //   organizer = organizerData.user;
  //   console.log(error);
  // } else {
  //   console.log(error, organizerError);
  //   console.log(data, organizerData);
  //   return <div>Something went wrong</div>;
  // }

  let campaign;
  if (isLoading) {
    return <CircularLoader />;
  }
  if (data?.campaign) {
    campaign = data.campaign;
    // organizer = organizerData.user;
    // console.log(error);
  } else {
    // console.log(error, organizerError);
    // console.log(data, organizerData);
    return <div>Something went wrong</div>;
  }

  const donateNowHandler = () => {
    setOpenPaymentDialogue(true);
  };

  return (
    <>
      <Box
        sx={{
          px: {
            xs: 1,
          },
          py: 3,
        }}
      >
        <PaymentDialogue
          open={openPaymentDialogue}
          setOpen={setOpenPaymentDialogue}
          callback={setOpenAmountDialogue}
        />

        <AmountDialogue
          open={openAmountDialogue}
          setOpen={setOpenAmountDialogue}
          params={{ campaignId: campaign._id, transactionId: "1238ffew8wf7" }}
        />

        <Typography
          color={"#1D548F"}
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            // textDecorationLine: "underline",
            px: {
              xs: 2,
              md: 6,
            },
            pt: 2,
            mb: 2,
            textAlign: "center",
          }}
        >
          {campaign.title}
        </Typography>
        <Box sx={{ mb: 10 }}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Fundraising campaign by
            <b style={{ color: "#F71616" }}> {campaign.createdBy}</b>
            <Dot />
            <b style={{ color: "#F71616" }}>
              {`${campaign.city}, ${campaign.country}`}
            </b>
            <Dot />
            <b style={{ color: "#F71616" }}>{campaign.category}</b>
          </Typography>
        </Box>
        <Box>
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "60%",
                  },
                  display: "flex",
                  justifyContent: "center",
                  mb: 10,
                }}
              >
                <img
                  src={campaign.image}
                  alt="Paris"
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Campaign Short Progress Card */}
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    md: "30%",
                  },
                  mb: {
                    xs: 5,
                    md: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    // border: "1px solid #ccc",
                    p: 3,
                    borderRadius: 5,
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#F51616",
                      textAlign: "center",
                    }}
                  >
                    {campaign.amountCollected.toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      // fontWeight: 700,
                      color: "#8F8798",
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    {`raised of PKR ${campaign.amountNeeded.toFixed(2)} goal`}
                  </Typography>
                  <StyledLinearProgress
                    variant="determinate"
                    value={0}
                    sx={{
                      "& .MuiLinearProgress-bar1Determinate": {
                        backgroundColor: "#F51616",
                      },
                      mb: 0.5,
                    }}
                  />
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ color: "#F51616", fontSize: 12, fontWeight: 700 }}
                    >
                      {`${(
                        (campaign.amountCollected / campaign.amountNeeded) *
                        100
                      ).toFixed(2)}% Funded`}
                    </Typography>
                    <Typography
                      sx={{
                        marginLeft: "auto",
                        color: "#798798",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {`${campaign.noOfDonations} Donations`}
                    </Typography>
                  </Box>
                  {/* <Box
              sx={{
                bgcolor: "#F51616",
                // bgcolor: "teal",
                color: "white",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                py: 2,
                my: 2,
              }}
            >
              Getting Funded!
            </Box> */}
                  <Button
                    // component={Link}
                    // href={`/donate/payment-method/${campaign._id}`}
                    sx={{
                      // bgcolor: "#F51616",
                      // color: "white",
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 2,
                      py: 2,
                      my: 2,
                    }}
                    // color="success"
                    variant="contained"
                    onClick={donateNowHandler}
                  >
                    Donate Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      textTransform: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      borderRadius: 2,
                      color: "#F7162C",
                      py: 1.5,
                    }}
                    startIcon={<AiOutlineLink />}
                  >
                    Share link with friends
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "60%",
                },
              }}
            >
              <Box sx={{ px: 5, mb: 10 }}>
                <Typography
                  color="#0D54A9"
                  sx={{ fontSize: 22, fontWeight: 600, mb: 2 }}
                >
                  Campaign Story
                </Typography>
                <Typography
                  variant="caption"
                  color="#798798"
                  // sx={{ lineHeight: "20px" }}
                >
                  {campaign.story}
                </Typography>
              </Box>
              <Box sx={{ px: 5, mb: 10 }}>
                <Typography
                  color="#0D54A9"
                  sx={{ fontSize: 22, fontWeight: 600, mb: 2 }}
                >
                  Organizer
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    border: "1px solid #eee",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Avatar
                    alt="Organizer"
                    src={organizerData?.user?.image}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: 600, color: "#F7162C" }}
                    >
                      {organizerData?.user?.name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ px: 5, mb: 10 }}>
                <Typography
                  color="#0D54A9"
                  sx={{ fontSize: 22, fontWeight: 600, mb: 2 }}
                >
                  Donors
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* <Typography
                    sx={{
                      textTransform: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#F7162C",
                    }}
                  >
                    No Donors Yet
                  </Typography> */}
                  {[1, 2, 3].map((item) => (
                    <Box
                      sx={{
                        display: "flex",
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        alt="Maria Younus"
                        src={UnknownPersonPic}
                        sx={{ width: 45, height: 45, mr: 2 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // alignItems: "center",
                          mr: "auto",
                        }}
                      >
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                          Anonymous
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                          Donated on Jan 16, 2023
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#F51616",
                          }}
                        >
                          PKR 2000.00
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                {/* <Box
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 5 }}
            >
              <Button
                variant="text"
                color="error"
                sx={{
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#F7162C",
                  "&:hover": {
                    textDecorationLine: "underline",
                    textUnderlineOffset: "8px",
                  },
                }}
              >
                See all donors (13)
              </Button>
            </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Campaign;
