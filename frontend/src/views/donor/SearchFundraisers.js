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

function SearchFundraisers() {
  const [campaigns, setCampaigns] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // autocomplete states
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryValue, setCategoryValue] = useState(
    selectOptions.categories[0]
  );
  const [locationInput, setLocationInput] = useState("");
  const [locationValue, setLocationValue] = useState(selectOptions.cities[0]);

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

  const filterCampaigns = (data) => {
    // filter input
    let filterData = {
      searchText: data.searchText,
      campaignState: data.campaignState,

      category:
        categoryValue !== selectOptions.categories[0] && categoryValue
          ? categoryValue
          : "",
      city:
        locationValue !== selectOptions.cities[0] && locationValue
          ? locationValue
          : "",
    };
    console.log("filterData", filterData);

    let filteredCampaigns = [];
    allCampaigns.forEach((campaign) => {
      if (
        (campaign.title.toLowerCase().includes(data.searchText.toLowerCase()) ||
          campaign.organizerName
            .toLowerCase()
            .includes(filterData.searchText.toLowerCase())) &&
        campaign.category
          .toLowerCase()
          .includes(filterData.category.toLowerCase()) &&
        campaign.city.toLowerCase().includes(filterData.city.toLowerCase())
      ) {
        filteredCampaigns.push(campaign);
        console.log("matched: ", campaign, filterData);
      } else {
        console.log("not matched: ", campaign, filterData);
      }
    });
    // console.log("filtered: ", filteredCampaigns);
    setCampaigns(filteredCampaigns);
  };

  return (
    <Box>
    <PageHeader 
      header='Search Fundraises' 
      text='We help you raise money for what matters to you most' 
    />
      <form onSubmit={handleSubmit((data) => filterCampaigns(data))}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
          <Box
            sx={{
              width: {
                xs: "90%",
                md: "50%",
              },
            }}
          >
            <StyledTextField
              placeholder="Searching by people and titles"
              defaultValue={""}
              {...register("searchText")}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <StyledAutoComplete
                  value={categoryValue}
                  onChange={(event, newValue) => {
                    setCategoryValue(newValue);
                  }}
                  inputValue={categoryInput}
                  onInputChange={(event, newInputValue) => {
                    setCategoryInput(newInputValue);
                  }}
                  options={selectOptions.categories}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledAutoComplete
                  placeholder="Location"
                  value={locationValue}
                  onChange={(event, newValue) => {
                    setLocationValue(newValue);
                  }}
                  inputValue={locationInput}
                  onInputChange={(event, newInputValue) => {
                    setLocationInput(newInputValue);
                  }}
                  options={selectOptions.cities}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <StyledSelect
                  defaultValue={selectOptions.campaignStates[0]}
                  {...register("campaignState")}
                >
                  {selectOptions.campaignStates.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
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
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>

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

export default SearchFundraisers;
