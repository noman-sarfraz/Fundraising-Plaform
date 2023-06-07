import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import UnknownPersonPic from "../../assets/images/unknownPerson.jpg";
import DonationCard from "../../components/general/cards/DonationCard";
import PageHeader from "../../components/general/PageHeader";
import BalanceCard from "../../components/general/cards/BalanceCard";
import WithdrawMoneyForm from "../../components/dialogues/fundraiser/PaymentDialogue";
import WithdrawDialogue from "../../components/dialogues/fundraiser/WithdrawDialogue";

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

function WithdrawMoney() {
  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <Box>
      <PageHeader
        header="Withdraw Money"
        text="Select an account of your ease and withdraw your money"
      />

      <WithdrawDialogue open={openDialogue} setOpen={setOpenDialogue} />

      <Box sx={{ mb: 10 }}>
        <Typography
          sx={{
            color: "#1d548f",
            fontSize: 48,
            fontWeight: 550,
            textDecoration: "underline",
            textUnderlineOffset: 10,
            textDecorationThickness: 2,
            // textDecorationColor: "#aaa",
            textAlign: "center",
          }}
        >
          25312.02
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        ></Box>
        <Typography
          sx={{ textAlign: "center", fontSize: 12, color: "#1d548f" }}
        >
          Available Balance
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 20,
        }}
      >
        <Button
          variant="contained"
          disableElevation
          type="submit"
          sx={{
            width: {
              xs: "90%",
              md: "50%",
            },
            py: 1,
            borderRadius: 10,
            textTransform: "none",
            background: "linear-gradient(to left, rgba(13,154,211,1), #0d47a1)",
          }}
          onClick={() => setOpenDialogue(true)}
        >
          Withdraw Money
        </Button>
      </Box>
    </Box>
  );
}

export default WithdrawMoney;
