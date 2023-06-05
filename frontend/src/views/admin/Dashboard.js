import * as React from "react";
import { styled as Styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Button, Chip, Link, Typography } from "@mui/material";
import styled from "styled-components";
import { FaBan } from "react-icons/fa";
import { FcApprove } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../components/general/CircularLoader";
import {
  useChangeCampaignStatusMutation,
  useGetAllcampaignsQuery,
} from "./../../features/campaign/campaignApiSlice";
import { toast } from "react-toastify";
import { toNormalDate } from "../../utils/date";

const StyledTableCell = Styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = Styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledButton = styled(Button).attrs({
  variant: "contained",
  disableElevation: true,
})`
  width: 95px !important;
  text-transform: none !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  font-size: 12px !important;
`;

const StyledHeader = styled(Typography).attrs({})`
  color: #1d548f !important;
  font-size: 30px !important;
  font-weight: bold !important;
  text-align: center !important;
  margin-bottom: 4px !important;
  padding-top: 2rem !important;
  padding-bottom: 3rem !important;
  background-color: #eef5fe;
`;

const StyledStatus = styled(Typography).attrs({})`
  font-size: 14px !important;
  color: ${(props) =>
    props.status === "Approved"
      ? "#2E7D32"
      : props.status === "Rejected"
      ? "red"
      : ""};
`;

export default function Dashboard() {
  // const [campaigns, setCampaigns] = React.useState([]);
  // var campaigns = [];

  const [changeCampaignStatus, { isLoading }] =
    useChangeCampaignStatusMutation();

  const { data, isLoading: campaignsLoading } = useGetAllcampaignsQuery();

  const changeStatus = async (id, status) => {
    try {
      const res = await changeCampaignStatus({ id, status });
      if (res?.data?.campaign) {
        toast.success("Status changed successfully! REFRESH PAGE");
        console.log("campaign:", res);

        // document.getElementById(`status-${id}`).innerHTML = 'a'
        // (
        // <h1 color="red">RED</h1>
        // );
        //   <StyledStatus status={res.data.campaign.status}>
        //     {res.data.campaign.status}
        //   </StyledStatus>
        // );
        // res.data.campaign.status;
        // alert(res.campaign.status);
      } else {
        console.log("error", res);
        toast.error("Status could not be changed!");
      }
    } catch (e) {
      toast.error("Status could not be changed!");
      console.log(e);
    }
  };

  if (campaignsLoading) return <CircularLoader />;
  if (!campaignsLoading) {
    if (data?.campaigns) {
      // campaigns = data.campaigns;
      console.log(data.campaigns);
    } else {
      console.log("error", data);
      return <h1>Error: Cannot fetch campaigns...</h1>;
    }
  }

  return (
    <Box>
      <StyledHeader>Approval Requests</StyledHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Campaign Title</StyledTableCell>
              <StyledTableCell>Organizer</StyledTableCell>
              <StyledTableCell>Request Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.campaigns.map((campaign, index) => (
              <StyledTableRow key={campaign._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={`campaign/${campaign._id}`}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {campaign.title}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{campaign.organizerName}</StyledTableCell>
                {/* <StyledTableCell>Jan 12, 2023</StyledTableCell> */}
                <StyledTableCell>
                  {toNormalDate(campaign.createdAt)}
                </StyledTableCell>
                <StyledTableCell id={`status-${campaign._id}`}>
                  <StyledStatus status={campaign.status}>
                    {campaign.status === "Pending" ? (
                      <Chip label="Pending" color="warning" />
                    ) : campaign.status === "Approved" ? (
                      <Chip label="Approved" color="success" />
                    ) : campaign.status === "Rejected" ? (
                      <Chip label="Rejected" color="error" />
                    ) : campaign.status === "Stopped" ? (
                      <Chip label="Stopped" />
                    ) : campaign.status === "Completed" ? (
                      <Chip label="Completed" color="info" />
                    ) : (
                      ""
                    )}
                  </StyledStatus>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {campaign.status === "Pending" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "2px",
                      }}
                    >
                      <StyledButton
                        color="success"
                        startIcon={<TiTick color="#fff" size="18px" />}
                        onClick={() => changeStatus(campaign._id, "Approved")}
                      >
                        Approve
                      </StyledButton>
                      <StyledButton
                        color="error"
                        startIcon={<FaBan color="#fff" size="14px" />}
                        onClick={() => changeStatus(campaign._id, "Rejected")}
                      >
                        Reject
                      </StyledButton>
                    </Box>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
