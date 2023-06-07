import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import UnknownPersonPic from "../../../assets/images/unknownPerson.jpg";


function BalanceCard({ balance }) {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid #eee",
        borderRadius: 2,
        p: 2,
        px: 5,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mr: "auto",
        }}
      >
        {/* <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{donor}</Typography> */}
        <Typography sx={{ fontSize: 16 }}>Balance:</Typography>
        {/* Jan 16, 2023 */}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#F51616" }}>
          PKR {balance}
        </Typography>
      </Box>
    </Box>
  );
}

export default BalanceCard;
