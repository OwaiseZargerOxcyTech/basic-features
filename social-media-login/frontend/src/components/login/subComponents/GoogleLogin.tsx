import React, { memo, useState } from "react";
import { Box, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const socialmediaSignupURL = import.meta.env.VITE_API_URL + "auth/socialmedia-register";

interface GoogleLoginProps {}

const GoogleLogin: React.FC<GoogleLoginProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => fetchLogin(codeResponse),
    onError: () => {
      toast.error("Login Failed");
    },
  });

  const fetchLogin = async (user: TokenResponse) => {
    try {
      setLoading(true);
      const googleResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const userData = {
        email: googleResponse.data.email,
        full_name: googleResponse.data.name,
        first_name: googleResponse.data.given_name,
        last_name: googleResponse.data.family_name,
        logged_in_with: "Google",
        verified: "Y",
      };
      const response = await axios.post(socialmediaSignupURL, userData);
      localStorage.setItem("token", response?.data?.token);
      toast.success(response?.data?.message);
      navigate("/");     
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading ? null : (
        <IconButton aria-label="Google" onClick={() => login()}>
          <GoogleIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default memo(GoogleLogin);
