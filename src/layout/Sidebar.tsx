import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { IoMenuOutline } from "react-icons/io5";
import SidebarItems from "./SidebarItems";
import PropTypes from "prop-types";
// import { ILogo } from "../utils/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import Arrow from "assets/svg/arrowDown.svg?react";
import { useDispatch } from "react-redux";
// import picture from "assets/svg/user-icon.svg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { links } from "@/utils/sidebarLinks";
import { logout } from "@/features/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";
const drawerWidth = 150;

export default function DashboardSidebar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="z-30">
      <Toolbar>
        <Link to="/">
          <h1 className="font-semibold text-2xl">Propify</h1>
        </Link>
      </Toolbar>

      <List>
        {links.map((link, index) => {
          return <SidebarItems {...{ link }} key={index} />;
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        className="shadow-sm "
        position="fixed"
        sx={{
          background: "#fff",
          color: "#0B3140",
          boxShadow: "none",
          py: "0.2em",
          zIndex: 50,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <IoMenuOutline />
          </IconButton>

          <div className=" w-full">
            <div>
              <div className="flex items-center gap-5 justify-end">
                <IoIosNotificationsOutline size={30} />

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {user?.user_image ? (
                      <img
                        src={user?.user_image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <FaRegUserCircle />
                    )}

                    <span className="capitalize">
                      {user?.firstName} {user?.lastName}{" "}
                    </span>

                    <IoMdArrowDropdown
                      className={`cursor-pointer
                      ${dropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>

                        {/* Logout Link */}
                        <li>
                          <button
                            onClick={logoutUser}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* side navbar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          display: { xs: "none", md: "block" },
          flexShrink: { sm: 0 },
          "& .MuiDrawer-paper": {
            width: { sm: drawerWidth },
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            borderRight: "0px",
            borderColor: "#D7D7D7",
          },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "white",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* main content */}
      <Box
        className="text-start "
        component="main"
        sx={{
          flexGrow: 1,
          // pt: 15,
          // px: 3,
          // pb: 3,
          minHeight: "100vh",
          backgroundColor: "#F5F5F5",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}
DashboardSidebar.propTypes = {
  children: PropTypes.node,
};
