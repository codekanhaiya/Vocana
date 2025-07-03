import React from "react";
import { Box, Typography } from "@mui/material";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";

const Logo = () => (
  <Box
    sx={{
      position: "absolute",
      top: 20,
      left: 20,
      display: "flex",
      alignItems: "center",
      color: "primary.main",
      fontWeight: 600,
    }}
  >
    <InterpreterModeIcon sx={{ mr: 1 }} />
    <Typography variant="h6">Vocana</Typography>
  </Box>
);

export default Logo;
