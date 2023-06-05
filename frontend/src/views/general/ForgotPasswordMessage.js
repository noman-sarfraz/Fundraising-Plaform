import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import mail from "./../../assets/images/mail.png";
import { useSearchParams } from "react-router-dom";


function ForgotPasswordMessage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={mail}
            alt="Email Confirmation"
            style={{
              borderRadius: "10px",
              width: "40%",
              // height: "250px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Typography
          sx={{ fontSize: 28, fontWeight: 550, textAlign: "center", mb: 2 }}
        >
          Reset Password
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              textAlign: "center",
              width: {
                md: 500,
              },
            }}
          >
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.  
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            disableElevation
            component={Link}
            href="/login"
            sx={{ textTransform: "none", px: 5, py: 0.5 }}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPasswordMessage;
