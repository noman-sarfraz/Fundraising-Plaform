import { Avatar, Box, Button, LinearProgress, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import OrganizerPic from "../../assets/images/OrganizerPic.jpg";
import UnknownPersonPic from "../../assets/images/unknownPerson.jpg";
import { AiOutlineLink } from "react-icons/ai";

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
const campaign = {
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

function Compaign() {
  return (
    <Box>
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
        Flood Relief Fund
      </Typography>
      <Box sx={{ mb: 10 }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Fundraising campaign by
          <b style={{ color: "#F71616" }}> Maria Younus</b>
          <Dot />
          <b style={{ color: "#F71616" }}>Lahore, Pakistan</b>
          <Dot />
          <b style={{ color: "#F71616" }}>Flood Relief</b>
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "60%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mb: 10,
            }}
          >
            <img
              src={CampaignPic1}
              alt="Paris"
              style={{
                borderRadius: "10px",
                width: "80%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </Box>
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
              I have been accepted to the Mayo Clinic in Jacksonville Florida
              and it is for a disease I have in my small intestines. Now as of
              last night I found out it's went to my large intestines and colon.
              I have infections in both. My doctor said there is nothing else he
              can do. It is so painful and debilitated. Its going to cost funds
              out of pocket money and hotel stays while im down there. If you
              can help Thank you and if you cant then just pray for me. I need
              to get this 2nd opinion so I can get some relief. I am so tired of
              suffering. Thank you all I love you all.
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
                alt="Maria Younus"
                src={OrganizerPic}
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 600, color: "#F7162C" }}
                >
                  Maria Younus
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
              {[1,2,3,4,5].map((item) => (<Box
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
                    sx={{ fontSize: 18, fontWeight: 600, color: "#F51616" }}
                  >
                    $170.00
                  </Typography>
                </Box>
              </Box>))}
              
            </Box>
            <Box
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
            </Box>
          </Box>
        </Box>
        {/* Campaign Short Progress Card */}
        <Box sx={{ width: "30%" }}>
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
              PKR 1,000.00
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
              raised of $1,000.00 goal
            </Typography>
            <StyledLinearProgress
              variant="determinate"
              value={100}
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
                {`${100}% Funded`}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "auto",
                  color: "#798798",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {`${13} Donors`}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#F51616",
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
              Funding Successful!
            </Box>
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
    </Box>
  );
}

export default Compaign;
