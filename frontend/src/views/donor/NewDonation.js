import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CampaignShortCard from "../../components/donor/cards/CampaignShortCard";
import CampaignPic1 from "../../assets/images/Fundraise1.jpg";
import styled from "styled-components";
import { useGetApprovedCampaignsQuery } from "../../features/campaign/campaignApiSlice";
import CircularLoader from "../../components/general/CircularLoader";
import { useForm } from "react-hook-form";
import PageHeader from "../../components/general/PageHeader";

var selectOptions = {
  categories: [
    "~ Select Category ~",
    "Animals & Pets",
    "Business & Startups",
    "Causes & Charity",
    "Community",
    "Creative",
    "Education & Learning",
    "Family",
    "Funerals & Tributes",
    "Legal",
    "Medical & Healing",
    "Other",
    "Personal",
    "Religious",
    "Special Events",
    "Sports",
    "Volunteer & Travel",
    "Weddings & Honeymoon",
  ],
  cities: [
    "~ Select Location ~",
    "Karachi",
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Peshawar",
    "Multan",
    "Saidu Sharif",
    "Hyderabad",
    "Islamabad",
    "Quetta",
    "Bahawalpur",
    "Sargodha",
    "Sialkot",
    "Sukkur",
    "Larkana",
    "Chiniot",
    "Shekhupura",
    "Jhang",
    "Dera Ghazi Khan",
    "Gujrat",
    "Rahimyar Khan",
    "Kasur",
    "Mardan",
    "Mingaora",
    "Nawabshah",
    "Sahiwal",
    "Mirpur Khas",
    "Okara",
    "Mandi Burewala",
    "Jacobabad",
    "Saddiqabad",
    "Kohat",
    "Muridke",
    "Muzaffargarh",
    "Khanpur",
    "Gojra",
    "Mandi Bahauddin",
    "Abbottabad",
    "Turbat",
    "Dadu",
    "Bahawalnagar",
    "Khuzdar",
    "Pakpattan",
    "Tando Allahyar",
    "Ahmadpur East",
    "Vihari",
    "Jaranwala",
    "New Mirpur",
    "Kamalia",
    "Kot Addu",
    "Nowshera",
    "Swabi",
    "Khushab",
    "Dera Ismail Khan",
    "Chaman",
    "Charsadda",
    "Kandhkot",
    "Chishtian",
    "Hasilpur",
    "Attock Khurd",
    "Other",
  ],
  campaignStates: ["Getting Funded", "Newest", "Fully Funded"],
};

const dummyCampaign = {
  image: CampaignPic1,
  raisedAmount: 0,
  donors: 0,
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
}))`
  margin-bottom: 16px !important;
`;

const StyledAutoComplete = styled(Autocomplete).attrs({
  disablePortal: true,
  size: "small",
  fullWidth: true,
  PaperComponent: ({ children }) => (
    <Paper style={{ fontSize: 14 }}>{children}</Paper>
  ),
  sx: {
    "& .MuiInputBase-input": { fontSize: "14px" },
    // mb: 2,
  },
})``;

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

var allCampaigns = [];

function NewDonation() {
  const [campaigns, setCampaigns] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useGetApprovedCampaignsQuery();
  if (isLoading) return <CircularLoader />;
  if (!isLoading && data?.campaigns) {
    if (campaigns === null) {
      console.log("campaigns null");
      let customizedCampaigns = [];
      data.campaigns.forEach((campaign) => {
        customizedCampaigns.push({
          _id: campaign._id,
          title: campaign.title,
          category: campaign.category,
          story: campaign.story,
          city: campaign.city,
          image: campaign.image,
          raisedAmount: 0,
          amountNeeded: campaign.amountNeeded,
          donors: 0,
          organizerName: campaign.organizerName,
        });
      });
      allCampaigns = customizedCampaigns;
      setCampaigns(customizedCampaigns);
      console.log(data);
    }
  }

  
  return (
    <Box>
      <PageHeader
        header="Make a Donation"
        text="Explore campaigns, select ones you care about and donate to them"
      />

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
        {campaigns === null ? null : campaigns.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", fontSize: 14, fontStyle: "italic" }}
          >
            No campaigns.
          </Typography>
        ) : (
          campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <CampaignShortCard campaign={campaign} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default NewDonation;
