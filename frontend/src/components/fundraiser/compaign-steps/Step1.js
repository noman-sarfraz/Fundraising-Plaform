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

function StyledTextField({ placeholder }) {
  return (
    <TextField
      placeholder={placeholder}
      fullWidth
      size="small"
      inputProps={{
        style: {
          fontSize: 14,
          // padding: "12px 12px 12px 12px",
        },
      }}
      sx={{
        mb: 2,
      }}
      type="text"
      required
    />
  );
}

function StyledLabel({ label }) {
  return (
    <Typography
      color={"#2F435A"}
      sx={{
        fontSize: "14px",
        fontWeight: "500",
        mb: 0.5,
      }}
    >
      {label}
    </Typography>
  );
}

function StyledHead({ heading }) {
  return (
    <Typography
      color={"#0D54A9"}
      sx={{
        fontSize: "22px",
        fontWeight: "400",
        mb: 2,
      }}
    >
      {heading}
    </Typography>
  );
}

function StyledSelect({ text }) {
  return (
    <FormControl
      fullWidth
      // error={isError}
      sx={{
        my: 0,
        mb: 2,
      }}
    >
      <InputLabel id="select-role" size="small" sx={{ fontSize: 14 }}>
        {text}
      </InputLabel>
      <Select
        labelId="select-role"
        id="simple-role-select"
        // value={role}
        label="label"
        // onChange={handleChange}
        size="small"
        sx={{
          fontSize: 14,
        }}
      >
        <MenuItem value={""}>{text} 1</MenuItem>
        <MenuItem value={""}>{text} 2</MenuItem>
        <MenuItem value={""}>Others</MenuItem>
      </Select>
      {/* {isError && <FormHelperText>This is required!</FormHelperText>} */}
    </FormControl>
  );
}

function Step1() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            px: {
              xs: 2,
              md: 5,
            },
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        >
          <Box sx={{ mb: 5 }}>
            <StyledHead heading="Fundraise Information" />
            <StyledLabel label="Compaign Title" />
            <StyledTextField placeholder="Enter Compaign Title" />
            <StyledLabel label="Compaign Category" />
            <StyledTextField placeholder="Category" />
            {/* <StyledSelect text="Category" /> */}
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead heading="Fundraise Location" />
            <StyledLabel label="Country" />
            <StyledTextField placeholder="Country" />
            {/* <StyledSelect text="Country" /> */}
            <StyledLabel label="City" />
            <StyledTextField placeholder="Enter City" />
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead heading="Donation Informaion" />
            <StyledLabel label="Donation Type" />
            <StyledTextField placeholder="Type" />
            {/* <StyledSelect text="Type" /> */}
            <StyledLabel label="Target Amount" />
            <StyledTextField placeholder="Enter Target Amount" />
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead heading="Fund & Registration details" />
            <StyledLabel label="Your First Name" />
            <StyledTextField placeholder="Enter First Name" />
            <StyledLabel label="Your Last Name" />
            <StyledTextField placeholder="Enter Last Name" />
          </Box>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              py: 1,
              borderRadius: 10,
              textTransform: 'none'
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Step1;
