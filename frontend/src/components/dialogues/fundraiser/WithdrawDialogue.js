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

const StyledSelect = styled(Select).attrs((props) => ({
  fullWidth: true,
  size: "small",
  sx: {
    maxWidth: props.maxWidth ? props.maxWidth : "100%",
  },
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
  margin-bottom: 8px !important;
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


const StyledAmountField = styled(TextField).attrs((props) => ({
  size: "small",
  inputProps: {
    style: {
      fontSize: 16,
      padding: "12px 12px 12px 12px",
    },
  },
  required: true,
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

let paymentMethods = [
  "~ Select Payment Method ~",
  "Easypaisa",
  "Jazzcash",
  "Card Payment",
];

export default function WithdrawDialogue({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [paymentMethod, setPaymentMethod] = React.useState("Card Payment");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    console.log(formData);
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
              Withdraw Funds
            </Typography>

            <Box>
              <StyledSelect
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                {paymentMethods.map((method, index) => (
                  <MenuItem
                    key={index}
                    value={method}
                    disabled={method === paymentMethods[0]}
                  >
                    {method}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Box>

            <StyledTextField
              placeholder="Account Number"
              required
              {...register("accountNumber", { required: true })}
            />

            <StyledTextField
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
