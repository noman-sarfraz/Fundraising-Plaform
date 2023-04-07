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
import { useChangeFundraiserPasswordMutation } from "../../features/fundraiser/fundraiserApiSlice";

const StyledTextField = styled(TextField).attrs((props) => ({
  // fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  sx: {
    mb: 1,
    // maxWidth: props.maxWidth ? props.maxWidth : "100%",
  },
}))``;


const StyledButton = styled(Button).attrs((props) => ({
  // fullWidth: true,
  size: "small",
  inputProps: {
    style: {
      fontSize: 14,
    },
  },
  width: "50px",

  sx: {
    mb: 1,

    // maxWidth: props.maxWidth ? props.maxWidth : "100%",
  },
}))``;



export default function LinkDialogue({ open, setOpen, title, link }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    document.getElementById("link").select();
    navigator.clipboard.writeText(link)
    document.getElementById("copy-button").innerHTML = 'Copied!';
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: 700, fontSize: 22, mb: 5 }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", gap: '10px' }}>
            <StyledTextField id="link" required value={link} />
            <StyledButton
              id="copy-button"
              variant="contained"
              disableElevation
              sx={{
                width: "100%",
                py: 1,
                mt: 2,
                borderRadius: 10,
                textTransform: "none",
              }}
              onClick={handleClick}
            >
              Copy Link
            </StyledButton>
          </Box>
        </Box>

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
