import { Box, Button, Typography } from "@mui/material";
import React from "react";
import mail from "./../../assets/images/mail.png";
import { Link, useSearchParams } from "react-router-dom";
function ConfirmEmailMessage() {
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
          Email Confirmation
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
            We have sent an email to{" "}
            <Box component="span" sx={{ color: "blue" }}>
              {email}
            </Box>{" "}
            with a confirmation link. Please click on the link to verify your
            email. If you do not see the email, please check your spam folder.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            disableElevation
            sx={{ textTransform: "none", px: 5, py: 0.5 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmEmailMessage;
