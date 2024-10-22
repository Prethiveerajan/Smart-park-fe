import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function User() {
  const getEmail = localStorage.getItem("emailData");
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 10,
        ml: 30,
        padding: 4,
        marginLeft: '240px', // Added margin to align with other components
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 1,
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Typography variant="h6">My Email: {getEmail}</Typography>
    </Box>
  );
}
