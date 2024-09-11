import React from "react";
import { AppBar, IconButton, Toolbar, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarItems from "./NavbarItems";

interface MobileNavbarProps {
  isOpen: boolean;
  onToggleDrawer: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  onToggleDrawer,
  isOpen,
}) => {
  const handleToggle = (): void => {
    onToggleDrawer();
  };

  return (
    <AppBar
      sx={{
        bgcolor: "#FBF9F1",
        position: { xs: "relative", sm: "sticky" },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleToggle} size="large" disableRipple>
              <MenuIcon sx={{color:'grey'}}/>
            </IconButton>
            <Typography variant="h5" color="slategray" fontWeight="bold">
             
            </Typography>
          </Box>
          <Box>
            <NavbarItems isOpen={isOpen} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileNavbar;
