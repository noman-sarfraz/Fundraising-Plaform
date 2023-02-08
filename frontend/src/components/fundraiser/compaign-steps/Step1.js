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

const StyledTextField = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
      // padding: "12px 12px 12px 12px",
    },
  },
  type: "text",
  required: true,
}))`
  margin-bottom: 16px !important;
`;

const StyledLabel = styled(Typography).attrs((props) => ({}))`
  color: #2f435a !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: 4px !important;
`;

const StyledHead = styled(Typography).attrs((props) => ({}))`
  color: #0d54a9 !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  margin-bottom: 16px !important;
`;

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
            <StyledHead>Fundraise Information</StyledHead>
            <StyledLabel>Compaign Title</StyledLabel>
            <StyledTextField placeholder="Enter Compaign Title" />
            <StyledLabel>Compaign Category</StyledLabel>
            <StyledTextField placeholder="Category" />
            {/* <StyledSelect text="Category" /> */}
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Fundraise Location</StyledHead>
            <StyledLabel>Country</StyledLabel>
            <StyledTextField placeholder="Country" />
            {/* <StyledSelect text="Country" /> */}
            <StyledLabel>City</StyledLabel>
            <StyledTextField placeholder="Enter City" />
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Donation Informaion</StyledHead>
            <StyledLabel>Donation Type</StyledLabel>
            <StyledTextField placeholder="Type" />
            {/* <StyledSelect text="Type" /> */}
            <StyledLabel>Target Amount</StyledLabel>
            <StyledTextField placeholder="Enter Target Amount" />
          </Box>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Fund & Registration details</StyledHead>
            <StyledLabel>Your First Name</StyledLabel>
            <StyledTextField placeholder="Enter First Name" />
            <StyledLabel>Your Last Name</StyledLabel>
            <StyledTextField placeholder="Enter Last Name" />
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
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Step1;
