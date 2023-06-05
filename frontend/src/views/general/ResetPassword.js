import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useResetPasswordMutation } from "../../features/auth/authApiSlice";

const StyledTextField = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  sx: {
    mb: 1,
  },
}))``;

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const passwordToken = searchParams.get("passwordToken");
  const email = searchParams.get("email");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const { data } = await resetPassword({
        passwordToken,
        email,
        password: formData.password,
      });
      if (data) {
        navigate("/reset-password-message");
      } else {
        toast.error("Error: An unkown error occured!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "#eee",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              display: "flex",

              width: {
                xs: "80%",
                sm: "60%",
                md: "45%",
                lg: "30%",
              },
              my: 3,
              flexDirection: "column",
              justifyContent: "center",
              border: "0.5px solid #ccc",
              borderRadius: 5,
              p: {
                xs: 2,
                sm: 3,
                md: 4,
                lg: 5,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                textAlign: "center",
                mb: 5,
                fontSize: 22,
                textDecoration: "underline",
                textUnderlineOffset: "5px",
              }}
            >
              Reset Password
            </Typography>

            <StyledTextField
              placeholder="Enter Password"
              type="password"
              required
              {...register("password")}
            />
            <StyledTextField
              placeholder="Confirm Password"
              type="password"
              required
              {...register("confirmPassword")}
            />

            <LoadingButton
              // variant="contained"
              // disableElevation
              sx={{
                color: "black",
                my: 1,
                border: "0.5px solid #ccc",
                textTransform: "none",
              }}
              type="submit"
              loading={isLoading}
            >
              Reset
            </LoadingButton>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                my: 2,
              }}
            >
              Don't have an account? <Link to="/register">register now</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default ResetPassword;
