import { Avatar, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UnknownPersonPic from "../../../assets/images/unknownPerson.jpg";
import { truncate } from "../../../utils/string";
import { useGetCampaignQuery } from "../../../features/campaign/campaignApiSlice";
import CircularLoader from "../CircularLoader";
import format from "date-fns/format";

function DonationCardAsync({ donation: { campaignId, comment, amount } }) {
  const { data, isLoading } = useGetCampaignQuery(campaignId);

  let campaign = null;
  if (isLoading) return <CircularLoader />;
  if (data) {
    campaign = data.campaign;
  } else {
    return <Typography>Something went wrong</Typography>;
  }

  return (
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
        component={Link}
        href={`/campaign/${campaignId}`}
        alt={campaign.title}
        src={campaign.image}
        sx={{ width: 45, height: 45, mr: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mr: "auto",
        }}
      >
        <Typography
          component={Link}
          href={`/campaign/${campaignId}`}
          sx={{ fontSize: 16, fontWeight: 600, textDecoration: "none" }}
        >
          {campaign.title}
        </Typography>

        <Typography sx={{ fontSize: 12, color: "#798798" }}>
          Donated on {format(new Date(campaign.createdAt), "LLL dd, yyyy")}
        </Typography>
        <Typography sx={{ fontSize: 12, mt: 2 }}>
          {truncate(comment, 80)}
        </Typography>
        {/* Jan 16, 2023 */}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#F51616" }}>
          PKR {amount}
        </Typography>
      </Box>
    </Box>
  );
}

export default DonationCardAsync;
