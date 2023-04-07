import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const selectOptions = {
  categories: [
    "Animals & Pets",
    "Business & Startups",
    "Causes & Charity",
    "Community",
    "Creative",
    "Education & Learning",
    "Family",
    "Funerals & Tributes",
    "Legal",
    "Medical & Healing",
    "Other",
    "Personal",
    "Religious",
    "Special Events",
    "Sports",
    "Volunteer & Travel",
    "Weddings & Honeymoon",
  ],
  countries: ["Pakistan"],
  cities: [
    "Karachi",
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Peshawar",
    "Multan",
    "Saidu Sharif",
    "Hyderabad",
    "Islamabad",
    "Quetta",
    "Bahawalpur",
    "Sargodha",
    "Sialkot",
    "Sukkur",
    "Larkana",
    "Chiniot",
    "Shekhupura",
    "Jhang",
    "Dera Ghazi Khan",
    "Gujrat",
    "Rahimyar Khan",
    "Kasur",
    "Mardan",
    "Mingaora",
    "Nawabshah",
    "Sahiwal",
    "Mirpur Khas",
    "Okara",
    "Mandi Burewala",
    "Jacobabad",
    "Saddiqabad",
    "Kohat",
    "Muridke",
    "Muzaffargarh",
    "Khanpur",
    "Gojra",
    "Mandi Bahauddin",
    "Abbottabad",
    "Turbat",
    "Dadu",
    "Bahawalnagar",
    "Khuzdar",
    "Pakpattan",
    "Tando Allahyar",
    "Ahmadpur East",
    "Vihari",
    "Jaranwala",
    "New Mirpur",
    "Kamalia",
    "Kot Addu",
    "Nowshera",
    "Swabi",
    "Khushab",
    "Dera Ismail Khan",
    "Chaman",
    "Charsadda",
    "Kandhkot",
    "Chishtian",
    "Hasilpur",
    "Attock Khurd",
    "Other",
  ],
  types: [
    "Fundraiser with a specific end date",
    "Ongoing (no deadline) fundraiser",
  ],

  // Muzaffarabad
  // Mianwali
  // Jalalpur Jattan
  // Bhakkar
  // Zhob
  // Dipalpur
  // Kharian
  // Mian Channun
  // Bhalwal
  // Jamshoro
  // Pattoki
  // Harunabad
  // Kahror Pakka
  // Toba Tek Singh
  // Samundri
  // Shakargarh
  // Sambrial
  // Shujaabad
  // Hujra Shah Muqim
  // Kabirwala
  // Mansehra
  // Lala Musa
  // Chunian
  // Nankana Sahib
  // Bannu
  // Pasrur
  // Timargara
  // Parachinar
  // Chenab Nagar
  // Gwadar
  // Abdul Hakim
  // Hassan Abdal
  // Tank
  // Hangu
  // Risalpur Cantonment
  // Karak
  // Kundian
  // Umarkot
  // Chitral
  // Dainyor
  // Kulachi
  // Kalat
  // Kotli
  // Gilgit
  // Narowal
  // Khairpur Mir’s
  // Khanewal
  // Jhelum
  // Haripur
  // Shikarpur
  // Rawala Kot
  // Hafizabad
  // Lodhran
  // Malakand
  // Attock City
  // Batgram
  // Matiari
  // Ghotki
  // Naushahro Firoz
  // Alpurai
  // Bagh
  // Daggar
  // Leiah
  // Tando Muhammad Khan
  // Chakwal
  // Badin
  // Lakki
  // Rajanpur
  // Dera Allahyar
  // Shahdad Kot
  // Pishin
  // Sanghar
  // Upper Dir
  // Thatta
  // Dera Murad Jamali
  // Kohlu
  // Mastung
  // Dasu
  // Athmuqam
  // Loralai
  // Barkhan
  // Musa Khel Bazar
  // Ziarat
  // Gandava
  // Sibi
  // Dera Bugti
  // Eidgah
  // Uthal
  // Khuzdar
  // Chilas
  // Panjgur
  // Gakuch
  // Qila Saifullah
  // Kharan
  // Aliabad
  // Awaran
  // Dalbandin
};

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

// <Autocomplete
//   disablePortal
//   size="small"
//   options={selectOptions.categories}
//   sx={{ width: 300 }}
//   renderInput={(params) => <TextField {...params} label="Movie" />}
// />;

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

function Step1({ state, setState, stepNo, setStepNo, setStepDone }) {
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

  const onContinue = (data) => {
    setState((state) => ({
      ...state,
      ...data,
      city: cityValue,
      country: countryValue,
      donationType: typeValue,
      category: categoryValue,
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
    state.category ? state.category : selectOptions.categories[0]
  );
  const [categoryInput, setCategoryInput] = useState("");

  const [typeValue, setTypeValue] = useState(
    state.donationType ? state.donationType : selectOptions.types[0]
  );
  const [typeInput, setTypeInput] = useState("");

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
              <StyledLabel>Compaign Title</StyledLabel>
              <StyledTextField
                placeholder="Enter Compaign Title"
                defaultValue={state.title}
                {...register("title", { required: true })}
              />
              <StyledLabel>Compaign Category</StyledLabel>
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
                defaultValue={state.targetAmount}
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
              Continue
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Step1;
