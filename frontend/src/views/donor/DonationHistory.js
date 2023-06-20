import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../../components/general/PageHeader";
import { useGetMyDonationsQuery } from "../../features/donations/donationsApiSlice";
import { useGetCampaignQuery } from "../../features/campaign/campaignApiSlice";
import CircularLoader from "../../components/general/CircularLoader";
import DonationCardAsync from "../../components/general/cards/DonationCardAsync";

function DonationHistory() {
  const { data, isLoading } = useGetMyDonationsQuery();

  let donations = [];
  if (isLoading) return <CircularLoader />;
  if (data) {
    donations = data.donations;
  } else {
    console.log("No data", data);
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <PageHeader
        header="Donation History"
        text="See list of all the donations you have made to different campaigns here"
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "80%",
              lg: "60%",
            },
            px: 2,
          }}
        >
          {donations.map((donation, index) => {
            return <DonationCardAsync donation={donation} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default DonationHistory;
