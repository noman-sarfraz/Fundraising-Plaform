import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ColumnChart from "../../components/fundraiser/charts/ColumnChart";
import PieChart from "../../components/fundraiser/charts/PieChart";
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

function CampaignStatistics() {
  return (
    <>
      <Box>
        <PageHeader
          header="Campaign Statistics"
          text="Get a detailed overview of your campaign's performance"
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
          <Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={7}>
                <Box
                  sx={{
                    borderTop: `4px solid #0d9ad3`,
                    // borderBottom: `4px solid #0d9ad3`,
                    pt: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ textAlign: "center" }}
                  >
                    Donations received last 12 months
                  </Typography>
                  <ColumnChart />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box
                  sx={{
                    borderTop: `4px solid #0d9ad3`,
                    // borderBottom: `4px solid #0d9ad3`,
                    pt: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ textAlign: "center" }}
                  >
                    Received vs Remaining
                  </Typography>
                  <Box sx={{ mt: 4, mb: 1.85 }}>
                    <PieChart />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// #00E396
export default CampaignStatistics;
