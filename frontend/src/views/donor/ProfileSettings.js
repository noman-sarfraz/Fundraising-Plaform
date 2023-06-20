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
import { useForm } from "react-hook-form";
import {
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} from "../../features/donor/donorApiSlice";
import CircularLoader from "../../components/general/CircularLoader";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import ConfirmDialog from "../../components/dialogues/donor/ConfirmDialogue";
import UpdateNotification from "../../components/dialogues/donor/UpdateNotification";
import ChangePassword from "../../components/dialogues/donor/ChangePassword";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiSave2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { useUploadImageMutation } from "../../features/uploads/uploadsApiSlice";
import StyledFileInput from "../../components/general/StyledFileInput";
import { useGetFundraiserDetailsQuery } from "../../features/fundraiser/fundraiserApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./../../features/auth/authSlice";

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
  color: props.color ? props.color : "#0D54A9",
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
  const [uploadImage, { isLoading: isImageLoading }] = useUploadImageMutation();
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openUpdateNotification, setOpenUpdateNotification] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [openPasswordDialogue, setOpenPasswordDialogue] = useState(false);

  let donor = null;

  const user = useSelector(selectCurrentUser);
  const { name, userId, role } = user;
  const {
    data: details,
    isLoading: areDetailsLoading,
    error: detailsError,
  } = useGetFundraiserDetailsQuery(userId);

  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();

  const saveDetails = async (data) => {
    try {
      const res = await updateDetails({ ...data, image: image }).unwrap();
      if (res?.user) {
        setOpenUpdateNotification(true);
        // toast.success("Details saved successfully!");
        // console.log(res);
      } else {
        toast.error("Something went wrong!");
        // console.log(res);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const deleteAccount = () => {
    setOpenDeleteAccount(true);
  };

  const handleChangePassword = () => {
    setOpenPasswordDialogue(true);
  };

  if (areDetailsLoading) return <CircularLoader />;
  if (!areDetailsLoading && !details?.user) {
    // console.log(details);
    // console.log(details);
    return <Typography>Something went wrong!</Typography>;
  } else {
    donor = details.user;
  }

  const uploadProfilePicture = async (e) => {
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
    <>
      <Typography
        color={"#1D548F"}
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          px: {
            xs: 2,
            md: 6,
          },
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
        <ConfirmDialog
          open={openDeleteAccount}
          setOpen={setOpenDeleteAccount}
          title={"Delete"}
          message={"Are you sure you want to delete your account?"}
          onSuccess={() => console.log("delete")}
        />

        <UpdateNotification
          open={openUpdateNotification}
          setOpen={setOpenUpdateNotification}
        />

        <ChangePassword
          open={openPasswordDialogue}
          setOpen={setOpenPasswordDialogue}
        />

        <form onSubmit={handleSubmit((data) => saveDetails(data))}>
          <Box sx={{ mb: 5 }}>
            <StyledHead>Personal Details</StyledHead>
            <StyledLabel>Name</StyledLabel>
            <StyledTextField
              defaultValue={donor.name}
              {...register("name", { required: true })}
              required
              placeholder="Enter Name"
            />
            <StyledLabel>Email</StyledLabel>
            <StyledTextField
              defaultValue={donor.email}
              // {...register("email", { required: true })}
              // required
              // type="email"
              // placeholder="Enter Email"
              disabled
            />
            <StyledLabel>About Me</StyledLabel>
            <StyledTextField
              defaultValue={donor.aboutMe}
              {...register("aboutMe")}
              placeholder="Enter Details"
              multiline
              rows={4}
            />
          </Box>

          <Box sx={{ mb: 5 }}>
            <StyledHead>Location</StyledHead>
            <StyledLabel>City</StyledLabel>
            <StyledTextField
              defaultValue={donor.city}
              {...register("city")}
              placeholder="Enter City"
            />
            <StyledLabel>Country</StyledLabel>
            <StyledTextField
              defaultValue={donor.country}
              {...register("country")}
              placeholder="Enter Country"
            />
          </Box>

          <Box sx={{ mb: 8 }}>
            <StyledHead>Profile Picture</StyledHead>
            {isImageLoading ? (
              <CircularLoader />
            ) : image ? (
              <Box sx={{ my: 2 }}>
                <img
                  src={image}
                  alt="Profile"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : donor.image ? (
              <Box sx={{ my: 2 }}>
                <img
                  src={donor.image}
                  alt="Profile"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 14,
                  fontStyle: "italic",
                  mb: 2,
                }}
              >
                No Profile Picture.
              </Typography>
            )}
            <StyledFileInput onChange={uploadProfilePicture} />
          </Box>

          <LoadingButton
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              py: 1,
              mb: 8,
              borderRadius: 10,
              textTransform: "none",
            }}
            type="submit"
            loading={isLoading}
          >
            Save
          </LoadingButton>
        </form>
        <Box sx={{ mb: 8 }}>
          <StyledHead>Password</StyledHead>
          <Button
            variant="contained"
            disableElevation
            size="small"
            // color="error"
            sx={{
              // width: "100%",
              py: 1,
              px: 3,
              mt: 1,
              borderRadius: 10,
              textTransform: "none",
            }}
            startIcon={<RiLockPasswordFill />}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Box>
        <Box sx={{ mb: 5 }}>
          <StyledHead color="red">Danger Zone</StyledHead>
          <LoadingButton
            variant="contained"
            disableElevation
            color="error"
            sx={{
              // width: "100%",
              py: 1,
              px: 4,
              mb: 2,
              mt: 2,
              borderRadius: 10,
              textTransform: "none",
            }}
            startIcon={<AiFillDelete />}
            onClick={deleteAccount}
            // loading={isLoading}
          >
            Delete Account
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}

export default ProfileSettings;
