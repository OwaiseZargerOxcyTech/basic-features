import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const userDetailLinkedInURL =
  import.meta.env.VITE_API_URL + "auth/user-details-linkedin";
const socialmediaSignupURL =
  import.meta.env.VITE_API_URL + "auth/socialmedia-register";
const redirectUrl = `${window.location.origin}/linkedin-callback`;

interface LinkedInCallbackProps {}

const LinkedInCallback: React.FC<LinkedInCallbackProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async (code: string | null) => {
    try {
      setLoading(true);
      const formData = {
        codeMatch: code,
        clientId: LINKEDIN_CLIENT_ID,
        clientSecret: LINKEDIN_CLIENT_SECRET,
        redirectUrl: redirectUrl,
      };
      const linkedInResponse = await axios.post(
        userDetailLinkedInURL,
        formData
      );
      const data = {
        username: linkedInResponse.data.email,
        email: linkedInResponse.data.email,
        full_name: linkedInResponse.data.name,
        first_name: linkedInResponse.data.given_name,
        last_name: linkedInResponse.data.family_name,
        logged_in_with: "linkedIn",
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
    if (code) getUserDetails(code);
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h2">Loading...</Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default memo(LinkedInCallback);
