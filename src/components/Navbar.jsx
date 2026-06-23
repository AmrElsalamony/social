import { useContext, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

import {
  Home,
  Notifications,
  Person,
  Menu,
  Close,
  Logout
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { AuthContext } from "../Contexts/AuthContext";
import { NotificationContext } from "../Contexts/Notifications";
import NotificationsMenu from './NotificationCenter/NotificationCenter'; // Keep your original import
import { ThemeContext } from './../Contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const { userData } = useContext(UserContext);
  const { notificationNumber } = useContext(NotificationContext);
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  }

  const toggleNotificationDrawer = (open) => {
    setNotificationDrawerOpen(open);
  };

  const location = useLocation();

  return (
    <>
      {/* Notification Drawer - Slides from Right */}
      <Drawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={() => toggleNotificationDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '420px',
            height: '100vh',
            backgroundColor: 'white',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            overflow: 'hidden',
            '@media (max-width: 600px)': {
              maxWidth: '100%',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
            },
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            // backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
          className={"card rounded-none"}
        >
          <div className="flex items-center gap-3 ">
            <div className=" flex items-center justify-center text-xs font-bold">
              <img src={userData.photo} className="w-10  h-10 bg-gray-50 rounded-full" alt="" />
              <h2 className="text-xl font-bold text-main ms-4">{userData.name}</h2>
            </div>

            {notificationNumber > 0 && (
              <Badge
                badgeContent={notificationNumber > 0 ? notificationNumber : null}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 4px',
                  }
                }}
              >
                <Notifications className="text-sub" />
              </Badge>
            )}
          </div>
          <IconButton
            onClick={() => toggleNotificationDrawer(false)}
            sx={{
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            <Close className="text-sub" />
          </IconButton>
        </Box>

        {/* Notification Content */}
        <Box sx={{ height: 'calc(100vh - 72px)', overflow: 'auto' }}>
          <NotificationsMenu
            toggle={() => toggleNotificationDrawer(false)}
            isInDrawer={true}
          />
        </Box>
      </Drawer>

      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
        }}
      >
        <Toolbar className="card rounded-none flex justify-between items-center h-[70px] sm:h-fit">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <Link to={"/"}>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold cursor-pointer">
                Amr
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden lg:flex gap-3 ms-[80px]">
            <Link to={"/"}>
              <IconButton
                onClick={() => setActive("feed")}
                sx={{
                  borderBottom:
                    location.pathname === "/" || location.pathname.includes("post-details")
                      ? "3px solid #1877F2"
                      : "none",
                  borderRadius: 0,
                  color:
                    location.pathname === "/" || location.pathname.includes("post-details")
                      ? "#1877F2"
                      : "#65676B",
                  width: 100,
                }}
              >
                <Home />
              </IconButton>
            </Link>

            <Link to={`/profile/${userData._id}/posts`}>
              <IconButton
                onClick={() => setActive("profile")}
                sx={{
                  borderBottom:
                    location.pathname === "/profile" || location.pathname.includes("/profile")
                      ? "3px solid #1877F2"
                      : "none",
                  borderRadius: 0,
                  color:
                    location.pathname === "/profile" || location.pathname.includes("/profile")
                      ? "#1877F2"
                      : "#65676B",
                  width: 100,
                }}
              >
                <Person />
              </IconButton>
            </Link>

            <Link to={"/suggestion"}>
              <IconButton
                onClick={() => setActive("suggestion")}
                sx={{
                  borderBottom:
                    location.pathname === "/suggestion"
                      ? "3px solid #1877F2"
                      : "none",
                  borderRadius: 0,
                  color:
                    location.pathname === "/suggestion"
                      ? "#1877F2"
                      : "#65676B",
                  width: 100,
                }}
              >
                <GroupAddIcon />
              </IconButton>
            </Link>

            <Link to={"/settings"}>
              <IconButton
                onClick={() => setActive("settings")}
                sx={{
                  borderBottom:
                    location.pathname === "/settings"
                      ? "3px solid #1877F2"
                      : "none",
                  borderRadius: 0,
                  color:
                    location.pathname === "/settings"
                      ? "#1877F2"
                      : "#65676B",
                  width: 100,
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Link>

            <Link to={"/bookmarks"}>
              <IconButton
                onClick={() => setActive("bookmarks")}
                sx={{
                  borderBottom:
                    location.pathname === "/bookmarks"
                      ? "3px solid #1877F2"
                      : "none",
                  borderRadius: 0,
                  color:
                    location.pathname === "/bookmarks"
                      ? "#1877F2"
                      : "#65676B",
                  width: 100,
                }}
              >
                <BookmarkIcon />
              </IconButton>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              {theme === "dark" ? (
                <MdLightMode className="text-2xl text-yellow-400" />
              ) : (
                <MdDarkMode className="text-2xl text-slate-700 dark:text-white" />
              )}
            </button>

            {/* Notification Button */}
            <IconButton
              onClick={() => toggleNotificationDrawer(true)}
              className="relative"
              aria-label="Notifications"
            >
              <Badge
                badgeContent={notificationNumber > 0 ? notificationNumber : null}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 4px',
                  }
                }}
              >
                <Notifications className="text-sub" />
              </Badge>
            </IconButton>

            <Link to={`/profile/${userData._id}/posts`}>
              <Avatar
                src={`${userData?.photo}?v=${Date.now()}`}
                className="bg-gray-200"
                sx={{
                  width: 38,
                  height: 38,
                  cursor: "pointer",
                }}
              />
            </Link>

            {/* Mobile Menu Button */}
            <IconButton
              className="md:hidden"
              onClick={() => setOpenDrawer(true)}
            >
              <Menu className="text-sub" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box className="w-72 card h-full rounded-none">
          <div className="flex justify-between p-4">
            <div className="font-bold text-xl text-main">Menu</div>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <Close className="text-sub" />
            </IconButton>
          </div>

          <List className="*:text-sub">
            <Link to={"/"}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive("Home");
                    setOpenDrawer(false);
                  }}
                >
                  <div className="mr-4">
                    <Home />
                  </div>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={`/profile/${userData._id}/posts`}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive("Profile");
                    setOpenDrawer(false);
                  }}
                >
                  <div className="mr-4">
                    <Person />
                  </div>
                  <ListItemText primary={"Profile"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={"/suggestion"}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive("suggestion");
                    setOpenDrawer(false);
                  }}
                >
                  <div className="mr-4">
                    <GroupAddIcon />
                  </div>
                  <ListItemText primary={"suggestion"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={"/settings"}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive("settings");
                    setOpenDrawer(false);
                  }}
                >
                  <div className="mr-4">
                    <SettingsIcon />
                  </div>
                  <ListItemText primary={"settings"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={"/bookmarks"}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive("bookmarks");
                    setOpenDrawer(false);
                  }}
                >
                  <div className="mr-4">
                    <BookmarkIcon />
                  </div>
                  <ListItemText primary={"bookmarks"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItem onClick={logout} disablePadding>
              <ListItemButton
                onClick={() => {
                  setActive("Logout");
                  setOpenDrawer(false);
                }}
              >
                <div className="mr-4">
                  <Logout />
                </div>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}