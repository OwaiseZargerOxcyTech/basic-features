import { Box, Drawer, Typography } from "@mui/material";
import MainMenuItems from "./MainMenuItems";
import OtherMenuItems from "./OtherMenuItems";
import { Close } from "@mui/icons-material";
import Logo from "../../../../assets/images/logo.png";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const handleToggle = () => {
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "white",
          boxShadow: "none",
          borderRight: "1px solid #E0E0E0",
          px: "15px",
          scrollbarWidth: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Close
            onClick={handleToggle}
            sx={{ position: "absolute", right: 14, top: 14 }}
          />
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
           
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "60%", 
                height: "auto",
                marginRight:'1rem'
              }}
            />
          </Box>

          <MainMenuItems />
          <OtherMenuItems />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "20%",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.8rem"}}>
                gibberish
              </Typography>
              <Typography sx={{ fontSize: "0.7rem" }}>
                @2020 All Rights Reserved
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileSidebar;
