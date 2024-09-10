import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

// Styled Button component for SecondaryButton
const StyledSecondaryButton = styled(Button)(({ disabled }) => ({
  minWidth:"100px",
  borderColor: disabled ? "#e0e0e0" : "#cccccc",
  color: disabled ? "#b0b0b0" : "#333333",
  borderWidth: "1px",
  borderStyle: "solid",
  backgroundColor: disabled ? "#f5f5f5" : "transparent",
  cursor: disabled ? "not-allowed" : "pointer",
  "&:hover": {
    borderColor: disabled ? "#e0e0e0" : "#b3b3b3",
    backgroundColor: disabled ? "#f5f5f5" : "#f0f0f0",
  },
  "&:disabled": {
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
    color: "#b0b0b0",
    cursor: "not-allowed",
  },
}));

interface SecondaryButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  children,
  disabled,
  loading,
  ...props
}) => {
  return (
    <StyledSecondaryButton
      size="medium"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </StyledSecondaryButton>
  );
};

export default SecondaryButton;
