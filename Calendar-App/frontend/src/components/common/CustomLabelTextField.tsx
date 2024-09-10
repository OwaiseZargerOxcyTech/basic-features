import React, { memo } from "react";
import { TextField, InputLabel, Box, useTheme } from "@mui/material";

interface CustomLabelTextFieldProps {
  name: string;
  label?: string;
  labelColor?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  tourClass?: string;
}

const CustomLabelTextField: React.FC<CustomLabelTextFieldProps> = ({
  name,
  label,
  labelColor,
  placeholder,
  required,
  value,
  onChange,
  isDisabled,
  tourClass,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "left", width: "100%" }}>
      {label ? (
        <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      ) : null}

      <TextField
        placeholder={placeholder}
        // margin="dense"
        size="small"
        required={required}
        fullWidth
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={isDisabled}
        className={tourClass}
      />
    </Box>
  );
};

export default memo(CustomLabelTextField);
