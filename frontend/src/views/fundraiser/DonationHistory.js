import { Avatar, Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import UnknownPersonPic from "../../assets/images/unknownPerson.jpg";
import DonationCard from "../../components/general/cards/DonationCard";
import PageHeader from "../../components/general/PageHeader";

let selectOptions = {
  campaigns: [
    "~ Select Campaign ~",
    "Campaign 1",
    "Campaign 2",
    "Campaign 3",
    "Campaign 4",
    "Campaign 5",
  ],
};

const StyledSelect = styled(Select).attrs((props) => ({
  fullWidth: true,
  size: "small",
  MenuProps: {
    PaperProps: {
      sx: {
        "& .MuiMenuItem-root": {
          fontSize: 14,
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

function DonationHistory() {
  return (
    <Box>
      <PageHeader
        header="Donation History"
        text="Select campaign and see the list of all of the donations"
      />

      <Box>
        <Grid container spacing={2} sx={{ mb: 5, justifyContent: "center" }}>
          <Grid item xs={12} sm={6}>
            <StyledSelect defaultValue={selectOptions.campaigns[0]}>
              {selectOptions.campaigns.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </StyledSelect>
          </Grid>
        </Grid>
      </Box>

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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <DonationCard
                donor="Anonymous"
                date="Jan 16, 2023"
                amount="1000"
                key={index}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default DonationHistory;
