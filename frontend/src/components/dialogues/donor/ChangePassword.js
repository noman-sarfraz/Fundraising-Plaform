import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { FcApproval } from "react-icons/fc";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../../../features/donor/donorApiSlice";


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
    maxWidth: props.maxWidth ? props.maxWidth : "100%",
  },
}))``;

export default function ChangePassword({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { oldPassword, newPassword } = formData;
    try {
      const data = await changePassword({ oldPassword, newPassword }).unwrap();
      if (data?.newPassword) {
        toast.success("Password changed successfully");
      } else {
        console.log(data);
        toast.error(data?.msg ? data.msg : "Could not change password!");
      }
    } catch (er) {
      console.log( );
      toast.error(er.data?.msg ? er.data.msg : "Could not change password!");
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: 700, fontSize: 22, mb: 3 }}
            >
              Change Password
            </Typography>
            <Box>
              <StyledTextField
                placeholder="Enter Old Password"
                type="password"
                required
                {...register("oldPassword", { required: true })}
              />
              <StyledTextField
                placeholder="Enter New Password"
                type="password"
                required
                {...register("newPassword", { required: true })}
              />
              <StyledTextField
                placeholder="Confirm New Password"
                type="password"
                required
                {...register("confirmPassword", { required: true })}
              />
            </Box>
            <LoadingButton
              variant="contained"
              disableElevation
              sx={{
                width: "100%",
                py: 1,
                mt: 2,
                borderRadius: 10,
                textTransform: "none",
              }}
              type="submit"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>

        {/* <DialogContentText id="alert-dialog-description">
        </DialogContentText> */}
      </DialogContent>
      {/* <DialogActions>
        <Button
          color="error"
          variant="contained"
          sx={{
            // bgcolor: "teal",
            width: "25%",
          }}
          onClick={() => {
            onSuccess();
            handleClose();
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          sx={{ width: "25%" }}
          onClick={handleClose}
          autoFocus
        >
          No
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
