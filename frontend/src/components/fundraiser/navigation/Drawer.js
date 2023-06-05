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
import { campaignApiSlice } from "../../../features/campaign/campaignApiSlice";

import { MdCampaign } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

import { FaQuestionCircle } from "react-icons/fa";
import { AiFillInfoCircle, AiOutlineHistory } from "react-icons/ai";
import { BsInfoCircleFill, BsInfoSquare, BsInfoCircle } from "react-icons/bs";

import { ImStatsBars2 } from "react-icons/im";


import { GrCircleInformation } from "react-icons/gr";
import { VscAdd } from "react-icons/vsc";

import { IoSettings, IoInformationCircle } from "react-icons/io5";

import { CiSettings } from "react-icons/ci";

// drawer width
const drawerWidth = 250;
var navItems = [
  {
    name: "campaigns",
    text: "Campaigns",
    link: "/fr_account/campaigns",
    link2: "/fr_account",
    icon: <MdCampaign />,
    children: null,
  },
  {
    name: "new-campaign",
    text: "New campaign",
    link: "/fr_account/new-campaign",
    icon: <IoMdAdd />,
    children: null,
  },
  {
    name: "profile-settings",
    text: "Profile Settings",
    link: "/fr_account/profile-settings",
    icon: <FiSettings />,
    children: null,
  },

  {
    name: "campaign-statistics",
    text: "Campaign Statistics",
    link: "/fr_account/campaign-statistics",
    icon: <ImStatsBars2 />,
    children: null,
    disabled: true,
  },
  {
    name: "donation-history",
    text: "Donation History",
    link: "/fr_account/donation-history",
    icon: <AiOutlineHistory />,
    children: null,
    disabled: true,
  },
];

var navItems2 = [
  {
    name: "FAQs",
    text: "FAQs",
    link: "/fr_account/faqs",
    icon: <FaQuestionCircle />,
    children: null,
  },
  {
    name: "how-it-works",
    text: "How it works",
    link: "/fr_account/how-it-works",
    icon: <BsInfoCircleFill />,
    children: null,
  },
  {
    name: "logout",
    text: "Logout",
    icon: <FiLogOut />,
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
    dispatch(campaignApiSlice.util.resetApiState());
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

  console.log("rendering drawer");
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
          FUNDRAISE
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
                  disabled={item.disabled}
                  selected={
                    location.pathname.match(item.link) ||
                    (item.link === "/fr_account/campaigns" &&
                      (location.pathname === "/fr_account" ||
                        location.pathname === "/fr_account/"))
                      ? true
                      : false
                  }
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
                  disabled={item.disabled}
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
