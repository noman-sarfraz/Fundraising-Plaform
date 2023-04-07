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
import {  useStopCampaignMutation } from "../../../features/campaign/campaignApiSlice";
import { LoadingButton } from "@mui/lab";

export default function StopCampaignDialogue({
  open,
  setOpen,
  id,
  title,
  message,
}) {  
  const [stopCampaign, {isLoading}] = useStopCampaignMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStopCampaign = async () => {
    try {
      const data = await stopCampaign(id).unwrap();
      if (data?.campaign) {
        toast.success("Campaign stopped successfully");
      } else {
        toast.error("Could not stop campaign");
      }
    } catch (err) {
      toast.error(
        err.data?.msg ? err.data.msg :
        "Could not stop campaign"
      );
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
          onClick={handleStopCampaign}
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
