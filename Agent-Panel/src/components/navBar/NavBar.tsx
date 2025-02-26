import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { Box, Slide, useScrollTrigger, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { InputAdornment, OutlinedInput } from "@mui/material";
import useThemeMode from "../../hooks/useThemeMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { AppBar } from "../../theme/ThemeComponents";
import DropMenuIcon from "./DropMenuIcon";
import SearchInput from "./SearchInput";

type NavBarProps = {
  open: boolean;
  handleDrawer: () => void;
};

const accountMenu = [
  {
    title: "Profile",
    icon: (
      <Avatar
        alt="Profile Picture"
        src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
        sx={{ width: 30, height: 30 }}
      />
    ),
  },
  
];

const NavBar = ({ open, handleDrawer }: NavBarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useThemeMode();
  const trigger = useScrollTrigger();
  const navigate = useNavigate(); // Hook for navigation

  const openSearchHandler = () => {
    setIsSearchOpen(true);
  };
  const closeSearchHandler = () => {
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("authToken"); // If using tokens
    sessionStorage.clear();
    
    console.log("User logged out successfully");
    
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  const handleMenuClick = (action: string) => {
    if (action === "logout") {
      // Clear authentication state (example: remove token from localStorage)
      localStorage.removeItem("authToken"); 
      sessionStorage.removeItem("authToken"); // If using sessionStorage
  
      // Redirect to login page
      window.location.href = "/login";
    }
  };
  

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar open={open} enableColorOnDark color="transparent">
        <Toolbar
          sx={{
            backgroundColor: `${theme.palette.background.default}`,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              mr: { xs: 0, sm: 5 },
              ml: { xs: 0, sm: "-12px" },
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box width="100%" sx={{ position: "relative", zIndex: 1 }}>
            <Slide
              direction="down"
              in={isSearchOpen}
              mountOnEnter
              unmountOnExit
            >
              <SearchInput closeSearchHandler={closeSearchHandler} />
            </Slide>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <OutlinedInput
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    ml: open ? 0 : "6px",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton size="small" type="button" color="inherit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Search"
                />
              </Box>

              <Box sx={{ display: { xs: "block", sm: "none" }, ml: 1 }}>
                <IconButton
                  onClick={openSearchHandler}
                  size="small"
                  type="button"
                  color="inherit"
                  sx={{ backgroundColor: theme.palette.background.paper }}
                >
                  <SearchIcon sx={{ fontSize: "22px" }} />
                </IconButton>
              </Box>

              <Box display="flex">
                <Tooltip
                  title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                >
                  <IconButton
                    onClick={colorMode?.toggleColorMode}
                    size="small"
                    color="inherit"
                    aria-controls="switch-mode"
                    aria-haspopup="true"
                  >
                    {theme.palette.mode === "dark" ? (
                      <DarkModeOutlinedIcon sx={{ fontSize: "22px" }} />
                    ) : (
                      <LightModeOutlinedIcon sx={{ fontSize: "22px" }} />
                    )}
                  </IconButton>
                </Tooltip>
                <DropMenuIcon
                  menuItems={accountMenu}
                  toolTip="Account settings"
                  id="account-menu"
                  mainIcon={
                    <Avatar
                      alt="Profile Picture"
                      src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      sx={{ width: 32, height: 32, mt: "-3px" }}
                    />
                  }
                  divider={false}
                  onMenuItemClick={handleMenuClick}
                />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default NavBar;
