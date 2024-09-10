import React from "react";
import { AppBar, IconButton, Toolbar, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarItems from "./NavbarItems";

interface NavbarProps {
  isOpen: boolean;
  onToggleDrawer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDrawer, isOpen }) => {
  const handleToggle = (): void => {
    onToggleDrawer();
  };

  return (
    <AppBar
      sx={{
        bgcolor: "#f8f9fa",
        position: "sticky",
        boxShadow: 1, 
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleToggle} size="large" disableRipple>
            <MenuIcon sx={{ color: 'grey' }} />
          </IconButton>
          <Typography variant="h5" color="black" fontWeight="bold">
            {/* Add your title or logo here */}
          </Typography>
        </Box>

        <Box>
          <NavbarItems isOpen={isOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
