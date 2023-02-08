import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CampaignShortCard from "../../components/donor/cards/CampaignShortCard";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import styled from "styled-components";

const dummyCampaign = {
  image: CampaignPic1,
  category: "Flood Relief",
  city: "Lahore",
  title: "Flood Relief Fund",
  story: `As my previous 4 fundraisings, this one will have a goal to achieve too. If you don't know Adrian, he used to be the vocalist of the Polish death metal band Decapitated and recorded the album Organic Hallucinosis with them in 2006.`,
  raisedAmount: 1000,
  goalAmount: 7000,
  donors: 5,
};

const StyledTextField = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  type: "text",
  required: true,
}))`
  margin-bottom: 16px !important;
`;

const StyledSelect = styled(Select).attrs((props) => ({
  fullWidth: true,
  size: "small",

  MenuProps: {
    PaperProps: {
      sx: {
        "& .MuiMenuItem-root": {
          fontSize: 14,
          // padding: 0,
        },
        "& .MuiList-padding": {
          padding: 0,
        },
      },
    },
  },
}))`
  font-size: 14px !important;
`;


const StyledLabel = styled(Typography).attrs((props) => ({}))`
  color: #2f435a !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: 4px !important;
`;

const campaigns = [dummyCampaign, dummyCampaign, dummyCampaign, dummyCampaign];
function SearchFundraisers() {
  return (
    <Box>
      <Box sx={{ py: 5, bgcolor: "#EEF5FE", mb: 5 }}>
        <Typography
          sx={{
            color: "#1D548F",
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "center",
            mb: 1,
          }}
        >
          Search Fundraises
        </Typography>
        <Typography
          sx={{
            color: "#2F435A",
            fontSize: "14px",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          We help you raise money for what matters to you most
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
        <Box
          sx={{
            width: {
              xs: "90%",
              md: "50%",
            },
          }}
        >
          <StyledTextField placeholder="Searching by people and titles" />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <StyledSelect defaultValue={"select-category"}>
                <MenuItem value="select-category">Select Category</MenuItem>
              </StyledSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledSelect defaultValue={"select-location"}>
                <MenuItem value="select-location">Select Location</MenuItem>
              </StyledSelect>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <StyledSelect defaultValue={"getting-funded"}>
                <MenuItem value="getting-funded">Getting Funded</MenuItem>
              </StyledSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                disableElevation
                size="small"
                fullWidth
                sx={{
                  py: 0.75,
                  fontSize: 14,
                  // fontWeight: 700,
                  borderRadius: 1,
                  textTransform: "none",
                  // mt: 2,
                  // mb: 10,
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          px: {
            xs: 1,
            md: 2,
          },
        }}
      >
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <CampaignShortCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchFundraisers;
