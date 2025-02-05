import { Facebook, Google } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, socialLogin } from "../../services/Api";
import Navbar from "../Navbar";
import banner from "./login3.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);
      if (data && data.user) {
        // Store all user data
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userEmail", data.user.email);
        sessionStorage.setItem("userName", data.user.name);
        sessionStorage.setItem("userRole", data.user.role);
        sessionStorage.setItem("userPhone", data.user.phone);

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/dealer");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setSnackbar({
        open: true,
        message: err.message || "Login failed. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const token = "social-auth-token"; // This should be obtained from the social login provider
      const data = await socialLogin(provider, token);
      console.log(`${provider} login successful:`, data);
      setSnackbar({
        open: true,
        message: `${provider} login successful!`,
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
      setSnackbar({
        open: true,
        message: `${provider} login failed. Please try again.`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Left side - Image with gradient overlay */}
        <Box
          sx={{
            width: "50%",
            position: "relative",
            display: { xs: "none", md: "block" },
            backgroundColor: "#003366",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={banner}
            alt="Happy customer with car keys"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,51,102,0.9) 0%, rgba(0,51,102,0) 100%)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              color: "white",
              fontWeight: 700,
              maxWidth: "80%",
            }}
          >
            Welcome Back to Tractor24
          </Typography>
        </Box>

        {/* Right side - Login form */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            bgcolor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            overflowY: "auto",
            py: 4,
          }}
        >
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 2,
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#003366",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Login
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    sx={{
                      color: "#003366",
                      fontWeight: 500,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 1,
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  variant={
                    formData.role === "customer" ? "contained" : "outlined"
                  }
                  onClick={() => setFormData({ ...formData, role: "customer" })}
                  sx={{
                    flex: 1,
                    bgcolor:
                      formData.role === "customer" ? "#003366" : "transparent",
                    "&:hover": {
                      bgcolor:
                        formData.role === "customer"
                          ? "#002244"
                          : "rgba(0,51,102,0.08)",
                    },
                  }}
                >
                  Customer
                </Button>
                <Button
                  variant={
                    formData.role === "dealer" ? "contained" : "outlined"
                  }
                  onClick={() => setFormData({ ...formData, role: "dealer" })}
                  sx={{
                    flex: 1,
                    bgcolor:
                      formData.role === "dealer" ? "#003366" : "transparent",
                    "&:hover": {
                      bgcolor:
                        formData.role === "dealer"
                          ? "#002244"
                          : "rgba(0,51,102,0.08)",
                    },
                  }}
                >
                  Dealer
                </Button>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 2,
                }}
              >
                Connect with
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => handleSocialLogin("facebook")}
                  sx={{
                    borderColor: "#1877F2",
                    color: "#1877F2",
                    "&:hover": {
                      borderColor: "#1877F2",
                      bgcolor: "rgba(24,119,242,0.08)",
                    },
                  }}
                >
                  Facebook
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => handleSocialLogin("google")}
                  sx={{
                    borderColor: "#DB4437",
                    color: "#DB4437",
                    "&:hover": {
                      borderColor: "#DB4437",
                      bgcolor: "rgba(219,68,55,0.08)",
                    },
                  }}
                >
                  Google
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    px: 2,
                  }}
                >
                  Or
                </Typography>
              </Divider>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#003366",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#003366",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#003366",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#003366",
                      },
                    },
                  }}
                />

                <Box sx={{ mt: 1, mb: 3 }}>
                  <Link
                    href="/forgot-password"
                    sx={{
                      color: "#003366",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mb: 3,
                    height: 48,
                    bgcolor: "#003366",
                    "&:hover": {
                      bgcolor: "#002244",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "#666" }}
                >
                  By logging in, you agree to the{" "}
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/auction-terms", { replace: true });
                    }}
                    sx={{
                      color: "#003366",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Auction Terms
                  </Link>
                  ,{" "}
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/privacy-policy", { replace: true });
                    }}
                    sx={{
                      color: "#003366",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Privacy Policy
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="/auction-terms"
                    sx={{
                      color: "#003366",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Auction Terms
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Container>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Login;
