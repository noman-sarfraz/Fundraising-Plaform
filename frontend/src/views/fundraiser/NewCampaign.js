import { Box, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StartFundraiseStep from "../../components/fundraiser/campaign-steps/StartFundraiseStep";
import CircularLoader from "../../components/general/CircularLoader";
import { useGetAllBanksQuery } from "../../features/bank/bankApiSlice";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApiSlice";

function Step({ stepNumber, stepName, selected, disabled, onClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 1,
        mr: {
          xs: 1,
          md: 2,
          lg: 6,
        },
        my: 1,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          border: selected ? "1px solid #5D9BE5" : "1px solid #ccc",
          borderRadius: "50%",
          textAlign: "center",
          mr: 1,
          cursor: !disabled ? "pointer" : "default",
        }}
        color={selected ? "#5A9AE5" : disabled ? "#ccc" : "#3F5267"}
        onClick={!disabled ? onClick : null}
      >
        {stepNumber}
      </Typography>
      <Typography
        color={selected ? "#5A9AE5" : disabled ? "#ccc" : "#3F5267"}
        sx={{ fontWeight: "bold" }}
      >
        {stepName}
      </Typography>
    </Box>
  );
}

const stepHeaders = [
  { stepNo: 1, heading: "Get Started" },
  { stepNo: 2, heading: "Fundraiser Story" },
  { stepNo: 3, heading: "Approval Request" },
];

const stepDoneInit = { step1: false, step2: false, step3: false };

function Newcampaign() {
  const [stepNo, setStepNo] = useState(1);
  const [stepDone, setStepDone] = useState(stepDoneInit);

  const { data, isLoading, error } = useGetAllCategoriesQuery();

  const [state, setState] = useState({
    title: null,
    category: null,
    country: null,
    city: null,
    amountNeeded: null,
    status: "Pending",
    donationType: null,
    endDate: null,
    story: null,
  });

  var selectOptions = {
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
    types: ["Ongoing", "With End Date"],

    // moreCities: [`Muzaffarabad
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
    // Dalbandin`],
  };

  // console.log(state);

  if (isLoading) {
    return <CircularLoader />;
  }
  if (error || !data.categories) {
    console.log(error, data);
    return <h1>Error</h1>;
  }

  // selectOptions.categories = data.categories.map((category) => category.name);

  // console.log(data);

  // const { data, isLoading, isSuccess, isError } = useGetAllBanksQuery();
  // if (isLoading) {
  //   return <CircularLoader />;
  // }

  // if (isError || !isSuccess || !data.banks) {
  //   return <Typography>Something went wrong</Typography>;
  // } else {
  //   selectOptions.banks = data.banks;
  // }

  return (
    <Box>
      <Box>
        <Typography
          color={"#1D548F"}
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            px: 2,
            pt: 2,
          }}
        >
          Start Your Fundraise
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "spece-between",
          px: 2,
          my: 2,
        }}
      >
        {stepHeaders.map((stepHeader, index) => (
          <Step
            key={stepHeader.stepNo}
            stepNumber={stepHeader.stepNo}
            stepName={stepHeader.heading}
            stepDone={stepHeader.done}
            selected={stepNo === stepHeader.stepNo}
            disabled={!stepDone[`step${stepHeader.stepNo}`]}
            onClick={() => setStepNo(stepHeader.stepNo)}
          />
        ))}
      </Box>
      <Divider sx={{ mb: 2 }} />
      <StartFundraiseStep
        stepNo={stepNo}
        setStepNo={setStepNo}
        state={state}
        setState={setState}
        setStepDone={setStepDone}
        selectOptions={selectOptions}
        categories={data.categories}
      />
    </Box>
  );
}

export default Newcampaign;
