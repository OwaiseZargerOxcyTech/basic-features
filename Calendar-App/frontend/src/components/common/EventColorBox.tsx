import React, { memo } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";

interface EventColorBoxProps {
  backgroundColor?: string;
  color?: string;
  [key: string]: any;
}

const EventColorBox: React.FC<EventColorBoxProps> = ({
  backgroundColor,
  color,
  ...restProps
}) => {
  const boxStyles: SxProps<Theme> = {
    width: "30px",
    height: "30px",
    backgroundColor: backgroundColor || "pink",
    marginRight: "8px",
    borderLeft: `5px solid ${color || "red"}`,
    borderRadius: "5px",
  };

  return (
    <Box sx={boxStyles} {...restProps}>
      &nbsp;
    </Box>
  );
};

export default memo(EventColorBox);
