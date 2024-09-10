import { Menu } from "@mui/material";
import React from "react";
import ProfileMenuList from "./ProfileMenuList";

interface ProfileMenuProps {
  anchorEl: HTMLButtonElement | HTMLDivElement | HTMLAnchorElement | null;
  handleClose: () => void;
  open: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  handleClose,
  open,
}) => {
  return (  
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            px: 2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ProfileMenuList handleClose={handleClose} /> 
      </Menu>
    </>
  );
};

export default ProfileMenu;
