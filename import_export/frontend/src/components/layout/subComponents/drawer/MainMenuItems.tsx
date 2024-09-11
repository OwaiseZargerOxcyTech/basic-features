import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  CreditCardOutlined as CreditCardOutlinedIcon,
  DashboardCustomizeOutlined as DashboardCustomizeOutlinedIcon,
  MonitorHeartOutlined as MonitorHeartOutlinedIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  subMenuItems?: MenuItem[];
  route?: string;
}

const mainMenuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <DashboardCustomizeOutlinedIcon />,
    route: "/",
  },
  {
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/",
  },
  {
    text: "File Manager",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/download-data",
  },
  { text: "Item", icon: <CategoryIcon />, route: "/table" },
  {
    text: "Menu 1",
    icon: <AccountBalanceWalletOutlinedIcon />,
    route: "/",
    subMenuItems: [
      { text: "Sub menu 1", icon: <MonitorHeartOutlinedIcon /> },
      { text: "Sub menu 2", icon: <ReceiptLongOutlinedIcon /> },
      { text: "Sub menu 3", icon: <CreditCardOutlinedIcon /> },
    ],
  },
  {
    text: "Menu 2",
    icon: <MonitorHeartOutlinedIcon />,
    route: "/",
    subMenuItems: [
      { text: "Sub menu 1", icon: <ReceiptLongOutlinedIcon /> },
      { text: "Sub menu 2", icon: <MonitorHeartOutlinedIcon /> },
    ],
  },
];

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {item.subMenuItems ? (
        <Accordion
          expanded={expanded}
          onChange={handleClick}
          sx={{
            boxShadow: "none",
            color: "black",
            fontWeight: "bold",
            bgcolor:'#F5F5F8'
          }}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon sx={{ color: "grey"}}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ color: "grey"}}>
                  {item.text}
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'visible' }}>
            <List sx={{ mt: -3 }}>
              {item.subMenuItems.map((subItem, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={subItem.route || "#"}
                  sx={{
                    paddingLeft: 0,
                    boxShadow: "none",
                    textDecoration: "none",
                    color: "black",
                    
                  }}
                >
                  <ListItemIcon sx={{ color: "grey" }}>
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        style={{
                          color: "grey",
                          // fontFamily: "'Poppins', sans-serif",
                         
                        }}
                      >
                        {subItem.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItem
          component={Link}
          to={item.route || "#"}
          sx={{
            textDecoration: "none",
            color: "black",
          
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <ListItemIcon sx={{ color: "grey" }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                style={{ color: "grey", fontFamily: "'Poppins', sans-serif" }}
              >
                {item.text}
              </Typography>
            }
          />
        </ListItem>
      )}
    </>
  );
};

const MainMenu: React.FC = () => {
  return (
    <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <List>
        {mainMenuItems.map((item, index) => (
          <MenuItemComponent key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default MainMenu;
