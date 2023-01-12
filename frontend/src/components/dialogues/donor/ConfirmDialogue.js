import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteAccontMutation } from "../../../features/donor/donorApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";

export default function ConfirmDialog({
  open,
  setOpen,
  title,
  message,
  onSuccess,
}) {
  const [deleteAccount, { isLoading }] = useDeleteAccontMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const data = await deleteAccount().unwrap();
      if (data?.success) {
        toast.success("Account deleted successfully");
        dispatch(logOut());
        navigate("/login");
      } else {
        toast.error("Could not delete account");
      }
    } catch (err) {
      toast.error(err.data?.msg ? err.data.msg : "Could not delete account");
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
      <DialogTitle id="alert-dialog-title">
        {title ? title : "Alert"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message ? message : "Are you sure?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          sx={{
            // bgcolor: "teal",
            width: "25%",
          }}
          onClick={handleDeleteAccount}
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
      </DialogActions>
    </Dialog>
  );
}
