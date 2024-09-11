import React, { FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import {
  
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const signupURL = import.meta.env.VITE_API_URL + "auth/register";

  const navigate = useNavigate();

  const handleSigninRedirect = (): void => {
    navigate("/login");
  };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(signupURL, {
        username,
        email,
        password,
      });
      console.log(response.data);
      alert("Signup Successfully");
      navigate("/verify-user");
      // Clear the form fields
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (error) {
      console.error("There was an error registering the user:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8f7fa",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Box
        sx={{
          boxShadow: 1,
          bgcolor: "white",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "30%", xl: "30%" },
          borderRadius: 2,
          fontFamily: "'Ubuntu', sans-serif", // Matching font family with Login page
          p: 3,
        }}
      >
        <Typography variant="h5"
          sx={{
            p: "1rem",
            textAlign: "left",
            // fontSize: "1.625rem",
            fontWeight: "500",
            color: "#20C83C",
            mb: "-15px",
          }}
        >
          Create an account
        </Typography>
        <Typography
          sx={{
            p: "1rem",
            textAlign: "left",
            color: "#333533",
            fontSize: "18px",
            fontWeight: '500',
            mb: "-20px",
          }}
        >
          Welcome to Project App!
        </Typography>
        <Typography
          sx={{
            p: 2,
            fontSize: "13px",
            color: "grey",
            textAlign: "left",
          }}
        >
          Please sign-up to your account and explore
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2, mt: 2 }}>
            <Typography
              sx={{
                mb: "0.25rem",
                px: 2,
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(47, 43, 61, 0.78) !important",
              }}
            >
              Username
            </Typography>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              placeholder="john.doe"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
            />
            <Typography
              sx={{
                mt: "0.9rem",
                mb: "0.25rem",
                px: 2,
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(47, 43, 61, 0.78) !important",
              }}
            >
              Email
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              placeholder="johndoe@gmail.com"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
            />
            <Typography
              sx={{
                mt: "0.9rem",
                mb: "0.25rem",
                px: 2,
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(47, 43, 61, 0.78) !important",
              }}
            >
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              placeholder="Password"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem" }}
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
                mt: 1,
                px: 2,
                textAlign: "center",
              }}
            >
              <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
              <Typography
                sx={{
                  color: "rgba(47, 43, 61, 0.78) !important",
                  fontSize: 15,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                I agree to privacy policy & terms
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#20C83C !important",
                  width: "50%",
                  fontSize: "0.9375rem",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "2rem",
                }}
              >
                SIGN UP
              </Button>
            </Box>
          </Box>
        </form>
        <Box
          sx={{
            px: 4,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
         
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "black !important",
              fontSize: 14,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Already have an account?
            <Typography
              onClick={handleSigninRedirect}
              component="span"
              sx={{
                color: "#20C83C",
                ml: "0.5rem",
                fontSize: 14,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Sign in instead
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
