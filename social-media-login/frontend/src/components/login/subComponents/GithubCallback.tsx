import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
const userDetailGithubURL =
  import.meta.env.VITE_API_URL + "auth/user-details-github";
const socialmediaSignupURL =
  import.meta.env.VITE_API_URL + "auth/socialmedia-register";
const redirectUrl = `${window.location.origin}/github-callback`;

interface GithubCallbackProps {}

const GithubCallback: React.FC<GithubCallbackProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async (code: string | null) => {
    if (!code) return;

    try {
      setLoading(true);
      const formData = {
        codeMatch: code,
        clientId: GITHUB_CLIENT_ID, // Secure the client ID
        clientSecret: GITHUB_CLIENT_SECRET, // Secure the client secret
        redirectUrl: redirectUrl,
      };
      const githubResponse = await axios.post(userDetailGithubURL, formData);
      const userData = githubResponse.data.userData;
      const emailData = githubResponse.data.emailData;

      let first_name = userData.login;
      let last_name = "";
      if (userData.name) {
        const nameArr = userData.name.split(" ");
        first_name = nameArr[0];
        last_name = nameArr[1];
      }

      const email_address = emailData || "";

      const data = {
        username: userData.login,
        email: email_address,
        full_name: userData.name,
        first_name: first_name,
        last_name: last_name,
        logged_in_with: "GitHub",
        verified: "Y",
      };
      const response = await axios.post(socialmediaSignupURL, data);
      localStorage.setItem("token", response?.data?.token);
      toast.success(response?.data?.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    getUserDetails(code);
  }, []);

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={50} sx={{ color: "#F26624" }} />
        </Box>
      )}
    </Box>
  );
};

export default GithubCallback;
