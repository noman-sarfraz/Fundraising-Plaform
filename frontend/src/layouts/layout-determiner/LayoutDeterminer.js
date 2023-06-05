import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import AdminLayout from "../AdminLayout";
import FundraiserLayout from "../FundraiserLayout";
import DonorLayout from "../DonorLayout";
import { Box, CssBaseline, styled, useTheme } from "@mui/material";

import AdminAppbar from "../../components/admin/navigation/Appbar";
import AdminDrawer from "../../components/admin/navigation/Drawer";

import FundraiserAppbar from "../../components/fundraiser/navigation/Appbar";
import FundraiserDrawer from "../../components/fundraiser/navigation/Drawer";

import DonorAppbar from "../../components/donor/navigation/Appbar";
import DonorDrawer from "../../components/donor/navigation/Drawer";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function LayoutDeterminer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(window.innerWidth > 900);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [role, setRole] = React.useState("");

  const user = useSelector(selectCurrentUser);
  if (!role && localStorage.getItem("user")) {
    const role = user.role;
    if (role === "Admin") setRole("Admin");
    else if (role === "Fundraiser") setRole("Fundraiser");
    else if (role === "Donor") setRole("Donor");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {role === "Admin" ? (
        <AdminAppbar open={open} toggleDrawer={toggleDrawer} />
      ) : role === "Fundraiser" ? (
        <FundraiserAppbar open={open} toggleDrawer={toggleDrawer} />
      ) : role === "Donor" ? (
        <DonorAppbar open={open} toggleDrawer={toggleDrawer} />
      ) : null}
      <Box sx={{ display: "flex", width: "100%" }}>
        {role === "Admin" ? (
          <AdminDrawer
            open={open}
            isMobile={theme.breakpoints.down("sm")}
            toggleDrawer={toggleDrawer}
          />
        ) : role === "Fundraiser" ? (
          <FundraiserDrawer
            open={open}
            isMobile={theme.breakpoints.down("sm")}
            toggleDrawer={toggleDrawer}
          />
        ) : role === "Donor" ? (
          <DonorDrawer
            open={open}
            isMobile={theme.breakpoints.down("sm")}
            toggleDrawer={toggleDrawer}
          />
        ) : null}

        <Box
          sx={{
            flexGrow: "1",
            bgcolor: "#ecf0f5",
          }}
        >
          <Main open={open} sx={{ mt: 5, width: "100%" }}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                borderTop: "3px solid #d2d6de",
                px: 1,
                pt: 0.5,
                pb: 2,
              }}
            >
              <Outlet />
            </Box>
          </Main>
        </Box>
      </Box>
    </Box>
  );
}

export default LayoutDeterminer;
