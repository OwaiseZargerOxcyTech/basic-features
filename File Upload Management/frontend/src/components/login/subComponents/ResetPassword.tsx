import React, { FormEvent } from "react";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Visibility, VisibilityOff} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const resetURL = import.meta.env.VITE_API_URL + "auth/reset-password";

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const resetPassword = async (e: FormEvent) => {
    try{
      e.preventDefault();
      const response = await axios.post(resetURL, {
        otp,
        newPassword
      });
      console.log(response.data);
      alert("Password has been reset successfully!!");
      navigate("/login");
    }
    catch (err) {
      alert(`Error: ${err}`);
    }
  }

  const handleLoginRedirect = (): void => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8f7fa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.625rem",
            fontWeight: "700",
            color: "#20C83C",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <InterestsOutlined sx={{ mr: 1, color: "#20C83C" }} />
          Project App
        </Typography>
        <Typography
          sx={{
            mb: 1,
            textAlign: "left",
            color: "#333533",
            fontSize: "1.25rem",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Reset Password
        </Typography>
        {/* <Typography
          sx={{
            mb: 2,
            textAlign: "left",
            fontSize: "1rem",
            color: "#333533",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Enter your email and we’ll send you instructions to reset your password.
        </Typography> */}
        <form onSubmit={resetPassword}>
          <Box sx={{p:1}}>
            <Typography
              sx={{
                mb: 1,
                textAlign: "left",
                fontSize: "0.8125rem",
              
                color: "#333533",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              OTP
            </Typography>
            <TextField
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              size="small"
              placeholder="otp"
              fullWidth
              sx={{ mb: 3 }}
            />
            <Typography
              sx={{
                mb: 1,
                textAlign: "left",
                fontSize: "0.8125rem",
              
                color: "#333533",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              New Password
            </Typography>
            <TextField
            fullWidth
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              size="small"
              placeholder="Password"
              sx={{ mb: 3}}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mb: 3,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                    backgroundColor: "#20C83C !important",
                    width: "auto",
                    fontSize: "14px",
                    color: "white",
                    borderRadius: "25px",
                    fontFamily: "'Poppins', sans-serif",
                }}
                >
                    Reset Password
              </Button>
            </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              onClick={handleLoginRedirect}
              sx={{
                color: "#20C83C",
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  cursor: "pointer",
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon sx={{ fontSize: "0.75rem", mr: 0.5 }} />
                Back to login
            </Typography>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
