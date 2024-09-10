import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "97vh",
        maxHeight: "97vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        padding: " 0 !important", // Ensure there's no padding
        margin: " 0 !important", // Ensure there's no margin
      }}>
      <Typography sx={{ fontSize: [18, 24, 30] }} gutterBottom>
        404
      </Typography>
      <Typography sx={{ fontSize: [10, 12, 14] }} paragraph>
        Oops! The page you are looking for does not exist.
      </Typography>
      <PrimaryButton onClick={() => navigate("/")}>Go to Home</PrimaryButton>
    </Box>
  );
};

export default NotFound;
