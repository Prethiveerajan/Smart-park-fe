import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("http://localhost:8000/forgot-password", { // Add your base URL
        email: formData.email,
        new_password: formData.newPassword,
      });
      
      // Check if the response has the expected data
      if (response.status === 200 && response.data.message) {
        setMessage(response.data.message || "Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);  // Redirect with delay for user to read message
      }
    } catch (error) {
      if (error.response) {
        // Error response from the server
        setErr(error.response.data?.detail || "An error occurred during password reset.");
      } else if (error.request) {
        // No response from the server
        setErr("No response from server. Please check your network.");
      } else {
        // General error
        setErr("An error occurred during password reset.");
      }
      console.error("Error during password reset:", error); // Log error for debugging
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Forgot Password</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Reset Password
          </Button>
          {err && <Typography color="error">{err}</Typography>}
          {message && <Typography color="success.main">{message}</Typography>}
          <Button fullWidth onClick={() => navigate("/login")}>Back to Login</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
