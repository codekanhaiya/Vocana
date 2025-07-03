import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserMenu = ({ name = "Kanhaiya", onLogout }) => (
  <Box
    sx={{
      position: "absolute",
      top: 20,
      right: 20,
      display: "flex",
      alignItems: "center",
      color: "text.primary",
    }}
  >
    <AccountCircleIcon sx={{ mr: 1, color: "#58a6ff" }} />
    <Typography sx={{ mr: 2, fontWeight: 500 }}>{name}</Typography>
    <IconButton
      onClick={onLogout}
      sx={{
        color: "#f87171",
        "&:hover": {
          color: "#dc2626",
        },
      }}
    >
      <LogoutIcon />
    </IconButton>
  </Box>
);

export default UserMenu;
