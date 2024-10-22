import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TbPointFilled } from "react-icons/tb";
import { useTheme } from "@mui/material/styles";

export default function About() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 10,
        ml: 30,
        mr: 5,
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
      
    </Box>
  );
}
