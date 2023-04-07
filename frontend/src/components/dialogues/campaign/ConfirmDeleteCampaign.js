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
import { useDeleteCampaignMutation } from "../../../features/campaign/campaignApiSlice";
import { LoadingButton } from "@mui/lab";

export default function DeleteCampaignDialogue({
  open,
  setOpen,
  id,
  title,
  message
}) {
  // console.log("DeleteCampaignDialogue ", id);
  // const [deleteAccount, { isLoading }] = useDeleteAccontMutation();
  const [deleteCampaign, { isLoading }] = useDeleteCampaignMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCampaign = async () => {
    try {
      const data = await deleteCampaign(id).unwrap();
      if (data?.success) {
        toast.success("Campaign deleted successfully");
      } else {
        toast.error("Could not delete campaign");
      }
    } catch (err) {
      toast.error(err.data?.msg ? err.data.msg : "Could not delete campaign");
      console.log(err);
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
        <LoadingButton
          color="error"
          variant="contained"
          sx={{
            width: "25%",
          }}
          loading={isLoading}
          onClick={handleDeleteCampaign}
        >
          Yes
        </LoadingButton>
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
