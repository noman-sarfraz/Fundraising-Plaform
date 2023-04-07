import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import stripeLogo from "../../../assets/images/stripe.svg";
import paypalLogo from "../../../assets/images/paypal.svg";
import { GrAddCircle } from "react-icons/gr";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AiOutlineLink } from "react-icons/ai";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";
import { useCreateCampaignMutation } from "../../../features/fundraiser/fundraiserApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const Dot = () => {
  return (
    <span
      style={{
        fontSize: 14,
        color: "#798798",
        fontWeight: 1000,
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      {/* &sdot; */}
      &#x25cf;
    </span>
  );
};

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

const StyledText = styled(Typography).attrs((props) => ({
  // variant: "caption",
}))`
  font-size: 12px !important;
  color: #2f435a !important;
  text-align: center !important;
`;

function Step3({ state, setState, stepNo, setStepNo, setStepDone }) {
  const visited = () => {
    setStepDone((stepDone) => ({ ...stepDone, [`step${stepNo}`]: true }));
  };

  useEffect(() => {
    return () => {
      visited();
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createCampaign, { isLoading, error }] = useCreateCampaignMutation();

  const sendForApproval = async () => {
    try {
      const { campaign } = await createCampaign(state).unwrap();
      // console.log("done");
      if (!campaign) {
        toast.error("Could not send for approval!");
        return;
      } else {
        // dispatch(setCredentials({ token }));
        console.log('campaign:', campaign);
      }
    } catch (err) {
      // console.log(err.data?.msg ? err.data.msg : "Could not login user!");
      toast.error(
        err.data?.msg ? err.data.msg : "Could not send for approval!"
      );
      return;
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
          <Box sx={{ mb: 5 }}>
            <StyledHead>Your fundraiser story</StyledHead>
          </Box>

          {/* Stripe Card */}
          <Box sx={{ width: "100%", mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid #ddd",
                p: 3,
                borderRadius: 2,
                // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <img
                  src={stripeLogo}
                  alt="Stripe"
                  style={{
                    // borderRadius: "10px",
                    // width: "100%",
                    width: "100px",
                    // height: "50px",
                    // objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  // color: "#8F8798",
                  textAlign: "center",
                  mb: 5,
                }}
              >
                Recommended on all fundraisers
              </Typography>

              <Box sx={{ px: 3 }}>
                <StyledText>
                  Stripe makes it easier than ever to accept donations on
                  GoGetFunding via debit and credit card.
                </StyledText>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    width: "50%",
                    py: 1,
                    bgcolor: "#4A90E2",
                    fontWeight: 700,
                    borderRadius: 10,
                    textTransform: "none",
                  }}
                >
                  Connect with Stripe
                </Button>
              </Box>

              <Box sx={{ py: 4, bgcolor: "#F5F6F7", textAlign: "center" }}>
                <Typography
                  component="span"
                  sx={{ fontSize: 16, fontWeight: 700, color: "#2F435A" }}
                >
                  <IoWarningOutline
                    size={"28px"}
                    style={{ marginBottom: -6, marginRight: 16 }}
                  />
                  Not connected
                </Typography>
                <Dot />
                <Typography
                  component="span"
                  sx={{ fontSize: 12, color: "#798798" }}
                >
                  You have not enabled Stripe yet
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* end */}

          {/* Paypal Card */}
          <Box sx={{ width: "100%", mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid #ddd",
                p: 3,
                borderRadius: 2,
                // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <img
                  src={paypalLogo}
                  alt="Stripe"
                  style={{
                    // borderRadius: "10px",
                    // width: "100%",
                    width: "100px",
                    // height: "50px",
                    // objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  // color: "#8F8798",
                  textAlign: "center",
                  mb: 5,
                }}
              >
                Useful in addition to Stripe
              </Typography>

              <Box sx={{ px: 3 }}>
                <StyledText>
                  PayPal is available in almost all countries worldwide and it's
                  a commonly preferred payment method - especially amongst the
                  more Internet savvy donors.
                </StyledText>
                <StyledText>
                  Create an account at PayPal.com or connect an existing account
                  to your fundraising page in seconds.
                </StyledText>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    width: "50%",
                    py: 1,
                    bgcolor: "#4A90E2",
                    fontWeight: 700,
                    borderRadius: 10,
                    textTransform: "none",
                  }}
                >
                  Connect with PayPal
                </Button>
              </Box>

              <Box sx={{ py: 4, bgcolor: "#F5F6F7", textAlign: "center" }}>
                <Typography
                  component="span"
                  sx={{ fontSize: 16, fontWeight: 700, color: "#2F435A" }}
                >
                  <IoWarningOutline
                    size={"28px"}
                    style={{ marginBottom: -6, marginRight: 16 }}
                  />
                  Not connected
                </Typography>
                <Dot />
                <Typography
                  component="span"
                  sx={{ fontSize: 12, color: "#798798" }}
                >
                  You have not enabled PayPal yet
                </Typography>
              </Box>
            </Box>
          </Box>

          <LoadingButton
            variant="contained"
            disableElevation
            sx={{
              width: "100%",
              py: 1,
              borderRadius: 10,
              textTransform: "none",
            }}
            loading={isLoading}
            onClick={sendForApproval}
          >
            Send for Approval
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Step3;
