import React, { memo, useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import BrushIcon from "@mui/icons-material/Brush";
import { style_classes } from "../calendar/data";
import EventColorBox from "./EventColorBox";

interface ColorPickerComponentProps {
  setSelectedClass: (colorClass: string) => void;
  selectedClass: string | null;
}

const ColorPickerComponent: React.FC<ColorPickerComponentProps> = ({
  setSelectedClass,
  selectedClass,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bgcolor, setBgColor] = useState<string>("#F5F5F5");
  const [color, setColor] = useState<string>("#1A1A1A");
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (selectedClass) {
      const selectedStyle = style_classes.find(
        (styleObject) => styleObject.color_class === selectedClass
      );

      if (selectedStyle) {
        setBgColor(selectedStyle.backgroundColor);
        setColor(selectedStyle.color);
      }
    } else {
      setBgColor("#F5F5F5");
      setColor("#1A1A1A");
    }
  }, [selectedClass]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hanldlePickClass = (
    colorClass: string,
    bgColor: string,
    color: string
  ) => {
    setBgColor(bgColor);
    setColor(color);
    setSelectedClass(colorClass);
    handleClose();
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        fullWidth
        sx={{
          color: color,
          backgroundColor: bgcolor,
          borderLeft: `6px solid ${color}`,
          border: "1px solid lightgrey",
          height: "40px",
          "&:hover": {
            backgroundColor: bgcolor,
            borderLeft: `6px solid ${color}`,
            border: "1px solid lightgrey",
          },
        }}
        startIcon={<BrushIcon />}>
        Choose Color
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Box
          sx={{
            p: 1,
            minWidth: "200px",
            maxWidth: "260px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignItems: "center",
            gap: 0.5,
          }}>
          {style_classes?.map((styleObject, index) => (
            <Box
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() =>
                hanldlePickClass(
                  styleObject.color_class,
                  styleObject.backgroundColor,
                  styleObject.color
                )
              }>
              <EventColorBox
                backgroundColor={styleObject.backgroundColor}
                color={styleObject.color}
              />
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default memo(ColorPickerComponent);
