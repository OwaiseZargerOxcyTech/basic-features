import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import React from "react";

// Styled Button component
const StyledButton = styled(Button)(({ disabled }) => ({
  backgroundColor: disabled ? "#b3b3b3" : "#33B548", // Gray background if disabled
  color: disabled ? "#666666" : "#ffffff", // Darker text color if disabled
  "&:hover": {
    backgroundColor: disabled ? "#b3b3b3" : "#6de881", // Same as background if disabled
  },
  "&:disabled": {
    cursor: "not-allowed", // Cursor change for disabled state
  },
}));

interface PrimaryButtonProps {
  loading?: boolean;
  disabled?:boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledButton
      size="medium"
      variant="contained"
      onClick={onClick}
      disabled={loading} // Disable the button when loading
      {...props}>
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </StyledButton>
  );
};

export default PrimaryButton;