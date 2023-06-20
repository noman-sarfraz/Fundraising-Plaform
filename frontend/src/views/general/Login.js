import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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
  margin-bottom: 8px !important;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isSuccessful, isError, error }] = useLoginMutation();

  const onSubmit = async (data) => {
    if (data.role === "none") {
      toast.error("Please select a role");
      return;
    }
    try {
      const { user } = await login(data).unwrap();
      if (!user) {
        // toast.error("Could not login user!");
        // console.log(error.status)
        return;
      } else {
        console.log(user);
        toast.success("Login Successful!");
        dispatch(setCredentials({ user }));
        if (data.role === "Fundraiser") {
          navigate("/fr_account");
        } else if (data.role === "Donor") {
          navigate("/don_account");
        } else if (data.role === "Admin") {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.log(err);
      console.log({ isLoading, isSuccessful, isError, error });
      toast.error(err.data?.msg ? err.data.msg : "Could not login user!");
      return;
    }
  };

  return (
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
              fontWeight: 300,
              color: "#000",
              textAlign: "center",
              fontSize: "24px",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              mb: 5,
            }}
          >
            FUND<b>RAISING</b>
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              textAlign: "center",
              mb: 2,
              fontSize: "20px",
              color: "#000",
            }}
          >
            Login Now
          </Typography>

          <StyledTextField
            placeholder="Enter Email"
            type="email"
            required
            {...register("email")}
          />

          <StyledTextField
            placeholder="Enter Password"
            type="password"
            required
            {...register("password")}
          />

          <StyledSelect
            {...register("role", { required: true })}
            defaultValue="none"
          >
            <MenuItem value={"none"} disabled>
              Login As
            </MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Fundraiser"}>Fundraiser</MenuItem>
            <MenuItem value={"Donor"}>Donor</MenuItem>
          </StyledSelect>

          <LoadingButton
            sx={{
              color: "black",
              my: 1,
              border: "0.5px solid #ccc",
            }}
            type="submit"
            loading={isLoading}
          >
            Login
          </LoadingButton>

          <Typography
            component={Link}
            to="/forgot-password"
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              my: 2,
            }}
          >
            Don't have an account?{" "}
            <Typography component={Link} to="/register">
              register now
            </Typography>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}

export default Login;
