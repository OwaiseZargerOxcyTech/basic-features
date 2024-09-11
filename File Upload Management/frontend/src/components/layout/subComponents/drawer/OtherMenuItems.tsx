import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  route: string;
}

const otherMenuItems: MenuItem[] = [
  {
    text: "Login",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/login",
  },
];

const OtherMenuItems: React.FC = () => {
  return (
    <>
      <Typography variant="body2" sx={{ fontSize: "1rem", color:'grey',fontFamily: "'Poppins', sans-serif"}}>
        Others
      </Typography>
      <List>
        {otherMenuItems.map((item) => (
          <ListItem key={item.text} sx={{ cursor: "pointer" }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link to={item.route} style={{ textDecoration: "none",color:'grey' }}>
              <ListItemText
                primary={<Typography variant="body2">{item.text}</Typography>}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OtherMenuItems;
