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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultImage from "../../../assets/images/Fundraise1.jpg";
import { GrAddCircle } from "react-icons/gr";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useForm } from "react-hook-form";
import { useUploadImageMutation } from "../../../features/uploads/uploadsApiSlice";
import CircularLoader from "../../general/CircularLoader";
import StyledFileInput from "../../general/StyledFileInput";


const StyledTextField = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  type: "text",
}))`
  margin-bottom: 16px !important;
  margin-top: 16px !important;
`;

const StyledTextArea = styled(TextField).attrs((props) => ({
  fullWidth: true,
  size: "small",
  multiline: true,
  rows: 4,
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  type: "text",
  required: true,
}))`
  margin-bottom: 16px !important;
  margin-top: 16px !important;
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
  margin-bottom: 8px !important;
`;

const AddCoverPhotoButton = styled(Button).attrs((props) => ({}))`
  text-transform: none !important;
  font-size: 14px !important;
  border: 1px solid #ccc !important;
  /* border-color: ${(props) =>
    props.customBorderColor + ` !important` || null}; */
  margin-bottom: 4px !important;
  border-radius: 8px !important;
  margin-right: 8px !important;
  margin-left: 8px !important;
  /* justify-content: ; */
  /* justify-content: flex-start !important; */
`;

const StyledText = styled(Typography).attrs((props) => ({
  variant: "caption",
}))`
  color: #798798;
`;

function Step2({ state, setState, stepNo, setStepNo, setStepDone }) {

  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [image, setImage] = useState(state.image ? state.image : null);

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
      image: image,
    }));
    setStepNo((stepNo) => stepNo + 1);
    // setStepDone((stepDone) => ({ ...stepDone, [`step${stepNo}`]: true }));

    // console.log({
    //   ...data,
    //   city: cityValue,
    //   country: countryValue,
    //   donationType: typeValue,
    //   category: categoryValue,
    // });
  };

  const addImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const { data } = await uploadImage(formData);
      setImage(data.image.src);
    } catch (error) {
      console.log(error);
    }
  };

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
              md: "60%",
            },
          }}
        >
          <form onSubmit={handleSubmit((data) => onContinue(data))}>
            <Box sx={{ mb: 5 }}>
              <StyledHead>Your fundraiser story</StyledHead>
              <StyledText>
                Explain why you're raising money, what the funds will be used
                for, and how much you value the support
              </StyledText>
              <StyledTextArea
                defaultValue={state.story}
                {...register("story", { required: true })}
                placeholder="Write your story here..."
              />
            </Box>
            <Box sx={{ mb: 5 }}>
              <StyledHead>Upload cover photo</StyledHead>
              <StyledText>
                You can select and upload your cover picture.
              </StyledText>
              {isLoading ? (
                <CircularLoader />
              ) : image ? (
                
                <Box sx={{ my: 2 }}>
                  <img
                    src={image}
                    alt="Campaign Cover"
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ) : null}
              {/*
              <AddCoverPhotoButton
                fullWidth
                startIcon={<AddCircleOutlineIcon sx={{ color: "#798798" }} />}
              >
                <span style={{ color: "#798798" }}>Add Photo</span>
              </AddCoverPhotoButton>
              */}
              <StyledFileInput onChange={addImage} required />
            </Box>

            {/*
            <Box sx={{ mb: 5 }}>
              <StyledHead>Your video URL</StyledHead>
              <StyledText>
                The inclusion of a personalized video can help your fundraiser
                raise more money. Simply copy paste your valid video link into
                the field below.
              </StyledText>
              <StyledTextField
                defaultValue={state.videoURL}
                {...register("videoURL")}
                placeholder="http://"
              />
            </Box>
            */}

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

export default Step2;
