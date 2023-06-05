import { Box, Button, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import emailConfirmed from "./../../assets/images/email-confirmed.jpg";
import emailNotConfirmed from "./../../assets/images/email-not-confirmed.jpg";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import CircularLoader from "../../components/general/CircularLoader";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("verificationToken");
  const email = searchParams.get("email");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [verifyEmail, { isLoading, isError }] = useVerifyEmailMutation();

  const verifyEmailRequest = async (email, verificationToken) => {
    try {
      const res = await verifyEmail({ email, verificationToken });
      console.log(res);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(
    () =>
      (async () => {
        if (verificationToken && email) {
          await verifyEmailRequest(email, verificationToken);
        } else {
          toast.error("Invalid Request");
        }
      })(),
    [email, verificationToken]
  );

  if (isLoading || loading) {
    return <CircularLoader />;
  }

  if (error || isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ p: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={emailNotConfirmed}
              alt="Email Not Confirmed"
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
            Error: Invalid Request
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
              Your account could not be confirmed.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src={emailConfirmed}
            alt="Email Confirmed"
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
          Account Confirmed
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
            Your account has been confirmed. You can now login to your account.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            disableElevation
            component={Link}
            href="/login"
            color="success"
            sx={{ textTransform: "none", px: 5, py: 0.5 }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VerifyEmail;
