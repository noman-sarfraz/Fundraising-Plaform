import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Collapse,
  Grid,
  LinearProgress,
  Link,
  Menu,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SettingsIcon from "@mui/icons-material/Settings";
// import dp from "../../../assets/dp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUserGraduate,
  faNoteSticky,
  faRegistered,
  faChalkboardTeacher,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
// import { isContentEditable } from "@testing-library/user-event/dist/utils";

import AddIcon from "@mui/icons-material/Add";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";

// drawer width

const drawerWidth = 250;
var navItems = [
  {
    name: "dashboard",
    text: "Home",
    link: "/admin",
    // link2: "/admin/dashboard",
    icon: <FontAwesomeIcon icon={faDashboard} />,
    children: null,
  },
  // {
  //   name: "profile-settings",
  //   text: "Profile Settings",
  //   link: "/admin/profile-settings",
  //   icon: <FontAwesomeIcon icon={faDashboard} />,
  //   children: null,
  // },
];

var navItems2 = [
  {
    name: "logout",
    text: "Logout",
    icon: <FontAwesomeIcon icon={faDashboard} />,
    children: null,
  },
];

function DrawerComponent({ open, toggleDrawer }) {
  const theme = useTheme();
  const { primary } = theme.pallete;

  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleToggleDrawer = () => {
    toggleDrawer();
  };

  React.useEffect(() => {
    if (window.innerWidth > 900 && isMobile) {
      setIsMobile(false);
    } else if (window.innerWidth < 900 && !isMobile) {
      setIsMobile(true);
    }
  }, [open]);

  const drawer = (
    <Box
      sx={{
        height: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 1,
          background: "linear-gradient(to top, rgba(13,154,211,1), #0d47a1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: 600, color: "white" }}
        >
          ADMIN
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: "white" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item, index) => (
            <div key={index}>
              <ListItem
                key={item.name}
                disablePadding
                sx={{ bgcolor: primary, color: "#b8c7ce" }}
              >
                <ListItemButton
                  href={item.link}
                  disabled={item.disable}
                  selected={location.pathname.match(item.link)}
                  sx={{
                    [`&:hover`]: {
                      color: "white",
                      background: "linear-gradient(to top, #143b64, #0d47a1)",
                    },
                    [`&.Mui-selected`]: {
                      color: "white",
                      // bgcolor: "#0d78be !important",
                      background: `linear-gradient(to left, rgba(13,154,211,1), #0d47a1)`,
                      //   "linear-gradient(to top, #143b64, #0d47a1)",
                      // color: "white",
                    },
                  }}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <ChevronRightIcon sx={{ fontSize: 18, color: "#ec822a" }} />
                  )}
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          ml: 2,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                  {/* {item.children &&
                  (subListOpen[item.name] ? (
                    <ExpandLess sx={{ fontSize: 18 }} />
                  ) : (
                    <ExpandMore sx={{ fontSize: 18 }} />
                  ))} */}
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>

        {/* down list */}
        <List>
          {navItems2.map((item, index) => (
            <div>
              <ListItem
                key={item.name}
                disablePadding
                sx={{ bgcolor: primary, color: "#b8c7ce" }}
              >
                <ListItemButton
                  {...(item.name === "logout"
                    ? { onClick: onLogout }
                    : { href: item.link })}
                  disabled={item.disable}
                  selected={item.link === location.pathname ? true : false}
                  // // onLoad={item.children ? checkOpenedParent(item) : undefined}
                  // onClick={
                  //   item.children ? () => changeSubListOpen(item.name) : null
                  // }
                  sx={{
                    [`&:hover`]: {
                      color: "white",
                      background: "linear-gradient(to top, #143b64, #0d47a1)",
                    },
                    [`&.Mui-selected`]: {
                      color: "white",
                      // bgcolor: "#0d78be !important",
                      background: `linear-gradient(to left, rgba(13,154,211,1), #0d47a1)`,
                      //   "linear-gradient(to top, #143b64, #0d47a1)",
                      // color: "white",
                    },
                  }}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <ChevronRightIcon sx={{ fontSize: 18, color: "#ec822a" }} />
                  )}
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          ml: 2,
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* {console.log(isMobile ? "true" : window.innerWidth)} */}
      {/* {console.log("open", open, "!isMobile", !isMobile)} */}
      <Drawer
        open={open && !isMobile}
        onClose={handleToggleDrawer}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "*": {
            scrollbarWidth: "0px",
          },
          "*::-webkit-scrollbar": {
            width: 0,
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: primary,
            color: "#b8c7ce",
          },
        }}
        variant="persistent"
        anchor="left"
      >
        {drawer}
      </Drawer>
      <Drawer
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          "*": {
            scrollbarWidth: "0px",
          },
          "*::-webkit-scrollbar": {
            width: 0,
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: primary,
            color: "#b8c7ce",
          },
        }}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        anchor="left"
        open={open && isMobile}
        onClose={handleToggleDrawer}
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
