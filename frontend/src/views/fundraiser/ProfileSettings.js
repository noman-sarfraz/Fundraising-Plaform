import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
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
    mb: 2,
  },
}))``;

const StyledLabel = styled(Typography).attrs((props) => ({
  color: "#2F435A",
  sx: {
    fontSize: "14px",
    fontWeight: "500",
    mb: 0.5,
  },
}))``;

const StyledHead = styled(Typography).attrs((props) => ({
  color: "#0D54A9",
  sx: {
    fontSize: "22px",
    fontWeight: "400",
    mb: 2,
  },
}))``;

// function StyledSelect({ text }) {
//   return (
//     <FormControl
//       fullWidth
//       // error={isError}
//       sx={{
//         my: 0,
//         mb: 2,
//       }}
//     >
//       <InputLabel id="select-role" size="small" sx={{ fontSize: 14 }}>
//         {text}
//       </InputLabel>
//       <Select
//         labelId="select-role"
//         id="simple-role-select"
//         // value={role}
//         label="label"
//         // onChange={handleChange}
//         size="small"
//         sx={{
//           fontSize: 14,
//         }}
//       >
//         <MenuItem value={""}>{text} 1</MenuItem>
//         <MenuItem value={""}>{text} 2</MenuItem>
//         <MenuItem value={""}>Others</MenuItem>
//       </Select>
//       {/* {isError && <FormHelperText>This is required!</FormHelperText>} */}
//     </FormControl>
//   );
// }

function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveDetails = (data) => {
    console.log(data);
  };

  return (
    <>
      <Typography
        color={"#1D548F"}
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          px: 6,
          pt: 2,
          mb: 3,
        }}
      >
        Profile Settings
      </Typography>

      <Box
        sx={{
          px: {
            xs: 2,
            md: 6,
          },
          width: {
            xs: "100%",
            md: "50%",
          },
        }}
      >
        <form onSubmit={handleSubmit((data) => saveDetails(data))}>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Personal Details</StyledHead>
            <StyledLabel>First Name</StyledLabel>
            <StyledTextField
              {...register("firstName", { required: true })}
              placeholder="Enter First Name"
            />
            <StyledLabel>Last Name</StyledLabel>
            <StyledTextField
              {...register("lastName")}
              placeholder="Enter Last Name"
            />
            <StyledLabel>Email</StyledLabel>
            <StyledTextField
              {...register("email", { required: true })}
              placeholder="Enter Email"
            />
            <StyledLabel>About Me</StyledLabel>
            <StyledTextField
              {...register("aboutMe", { required: true })}
              placeholder="Enter Details"
              multiline
              rows={4}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Location</StyledHead>
            <StyledLabel>City</StyledLabel>
            <StyledTextField
              {...register("city", { required: true })}
              placeholder="Enter City"
            />
            <StyledLabel>Country</StyledLabel>
            <StyledTextField
              {...register("country", { required: true })}
              placeholder="Enter Country"
            />
          </Box>

          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              py: 1,
              borderRadius: 10,
              textTransform: "none",
            }}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Box>
    </>
  );
}

export default ProfileSettings;
