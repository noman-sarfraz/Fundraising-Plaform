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
import { logOut, selectCurrentUser } from "../../../features/auth/authSlice";
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
import dp from "../../../../src/assets/images/dp.jpg";
import default_DP from "../../../../src/assets/images/default_DP.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUserGraduate,
  faNoteSticky,
  faRegistered,
  faChalkboardTeacher,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from 'jwt-decode'
import { campaignApiSlice } from "../../../features/campaign/campaignApiSlice";

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
}));

function AppbarComponent({ open, toggleDrawer }) {
  const theme = useTheme();
  const { primary } = theme.pallete;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const { name, role } = user;

  const onLogout = () => {
    dispatch(logOut());
    dispatch(campaignApiSlice.util.resetApiState());

    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar
        variant="dense"
        sx={{
          background: "linear-gradient(to top, rgba(13,154,211,1), #0d47a1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <IconButton
            // disableRipple
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "block" }) }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Button
            id="profile-button"
            aria-controls={profileOpen ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={profileOpen ? "true" : undefined}
            onClick={handleProfileClick}
            // href="/"
            // color="info"
            variant="contained"
            disableElevation
            sx={{
              fontWeight: 600,
              fontSize: 16,
              textTransform: "none",
              background:
                "linear-gradient(to top, rgba(13,154,211,1), #0d47a1)",
            }}
          >
            <Avatar
              size="large"
              alt="Profile Picture"
              src={default_DP}
              sx={{
                height: "24px",
                width: "24px",
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{}}>
              {name}
            </Typography>
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={profileOpen}
            onClose={handleProfileClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
            sx={{
              // "& .css-6hp17o-MuiList-root-MuiMenu-list": {
              //   p: 0,
              //   // pb: "0px !important",
              // },
              "& .MuiMenu-list": {
                p: 0,
              },
            }}
            // sx={{ py: 7 }}
          >
            <Box
              sx={
                {
                  // "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                  //   pt: "0px !important",
                  //   pb: "0px !important",
                  // },
                }
              }
            >
              <Box
                sx={{
                  // "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                  //   pt: "0px !important",
                  //   pb: "0px !important",
                  // },
                  background:
                    "linear-gradient(to top, rgba(13,154,211,1), #0d47a1)",
                  height: 200,
                  width: 300,
                  py: 2,
                  color: "white",
                }}
              >
                {/* <Box> */}
                <Box
                  sx={
                    {
                      // display: "flex",
                      // flexDirection: "column",
                      // justifyContent: "center",
                    }
                  }
                >
                  <Box
                    sx={{
                      // bgcolor: "red",
                      // background:
                      //   "linear-gradient(to top, rgba(13,154,211,1), #0d47a1)",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <Avatar
                        // size="large"
                        alt="Profile Picture"
                        src={default_DP}
                        sx={{
                          height: "80px",
                          width: "80px",
                          mb: 1,
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 18 }}>
                      {name}
                    </Typography>
                    <Typography>{role}</Typography>
                  </Box>
                </Box>
                {/* </Box> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                  bgcolor: "#eee",
                }}
              >
                <Button
                  color="info"
                  variant="outlined"
                  disableElevation
                  sx={{
                    // fontWeight: 600,
                    fontSize: 12,
                    textTransform: "none",
                    borderRadius: 0,
                  }}
                  onClick={() => {
                    navigate("/admin/profile-settings");
                    handleProfileClose();
                  }}
                >
                  Profile
                </Button>
                <Button
                  color="info"
                  variant="outlined"
                  disableElevation
                  sx={{
                    // fontWeight: 600,
                    fontSize: 12,
                    textTransform: "none",
                    borderRadius: 0,
                  }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </Box>
            </Box>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppbarComponent;
