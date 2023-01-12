import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { FcApproval } from "react-icons/fc";

export default function UpdateNotification({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">
        {title ? title : "Alert"}
      </DialogTitle> */}
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FcApproval size={50} color="green" />
          </Box>
          <Typography
            sx={{ textAlign: "center", fontWeight: 700, fontSize: 22, mb: 1 }}
          >
            Updated Successfully!
          </Typography>
          <Typography variant="caption">
            All of your changes have been saved. Close popup to see.
          </Typography>
          <Button
            variant="text"
            sx={{ textTransform: "none", fontWeight: 600, mt: 2 }}
            onClick={() => {
              handleClose();
            }}
          >
            Ok, got it
          </Button>
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
