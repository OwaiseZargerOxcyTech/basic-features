import React, { memo } from "react";
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const redirectUrl = `${window.location.origin}/linkedin-callback`;

interface LinkedInLoginProps {
  clientId: string; // Define clientId as a prop with a string type
}

const LinkedInLogin: React.FC<LinkedInLoginProps> = ({ clientId }) => {
  const linkedinRedirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=openid,profile,email`;

  const handleLinkedinLogin = () => {
    window.location.href = linkedinRedirectUrl;
  };

  return (
    <Box>
      <IconButton onClick={handleLinkedinLogin} aria-label="linkedIn">
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
};

export default memo(LinkedInLogin);
