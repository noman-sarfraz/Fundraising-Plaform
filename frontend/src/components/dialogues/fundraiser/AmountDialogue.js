import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import {
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FcApproval } from "react-icons/fc";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../../../features/donor/donorApiSlice";
import { useCreateDonationMutation } from "../../../features/donations/donationsApiSlice";

const StyledTextField = styled(TextField).attrs((props) => ({
  size: "small",
  inputProps: {
    style: {
      fontSize: 16,
      padding: "12px 12px 12px 12px",
    },
  },
  sx: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: props.error ? "#D32F2F" : null,
      },
    },
  },
}))`
  font-weight: 600 !important;
  color: #0d54a9 !important;
  margin-bottom: 16px !important;
  /* background-color: #f4f1f9; */
  /* background-color: #efefef; */
  width: 100% !important;
  /* color: ; */
`;

const StyledTextArea = styled(TextField).attrs((props) => ({
  size: "small",
  multiline: true,
  // fullwidth: true,
  rows: 4,
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  type: "text",
}))`
  margin-bottom: 16px !important;
  width: 100% !important;
`;

export default function AmountDialogue({ open, setOpen, params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createDonation, { isLoading }] = useCreateDonationMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    try {
      const data = await createDonation({
        amount: formData.amount,
        comment: formData.comment,
        campaignId: params.campaignId,
        transactionId: params.transactionId,
      }).unwrap();
      if (data?.donation) {
        toast.success("Donation Successful!");
        console.log(data);
        handleClose();
      } else {
        console.log(data);
        toast.error(data?.msg ? data.msg : "Donation Failed!");
        handleClose();
      }
    } catch (er) {
      console.log(er);
      toast.error(er.data?.msg ? er.data.msg : "Donation Failed!");
      handleClose();
    }
    handleClose();
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

      // sx={{
      //   display: 'flex',
      //   justifyContent: 'center',
      // }}
    >
      <DialogContent
      // sx={{
      //   width: {
      //     xs: "100%",
      //     // md: "50vw",
      //   },
      // }}
      >
        <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: 500, fontSize: 22, mb: 3 }}
            >
              Donation Amount
            </Typography>

            <StyledTextField
              required
              placeholder="Enter Amount"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ fontWeight: 600, color: "#0d54a9" }}>PKR</Box>
                  </InputAdornment>
                ),
              }}
              {...register("amount", { required: true, min: 1 })}
              error={errors.amount ? true : false}
            />
            <StyledTextArea
              placeholder="Enter Comment"
              {...register("comment")}
            />

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
              // disabled={paymentMethod === paymentMethods[0]}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>

        {/* <DialogContentText id="alert-dialog-description">
        </DialogContentText> */}
      </DialogContent>
    </Dialog>
  );
}
