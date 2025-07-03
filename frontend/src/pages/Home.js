import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import UserMenu from "../components/UserMenu";
import LanguageSelector from "../components/LanguageSelector";
import VoiceProcessor from "../components/VoiceProcessor";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#ffffff",
      secondary: "#8b949e",
    },
    primary: {
      main: "#58a6ff",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function Home() {
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [username, setUsername] = useState("User");

  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = (message, severity = "info") => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email || !localStorage.getItem("token")) {
      navigate("/"); // not logged in
    } else {
      // Extract part before @ and prefix with '@' (set email as username)
      const displayName = "@" + email.split("@")[0];
      setUsername(displayName);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/"; // reload and navigate to root
  };

  let recognition; // declare globally to stop it later

  const handleStart = () => {
    if (isProcessing) return; // Prevent double start

    if (!sourceLang || !targetLang) {
      showAlert("Please choose languages before translation.", "warning");
      return;
    }

    if (sourceLang === targetLang) {
      showAlert("Please choose different languages for translation.", "error");
      return;
    }

    setIsProcessing(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showAlert("Speech recognition not supported in this browser.", "error");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = sourceLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event) => {
      const spokenText = event.results[event.results.length - 1][0].transcript;
      console.log("🎤 Spoken input:", spokenText);

      try {
        const response = await fetch("http://localhost:8000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: spokenText,
            source_lang: sourceLang,
            target_lang: targetLang,
          }),
        });

        const data = await response.json();
        console.log("🔊 Translated output:", data.translated_text);

        const utterance = new SpeechSynthesisUtterance(data.translated_text);
        utterance.lang = targetLang;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        showAlert("Translation or speaker error.", "info");
        console.error("Translation or speaker error:", err);
      }
    };

    recognition.onerror = (event) => {
      showAlert("Mic error! please refresh the page.", "info");
      console.error("Mic error:", event.error);
      if (event.error === "not-allowed") {
        showAlert("Please allow microphone access.", "error");
      }
    };

    recognition.onend = () => {
      if (isProcessing) {
        recognition.start(); // restart listening loop
      }
    };

    recognition.start(); // start listening
  };

  const handleStop = () => {
    setIsProcessing(false);
    if (recognition) {
      recognition.stop();
    }
    window.speechSynthesis.cancel(); // stop speaker
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: { xs: 12, sm: 0 },
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Logo - Responsive and well spaced */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 8 },
            left: { xs: 8, sm: 16 },
            "& svg": {
              width: { xs: 30, sm: 40 },
              height: "auto",
            },
          }}
        >
          <Logo />
        </Box>

        {/* UserMenu - Responsive and well spaced */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 24 },
          }}
        >
          <UserMenu name={username} onLogout={handleLogout} />
        </Box>

        {/* Main content card */}
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            width: "100%",
            maxWidth: 750,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {/* Heading and subtext */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Welcome to Vocana
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Real-time voice translator between multiple languages.
          </Typography>

          {/* Language + Voice */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              // gap: 3,
              mb: 3,
            }}
          >
            <LanguageSelector
              label="From"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            />
            <VoiceProcessor isProcessing={isProcessing} />
            <LanguageSelector
              label="To"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            />
          </Box>

          {/* Instruction text */}
          <Typography
            variant="caption"
            color="text.secondary"
            mb={2}
            display="block"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
            }}
          >
            Start speaking and see the magic happen!
          </Typography>

          {/* Handler Button */}
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            width="100%"
            justifyContent="center"
          >
            {!isProcessing ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleStart}
                fullWidth={isMobile}
                size={isMobile ? "medium" : "large"}
              >
                Start Translation
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={handleStop}
                fullWidth={isMobile}
                size={isMobile ? "medium" : "large"}
              >
                Stop Translation
              </Button>
            )}
          </Stack>
        </Paper>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%", backgroundColor: "background.default" }}
          variant="outlined"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
