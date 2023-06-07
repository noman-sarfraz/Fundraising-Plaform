import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  required: true,
}))`
  margin-bottom: 16px !important;
`;

const StyledDatePicker = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  type: "date",
  inputProps: {
    style: {
      fontSize: 14,
      // padding: "12px 12px 12px 12px",
    },
  },
  required: true,
  // sx: {
  //   width: "98%",
  //   "& .MuiOutlinedInput-root": {
  //     borderRadius: 0,
  //     "&.Mui-focused fieldset": {
  //       // borderColor: "red",
  //       border: "1px solid #1976d2",
  //     },
  //   },
  // },
}))``;

const StyledSelect = styled(Select).attrs((props) => ({
  fullWidth: true,
  size: "small",

  MenuProps: {
    PaperProps: {
      sx: {
        "& .MuiMenuItem-root": {
          fontSize: 14,
          // padding: 0,
        },
        "& .MuiList-padding": {
          padding: 0,
        },
      },
    },
  },
}))`
  font-size: 14px !important;
`;

const StyledAutoComplete = styled(Autocomplete).attrs({
  disablePortal: true,
  size: "small",
  fullWidth: true,
  PaperComponent: ({ children }) => (
    <Paper style={{ fontSize: 14 }}>{children}</Paper>
  ),
  sx: {
    "& .MuiInputBase-input": { fontSize: "14px" },
    mb: 2,
  },
})``;

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

function Step1({
  state,
  setState,
  stepNo,
  setStepNo,
  setStepDone,
  selectOptions,
  categories,
}) {
  // console.log("setState:", setState);
  // setState({ a: "aaa" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const visited = () => {
    setStepDone((stepDone) => ({ ...stepDone, [`step${stepNo}`]: true }));
  };

  useEffect(() => {
    return () => {
      visited();
    };
  }, []);

  selectOptions.categories = categories.map((category) => category.name);

  const onContinue = (data) => {
    setState((state) => ({
      ...state,
      ...data,
      city: cityValue,
      country: countryValue,
      donationType: typeValue,
      category: categories.find((category) => category.name === categoryValue)
        ._id,
      endDate: typeValue === "With End Date" ? endDate : null,
    }));

    setStepNo((stepNo) => stepNo + 1);
    // setStepDone((stepDone) => ({...stepDone, [`step${stepNo}`]: true}));
    // console.log({
    //   ...data,
    //   city: cityValue,
    //   country: countryValue,
    //   donationType: typeValue,
    //   category: categoryValue,
    // });
  };

  // const [newCity, setNewCity] = useState(false);
  // const [customCategory, setCustomCategory] = useState(false);

  // const [cityValue, setCityValue] = useState(null);
  // const [categoryValue, setCategoryValue] = useState(null);

  const [cityValue, setCityValue] = useState(
    state.city ? state.city : selectOptions.cities[0]
  );
  const [cityInput, setCityInput] = useState("");

  const [countryValue, setCountryValue] = useState(
    state.country ? state.country : selectOptions.countries[0]
  );
  const [countryInput, setCountryInput] = useState("");

  const [categoryValue, setCategoryValue] = useState(
    categories.find((category) => category._id === state.category).name
  );
  const [categoryInput, setCategoryInput] = useState("");

  const [typeValue, setTypeValue] = useState(
    state.donationType ? state.donationType : selectOptions.types[0]
  );

  const [typeInput, setTypeInput] = useState("");
  const [endDate, setEndDate] = useState("");

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
          <form onSubmit={handleSubmit((data) => onContinue(data))}>
            <Box sx={{ mb: 5 }}>
              <StyledHead>Fundraise Information</StyledHead>
              <StyledLabel>campaign Title</StyledLabel>
              <StyledTextField
                placeholder="Enter campaign Title"
                defaultValue={state.title}
                {...register("title", { required: true })}
              />
              <StyledLabel>campaign Category</StyledLabel>
              <StyledAutoComplete
                value={categoryValue}
                onChange={(event, newValue) => {
                  setCategoryValue(newValue);
                }}
                inputValue={categoryInput}
                onInputChange={(event, newInputValue) => {
                  setCategoryInput(newInputValue);
                }}
                options={selectOptions.categories}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <StyledTextField
                placeholder="Enter category name"
                sx={{ display: customCategory ? "block" : "none" }}
              /> */}
            </Box>
            <Box sx={{ mb: 5 }}>
              <StyledHead>Fundraise Location</StyledHead>
              <StyledLabel>Country</StyledLabel>
              <StyledAutoComplete
                value={countryValue}
                onChange={(event, newValue) => {
                  setCountryValue(newValue);
                }}
                inputValue={countryInput}
                onInputChange={(event, newInputValue) => {
                  setCountryInput(newInputValue);
                }}
                options={selectOptions.countries}
                renderInput={(params) => <TextField {...params} />}
              />
              <StyledLabel>City</StyledLabel>
              <StyledAutoComplete
                value={cityValue}
                onChange={(event, newValue) => {
                  setCityValue(newValue);
                }}
                inputValue={cityInput}
                onInputChange={(event, newInputValue) => {
                  setCityInput(newInputValue);
                }}
                options={selectOptions.cities}
                renderInput={(params) => <TextField {...params} />}
              />
              {/*
              <StyledTextField
                placeholder="Enter city name"
                sx={{ display: newCity ? "block" : "none" }}
              />*/}
            </Box>
            <Box sx={{ mb: 5 }}>
              <StyledHead>Donation Informaion</StyledHead>
              <StyledLabel>Target Amount</StyledLabel>
              <StyledTextField
                defaultValue={state.amountNeeded}
                {...register("amountNeeded", { required: true })}
                placeholder="Enter Target Amount"
                type="number"
              />
              <StyledLabel>Donation Type</StyledLabel>
              <StyledAutoComplete
                value={typeValue}
                onChange={(event, newValue) => {
                  setTypeValue(newValue);
                }}
                inputValue={typeInput}
                onInputChange={(event, newInputValue) => {
                  setTypeInput(newInputValue);
                }}
                options={selectOptions.types}
                renderInput={(params) => <TextField {...params} />}
              />
              {typeValue === "With End Date" ? (
                <Box>
                  <StyledLabel>End Date</StyledLabel>
                  <StyledDatePicker
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Box>
              ) : null}
            </Box>
            <Button
              variant="contained"
              disableElevation
              type="submit"
              sx={{
                width: "100%",
                py: 1,
                borderRadius: 10,
                textTransform: "none",
              }}
            >
              Save & Continue
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Step1;
