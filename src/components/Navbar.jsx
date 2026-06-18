import { useContext, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
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

// const navItems = [
//   { icon: <Home />, name: "Home" , path:"/" },
//   { icon: <Person  />, name: "Profile" ,path:"/profile" },

// ];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
const { userData } = useContext(UserContext)
const { notificationNumber } = useContext(NotificationContext)
  const navigate = useNavigate()
  const {isLogged , setIsLogged} = useContext(AuthContext)

  const [notificationMenu, setNotificationMenu] = useState(false);

  function logout() {
    localStorage.removeItem("token")
    setIsLogged(false)
    navigate("/login")
  }

   const toggle = () => {
    setNotificationMenu(prev => !prev);
  };


  const location = useLocation()
  return (
    <>
    
{notificationMenu?<NotificationsMenu/> : ""}
    
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
        }}
      >
        <Toolbar className="flex justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* Logo */}
           <Link to={"/"}>
            <div
              className="
              w-10 h-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-xs
              font-bold
              cursor-pointer
              "
            >
              Circle
            </div>
           </Link>

      
          </div>

          {/* CENTER */}
          <div className="hidden md:flex gap-4">

           
            <Link  to={"/"}>
            
              <IconButton
                
                onClick={() => setActive("feed")}
                
                sx={{
                  borderBottom:
                     location.pathname === "/"||location.pathname.includes("post-details")
                      ? "3px solid #1877F2"
                      : "none",

                  borderRadius: 0,

                  color:
                     location.pathname === "/"||location.pathname.includes("post-details")
                      ? "#1877F2"
                      : "#65676B",

                  width: 100,
                }}
              >
                {<Home />}
              </IconButton>
            </Link>

            <Link  to={`/profile/${userData._id}/posts`}>
            
              <IconButton
                
                onClick={() => setActive("profile")}
                
                sx={{
                  borderBottom:
                     location.pathname === "/profile"||location.pathname.includes("/profile")
                      ? "3px solid #1877F2"
                      : "none",

                  borderRadius: 0,

                  color:
                     location.pathname === "/profile"||location.pathname.includes("/profile")
                      ? "#1877F2"
                      : "#65676B",

                  width: 100,
                }}
              >
                {<Person />}
              </IconButton>
            </Link>

               <Link  to={"/suggestion"}>
            
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
                {<GroupAddIcon/>}
              </IconButton>
            </Link>
             <Link  to={"/settings"}>
            
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
                {<SettingsIcon/>}
              </IconButton>
            </Link>
          
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

        

          

            <IconButton onClick={toggle}>
              <Badge badgeContent={notificationNumber} color="error">
                <Notifications />
              </Badge>
            </IconButton>

           <Link to={`/profile/${userData._id}/posts`}>
           <Avatar
  src={`${userData?.photo}?v=${Date.now()}`}

   className="bg-gray-200"
              src={userData?.photo}
              sx={{
                width: 38,
                height: 38,
                cursor: "pointer",
              }}
/>
            {/* <Avatar
            className="bg-gray-200"
              src={userData?.photo}
              sx={{
                width: 38,
                height: 38,
                cursor: "pointer",
              }}
            /> */}
            
            </Link>

            {/* Mobile Menu */}
            <IconButton
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer */}

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="w-72 ">

          <div className="flex justify-between p-4">

            <div className="font-bold text-xl">
              Menu
            </div>

            <IconButton
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>

          </div>

          <List>

          
              <Link  to={"/"}>
              <ListItem
               
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive("Home");
                    setOpen(false);
                  }}
                >
                  <div className="mr-4">
                    <Home />
                  </div>

                  <ListItemText
                    primary={"Home"}
                  />
                </ListItemButton>
              </ListItem>
              </Link>

             <Link  to={`/profile/${userData._id}/posts`}>
              <ListItem
               
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive("Profile");
                    setOpen(false);
                  }}
                >
                  <div className="mr-4">
                    <Person />
                  </div>

                  <ListItemText
                    primary={"Profile"}
                  />
                </ListItemButton>
              </ListItem>
              </Link>


 <Link  to={"/suggestion"}>
              <ListItem
               
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive("suggestion");
                    setOpen(false);
                  }}
                >
                  <div className="mr-4">
                    <GroupAddIcon />
                  </div>

                  <ListItemText
                    primary={"suggestion"}
                  />
                </ListItemButton>
              </ListItem>
              </Link>

 <Link  to={"/settings"}>
              <ListItem
               
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive("settings");
                    setOpen(false);
                  }}
                >
                  <div className="mr-4">
                    <SettingsIcon/>
                  </div>

                  <ListItemText
                    primary={"settings"}
                  />
                </ListItemButton>
              </ListItem>
              </Link>


              <ListItem
               onClick={logout}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setActive("Logout");
                    setOpen(false);
                  }}
                >
                  <div className="mr-4">
                    <Logout />
                  </div>

                  <ListItemText
                    primary={"Logout"}
                  />
                </ListItemButton>
              </ListItem>



        

          </List>
        </Box>
      </Drawer>
    </>
  );
}


// import { Link, useNavigate } from 'react-router-dom';
// import { useContext, useState } from "react";
// import { AuthContext } from './../Contexts/AuthContext';

// import {
import NotificationsMenu from './NotificationCenter/NotificationCenter';

//   Navbar as Navbarr,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   Button,
// } from "@heroui/react";

// export default function Navbar() {
//   const navigate = useNavigate()
//   const {isLogged , setIsLogged} = useContext(AuthContext)
  
//   function logout() {
//     localStorage.removeItem("token")
//     setIsLogged(false)
//     navigate("/login")
//   }
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const menuItems = ["Feed", "Profile", "Contact"];

//   return (
//     <Navbarr onMenuOpenChange={setIsMenuOpen}>

//       {/* LEFT - BRAND */}
//       <NavbarBrand>
//         <p className="font-bold text-inherit text-2xl">Circle</p>
//       </NavbarBrand>

//       {/* MOBILE TOGGLE */}
//       <NavbarMenuToggle
//         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         className="sm:hidden"
//       />

//       {/* CENTER - DESKTOP LINKS */}
//       <NavbarContent className="hidden sm:flex gap-6" justify="center">
//         {menuItems.map((item) => (
//           <NavbarItem key={item}>
//             <Link to={item}>
//               {item}
//             </Link>
//           </NavbarItem>
//         ))}
//       </NavbarContent>

//       {/* RIGHT - BUTTON */}
//       <NavbarContent justify="end">
//         {!isLogged ? <>
//           <NavbarItem>
//             <Button  className='bg-blue-400 rounded-lg text-white px-4 py-2' size="sm">
//               Login
//             </Button>
//           </NavbarItem>
//           <NavbarItem>
//             <Button  className='bg-green-400 rounded-lg text-white px-4 py-2' size="sm">
//               Signup
//             </Button>
//           </NavbarItem></> : <>
//           <NavbarItem>
//             <Button onClick={logout} className='bg-red-200 rounded-lg text-red-900 px-4 py-2' size="sm">
//               logout
//             </Button>
//           </NavbarItem>
//         </>}

//       </NavbarContent>

//       {/* MOBILE MENU */}
//       <NavbarMenu>
//         {menuItems.map((item) => (
//           <NavbarMenuItem key={item}>
//             <Link className="w-full block py-2 text-sm" to={item}>
//               {item}
//             </Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>

//     </Navbarr>
//   );
// }

