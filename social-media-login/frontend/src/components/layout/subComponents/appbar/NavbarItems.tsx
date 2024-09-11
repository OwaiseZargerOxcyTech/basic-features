import React from "react";
import { Box, IconButton, InputBase, Tooltip } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ProfileMenu from "./ProfileMenu";
import ProfileImg from "../../../../assets/images/profile.png";
import { GridSearchIcon } from "@mui/x-data-grid";

interface NavbarItemsProps {
  isOpen: boolean;
}

// eslint-disable-next-line no-empty-pattern
const NavbarItems: React.FC<NavbarItemsProps> = ({ }) => {
  const [anchorProfileEl, setAnchorProfileEl] =
    React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorProfileEl);

  const handleProfileClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = (): void => {
    setAnchorProfileEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        p: 1, // Padding for spacing
        backgroundColor: "#f8f9fa", // Background color for visibility
        borderRadius: 1, // Optional border radius
      }}
    >
      <Box
        sx={{
          flex: 1, // Allow search box to take available space
          maxWidth: 400, // Max width for the search box
          mr: 2, // Margin right for spacing
        }}
      >
        <InputBase
          sx={{
            width: "100%",
            py: 0.5,
            px: 1,
            bgcolor:'#f8f9fa',
            border: "1px solid #E0E0E0",
            borderRadius: 3,
            "& .MuiInputBase-input": {
              fontSize: "0.85rem",
            },
          }}
          placeholder="Search here…"
          endAdornment={<GridSearchIcon sx={{ color: "grey" }} />}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 2 }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Tooltip>

     

        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleProfileClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img
              src={ProfileImg}
              alt="Profile"
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          </IconButton>
        </Tooltip>

        <ProfileMenu
          anchorEl={anchorProfileEl}
          handleClose={handleProfileClose}
          open={open}
        />
      </Box>
    </Box>
  );
};

export default NavbarItems;
