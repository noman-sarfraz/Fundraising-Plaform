import { LoadingButton } from "@mui/lab";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Success from "./../../assets/images/email-confirmed.jpg";

function ResetPasswordMessage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={Success}
            alt="Success"
            style={{
              borderRadius: "10px",
              width: "20%",
              // height: "250px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Typography
          sx={{ fontSize: 28, fontWeight: 550, textAlign: "center", mb: 1 }}
        >
          Password Changed!
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
            Your password has been changed successfully. Please login with your
            new password.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            disableElevation
            color="success"
            sx={{ textTransform: "none", px: 5, py: 0.5 }}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPasswordMessage;
