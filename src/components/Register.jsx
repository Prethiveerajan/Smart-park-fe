// // Register.jsx
// import React, { useState } from "react";
// import { Button, TextField, Typography, Box, Container } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });
//   const [err, setErr] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErr(""); // Clear previous errors
//     setMessage(""); // Clear previous messages

//     try {
//       const response = await axios.post("/register", {
//         email: formData.email,
//         password: formData.password,
//         full_name: formData.name,
//       });
//       setMessage(response.data.message || "Registration successful!");
//       navigate("/login"); // Redirect to login page after successful registration
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setErr(error.response?.data?.detail || "An error occurred during registration.");
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <Typography component="h1" variant="h5">Register</Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="name"
//             label="Full Name"
//             type="text"
//             id="name"
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             onChange={handleInputChange}
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             onChange={handleInputChange}
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Register
//           </Button>
//           {err && <Typography color="error">{err}</Typography>}
//           {message && <Typography color="success.main">{message}</Typography>}
//           <Button fullWidth onClick={() => navigate("/login")}>Back to Login</Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
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
      const response = await axios.post("http://localhost:8000/register", {
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
      });
      setMessage(response.data.message || "Registration successful!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful registration
      }, 1000);
    } catch (error) {
      console.error("Error during registration:", error);
      // Safely extract error message without causing circular structure issues
      const errorMessage =
        error.response?.data?.detail || "An error occurred during registration.";
      setErr(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Full Name"
            type="text"
            id="name"
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
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
            Register
          </Button>
          {err && <Typography color="error">{err}</Typography>}
          {message && <Typography sx={{ color: "green" }}>{message}</Typography>}
          <Button fullWidth onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
