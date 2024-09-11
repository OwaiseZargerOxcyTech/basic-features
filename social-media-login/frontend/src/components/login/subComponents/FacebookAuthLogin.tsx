import { Box, IconButton } from "@mui/material";
import React, { memo, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const socialmediaSignupURL =
  import.meta.env.VITE_API_URL + "auth/socialmedia-register";

interface FacebookAuthProps {
  clientId: string; // Define clientId as a prop with a string type
}

interface FacebookResponse {
  email: string;
  name: string;
  first_name: string;
  last_name: string;
}

const FacebookAuthLogin: React.FC<FacebookAuthProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); // Type for useState

  const fetchLogin = async (facebookResponse: FacebookResponse) => {
    try {
      setLoading(true);
      const userData = {
        email: facebookResponse.email,
        full_name: facebookResponse.name,
        first_name: facebookResponse.first_name,
        last_name: facebookResponse.last_name,
        logged_in_with: "Facebook",
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
      {!loading && (
        <LoginSocialFacebook
          appId={clientId}
          onResolve={(response: any) => {
            fetchLogin(response.data as FacebookResponse); // Ensure the response is casted to the expected type
          }}
          onReject={() => {
            toast.error("Facebook login failed");
          }}
        >
          <IconButton aria-label="facebook">
            <FacebookIcon />
          </IconButton>
        </LoginSocialFacebook>
      )}
    </Box>
  );
};

export default memo(FacebookAuthLogin);
