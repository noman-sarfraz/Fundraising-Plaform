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
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { FaBan } from "react-icons/fa";
import { FcApprove } from "react-icons/fc";
import { TiTick } from "react-icons/ti";

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

{
  /* <Typography
  sx={{
    color: "#1D548F",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    mb: 1,
  }}
  py: 5, bgcolor: "#EEF5FE", mb: 5
>
  Search Fundraises
</Typography>; */
}

const StyledHeader = styled(Typography).attrs({})`
  color: #1d548f !important;
  font-size: 32px !important;
  font-weight: bold !important;
  text-align: center !important;
  margin-bottom: 4px !important;
  padding-top: 5rem !important;
  padding-bottom: 5rem !important;
  background-color: #eef5fe;
`;

function createData(id, title, organizer, requestedAt, status) {
  return { id, title, organizer, requestedAt, status };
}


const rows = [
  createData(1, "Flood Relief Fund", "Maria Younus", "Jan 09, 2023", "Pending"),
  createData(2, "Flood Relief Fund", "Maria Younus", "Jan 09, 2023", "Pending"),
  createData(3, "Flood Relief Fund", "Maria Younus", "Jan 09, 2023", "Pending"),
  createData(4, "Flood Relief Fund", "Maria Younus", "Jan 09, 2023", "Pending"),
  createData(5, "Flood Relief Fund", "Maria Younus", "Jan 09, 2023", "Pending"),
];

export default function Dashboard() {
  return (
    <Box>
      <StyledHeader>Campaign Requests</StyledHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Campaign Title</StyledTableCell>
              <StyledTableCell>Organizer</StyledTableCell>
              <StyledTableCell>Requested At</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.organizer}</StyledTableCell>
                <StyledTableCell>{row.requestedAt}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell align="right">
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
                    >
                      Approve
                    </StyledButton>
                    <StyledButton
                      color="warning"
                      startIcon={<FaBan color="#fff" size="14px" />}
                    >
                      Reject
                    </StyledButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
