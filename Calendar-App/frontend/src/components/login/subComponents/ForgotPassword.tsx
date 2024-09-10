import React, { FormEvent } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PrimaryButton from "../../common/PrimaryButton";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const forgotURL = import.meta.env.VITE_API_URL + "auth/forgot-password";

  const handleSendResetLink = async (e: FormEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post(forgotURL, {
        email,
      });
      console.log(response.data);
      setEmail("");
      navigate("/reset-password");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
      }}>
      <Box
        sx={{
          backgroundColor: "white",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: { xs: 2, sm: 3, md: 4 },
        }}>
        <Typography
          sx={{
            mb: 3,
            textAlign: "center",
            fontSize: "1.625rem",
            fontWeight: "700",
            color: "#20C83C",
            fontFamily: "'Poppins', sans-serif",
          }}>
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
          }}>
          Forgot Password?
        </Typography>
        <Typography
          sx={{
            mb: 2,
            textAlign: "left",
            fontSize: "1rem",
            color: "#333533",
            fontFamily: "'Poppins', sans-serif",
          }}>
          Enter your email and we’ll send you instructions to reset your
          password.
        </Typography>

        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              mb: 1,
              textAlign: "left",
              fontSize: "0.8125rem",

              color: "#333533",
              fontFamily: "'Poppins', sans-serif",
            }}>
            Email
          </Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            placeholder="johndoe@gmail.com"
            fullWidth
            sx={{ mb: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mb: 3,
            }}>
            <PrimaryButton loading={loading} onClick={handleSendResetLink}>
              Send Reset Link
            </PrimaryButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}>
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
              }}>
              <ArrowBackIosIcon sx={{ fontSize: "0.75rem", mr: 0.5 }} />
              Back to login
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
