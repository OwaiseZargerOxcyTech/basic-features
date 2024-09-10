import React, { memo, ChangeEvent, FocusEvent } from "react"; // Import ChangeEvent and FocusEvent
import { InputLabel, Box, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface CustomMultilineTextFieldProps {
  name: string;
  label?: string;
  labelColor?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Change this type
  rows?: number;
  tourClass?: string;
  disabled?: boolean;
}

const CustomMultilineTextField: React.FC<CustomMultilineTextFieldProps> = ({
  name,
  label,
  labelColor,
  placeholder,
  required,
  value,
  onChange,
  rows,
  tourClass,
  disabled,
}) => {
  const theme: Theme = useTheme();

  return (
    <Box sx={{ textAlign: "left", height: "100%", width: "100%" }}>
      {label && (
        <InputLabel
          sx={{
            fontSize: "14px",
            color: labelColor || theme.palette.text.primary,
            marginBottom: "5px",
          }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      )}

      <textarea
        id="outlined-multiline-static"
        style={{
          padding: "16.5px 14px",
          borderRadius: "4px",
          fontSize: "16px",
          color: theme.palette.text.primary,
          fontFamily: "Roboto, sans-serif",
          width: "100%",
          border: `1px solid ${theme.palette.divider}`,
          outline: "none",
          resize: "vertical",
          marginTop: "5px",
          transition: "border-color 0.3s, box-shadow 0.3s",
          backgroundColor: disabled
            ? theme.palette.action.disabledBackground
            : "white",
          cursor: disabled ? "not-allowed" : "text",
        }}
        rows={rows || 4}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value || ""}
        onChange={onChange}
        className={tourClass}
        disabled={disabled}
        onFocus={(e: FocusEvent<HTMLTextAreaElement>) => {
          if (!disabled) {
            e.target.style.borderColor = theme.palette.primary.main;
            e.target.style.boxShadow = `0 0 0 2px ${theme.palette.primary.main}33`;
          }
        }}
        onBlur={(e: FocusEvent<HTMLTextAreaElement>) => {
          e.target.style.borderColor = theme.palette.divider;
          e.target.style.boxShadow = "none";
        }}
      />
    </Box>
  );
};

export default memo(CustomMultilineTextField);
