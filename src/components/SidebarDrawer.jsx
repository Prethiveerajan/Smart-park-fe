import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineVideoCamera, AiOutlineUpload, AiOutlineInfoCircle } from "react-icons/ai";
import { FaParking } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function SidebarDrawer() {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 190,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 190,
            boxSizing: "border-box",
            [theme.breakpoints.down("md")]: {
              width: 150,
            },
            [theme.breakpoints.down("sm")]: {
              width: 120,
            },
          },
        }}
      >
        <Box sx={{ overflow: "auto", mt: 8 }}>
          <List>
            <Link to="/status">
              <ListItem key="ParkingStatus" disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <FaParking />
                  </ListItemIcon>
                  <ListItemText primary="Parking Status" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/select-video">
              <ListItem key="SelectVideo" disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <AiOutlineVideoCamera />
                  </ListItemIcon>
                  <ListItemText primary="Select Video" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/upload">
              <ListItem key="UploadVideo" disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <AiOutlineUpload />
                  </ListItemIcon>
                  <ListItemText primary="Upload Video" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/user">
              <ListItem key="UserInfo" disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <AiOutlineInfoCircle />
                  </ListItemIcon>
                  <ListItemText primary="User Info" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
