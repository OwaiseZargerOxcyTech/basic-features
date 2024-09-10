import React, { FormEvent } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { InterestsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PrimaryButton from "../../common/PrimaryButton";

interface VerifyUserProps {}

const VerifyUser: React.FC<VerifyUserProps> = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const verifyURL = import.meta.env.VITE_API_URL + "auth/verify-email";

  const handleVerifyOTP = async (e: FormEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.post(verifyURL, {
        otp,
      });
      console.log(response.data);
      setOtp("");
      navigate("/login");
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
          Verify User
        </Typography>
        <Typography
          sx={{
            mb: 2,
            textAlign: "left",
            fontSize: "1rem",
            color: "#333533",
            fontFamily: "'Poppins', sans-serif",
          }}>
          Enter otp which is send to your email address.
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
            OTP
          </Typography>
          <TextField
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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
            <PrimaryButton loading={loading} onClick={handleVerifyOTP}>
              Verify
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyUser;
