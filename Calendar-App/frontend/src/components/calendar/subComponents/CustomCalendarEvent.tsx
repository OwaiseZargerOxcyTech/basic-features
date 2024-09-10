import { memo } from "react";
import { getCustomStyle } from "../getCustomStyle";
import { Box, Typography } from "@mui/material";

// Define the type for the event prop
interface Event {
  event_name?: string;
  event_color?: string;
}

// Define the type for the props of CustomCalendarEvent
interface CustomCalendarEventProps {
  event: Event;
}

const CustomCalendarEvent: React.FC<CustomCalendarEventProps> = ({ event }) => {
  const customStyle = getCustomStyle(event);
  return (
    <Box sx={{ ...customStyle, height: "100%" }}>
      <Typography
        component="h6"
        sx={{
          fontSize: "0.7rem",
          fontWeight: "500",
          color: "inherit",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
        {event?.event_name}
      </Typography>
    </Box>
  );
};

export default memo(CustomCalendarEvent);
