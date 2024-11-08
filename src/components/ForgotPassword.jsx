import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    resetCode: "",
    newPassword: "",
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestCode = async (event) => {
    event.preventDefault();
    setErr("");
    setMessage("");
  
    try {
      const response = await axios.post(
        "http://localhost:8000/forgot-password/request",
        { email: formData.email } // Sending email as JSON
      );
  
      if (response.status === 200) {
        setMessage("Reset code sent to your email. Please check your inbox.");
        setToken(response.data.token); // Store the token returned by the server
        setStep(2); // Move to the next step
      }
    } catch (error) {
      handleError(error, "Failed to request reset code.");
    }
  };
  

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setErr("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/forgot-password/verify",
        {
          token, // Use the token received from the initial request
          reset_code: formData.resetCode,
          new_password: formData.newPassword,
        }
      );

      if (response.status === 200 && response.data.message) {
        setMessage(response.data.message || "Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      handleError(error, "Password reset failed.");
    }
  };

  const handleError = (error, defaultMessage) => {
    if (error.response) {
      setErr(error.response.data?.detail || defaultMessage);
    } else if (error.request) {
      setErr("No response from server. Please check your network.");
    } else {
      setErr(defaultMessage);
    }
    console.error(defaultMessage, error); // For debugging
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {step === 1 && (
          <Box component="form" onSubmit={handleRequestCode} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"
              autoComplete="email"
              onChange={handleInputChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Request Reset Code
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="resetCode"
              label="Reset Code"
              type="text"
              id="resetCode"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        )}

        {err && <Typography color="error">{err}</Typography>}
        {message && <Typography color="success.main">{message}</Typography>}
        <Button fullWidth onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
