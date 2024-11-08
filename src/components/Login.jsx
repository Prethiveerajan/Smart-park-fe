// import { React, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import CollapseItem from "./CollapseItem";

// const theme = createTheme();

// export default function Login({ setIsLoggedIn }) { // Accept setIsLoggedIn as a prop
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");

//     if (email === "prethiveerajan40@gmail.com" && password === "12345") {
//       localStorage.setItem("emailData", email);
//       localStorage.setItem("passwordData", password);
//       setIsLoggedIn(true); // Update login state
//       navigate("/"); // Redirect to the home page
//     } else {
//       setErr("Please Enter Correct Email or Password");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} validate="true" sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//           </Box>
//           {err && <CollapseItem err={err} />}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// Login.jsx
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: formData.email,
        password: formData.password,
      });
      
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("emailData", formData.email);
        setMessage("Login successful!");
        navigate("/");  // Redirect to home page after login
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code outside of 2xx range
        setErr(error.response.data?.detail || "An error occurred during login.");
      } else if (error.request) {
        // Request made but no response received
        setErr("No response from server. Please check your network.");
      } else {
        // Something happened in setting up the request
        setErr("An error occurred during login setup.");
      }
      console.error("Error details:", error);  // Log the error details for debugging
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          {err && <Typography color="error">{err}</Typography>}
          {message && <Typography color="success.main">{message}</Typography>}
          <Button fullWidth onClick={() => navigate("/register")}>Don't have an account? Register</Button>
          <Button fullWidth onClick={() => navigate("/forgot-password")}>Forgot Password?</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
