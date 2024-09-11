import React, { FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Grid,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import {
 
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginURL = import.meta.env.VITE_API_URL + "auth/login";
  const navigate = useNavigate();

  const handleForgotPassword = (): void => {
    navigate("/forgot-password");
  };

  const handleCreateAccountRedirect = (): void => {
    navigate("/signup");
  };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post(loginURL, {
        email,
        password
      });
      console.log(response.data);
      navigate("/");
    }
    catch(err) {
      alert(`There was an error while login:${err}`);
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
          fontFamily: "'Ubuntu' sans-serif",
          p: 3,
        }}
      >
        <Typography variant="h5"
          sx={{
            p: "1rem",
            textAlign: "left",
            // fontSize: "1.605rem",
            fontWeight: "500",
            color: "#20C83C",
            mb: "-15px",
          }}
        >
          Sign in to account
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
          Please sign-in to your account and explore
        </Typography>
        <form onSubmit={handleLoginClick}>
          <Box sx={{ p: 1, mt: 2 }}>
            <Typography
              sx={{
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
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              
              placeholder="johndoe@gmail.com"
              sx={{ px: 2, width: "90%", fontSize: "0.675rem"}}
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
            fullWidth
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
            <Box sx={{ mt: 0, px: 1 }}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
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
                      color: "black !important",
                      fontSize: 14,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Remember Me
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    onClick={handleForgotPassword}
                    sx={{
                      color: "black",
                      fontSize: 14,
                      mr: 2,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
                LOGIN
              </Button>
            </Box>
            <Box
              sx={{
                px:1,
                mt: 2,
                mb: 3,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
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
                New on our platform?
                <Typography
                  onClick={handleCreateAccountRedirect}
                  component="span"
                  sx={{
                    color: "#20C83C",
                    ml: 1,
                    fontSize: 14,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Create an account
                </Typography>
              </Typography>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
