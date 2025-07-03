import React from "react";
import { Box, Typography } from "@mui/material";
import HearingIcon from "@mui/icons-material/Hearing";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import "../styles/VoiceProcessor.css";

const VoiceProcessor = ({ isProcessing }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: {
          xs: "100%", // mobile
          sm: "70%", // tablets
          md: "50%", // laptops and up
        },
        minWidth: 200,
        py: 2,
        flexShrink: 0,
      }}
    >
      {/* Ear Icon (left side) */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <HearingIcon sx={{ fontSize: 40, color: "#58a6ff" }} />
      </Box>

      {/* Wave Animation or Idle State */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 40,
          overflow: "hidden",
        }}
      >
        {isProcessing ? (
          <div className="wave-container">
            {Array.from({ length: 15 }).map((_, idx) => (
              <span className="wave" key={idx}></span>
            ))}
          </div>
        ) : (
          <Typography color="text.secondary" variant="body2">
            Click to Start
          </Typography>
        )}
      </Box>

      {/* Speaker Icon (right side) */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <RecordVoiceOverIcon sx={{ fontSize: 40, color: "#58a6ff" }} />
      </Box>
    </Box>
  );
};

export default VoiceProcessor;
