import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LinkIcon from "@mui/icons-material/Link";
import CancelIcon from "@mui/icons-material/Cancel";

interface CustomLinkFieldProps {
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onCancel: () => void | Promise<void>;
}
const CustomLinkField: React.FC<CustomLinkFieldProps> = ({
  value,
  onChange,
  placeholder,
  onCancel,
  ...props
}) => {
  return (
    <TextField
      {...props}
      value={value || ""}
      onChange={onChange}
      fullWidth
      placeholder={placeholder}
      margin="dense"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon style={{ fontSize: "1.2rem" }} />
          </InputAdornment>
        ),
        endAdornment: onCancel && (
          <InputAdornment
            position="end"
            onClick={onCancel}
            style={{ cursor: "pointer" }}>
            <CancelIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default memo(CustomLinkField);
