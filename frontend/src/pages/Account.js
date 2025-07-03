import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  createTheme,
  ThemeProvider,
  Link,
  Fade,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import Logo from "../components/Logo";

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
      link: "#1a1a1ade",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default function Account() {
  const [open, setOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      // Save to localStorage
      localStorage.setItem("token", "eJq3T94fP3a9kV1p"); // simulate auth
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      // Navigate and reload
      window.location.href = "/home";
    } else {
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          px: 2,
          py: 4,
          position: "relative",
          userSelect: "none",
        }}
      >
        <Logo />

        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 400,
            width: "100%",
            mx: 2,
            my: 4,
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3}>
            {isLogin ? "Welcome back" : "Create an account"}
          </Typography>

          <Divider
            sx={{
              my: 3,
              height: "2px",
              bgcolor: "primary.main",
              border: "none",
            }}
          />

          <Grid container spacing={2} direction="column">
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ borderColor: "#30363d", color: "#c9d1d9" }}
              >
                Continue with Google
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<MicrosoftIcon />}
                sx={{ borderColor: "#30363d", color: "#c9d1d9" }}
              >
                Continue with Microsoft
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{ borderColor: "#30363d", color: "#c9d1d9" }}
              >
                Continue with Apple
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "#30363d" }}>or</Divider>

          <Fade in timeout={400}>
            <Box>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Name"
                  variant="filled"
                  margin="normal"
                  InputProps={{ sx: { bgcolor: "#0d1117" } }}
                />
              )}
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="filled"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ sx: { bgcolor: "#0d1117" } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ sx: { bgcolor: "#0d1117" } }}
              />

              {isLogin ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Sign Up
                </Button>
              )}
            </Box>
          </Fade>

          <Typography textAlign="center" mt={2} color="text.secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              variant="text"
              onClick={() => setIsLogin((prev) => !prev)}
              sx={{ color: "#58a6ff" }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Button>
          </Typography>

          {/* Bottom Terms and Privacy */}
          <Typography
            textAlign="center"
            mt={4}
            variant="body2"
            color="text.secondary"
          >
            <Link
              href="#"
              underline="hover"
              color="primary.link"
              sx={{ mx: 0.5 }}
            >
              Terms of Use
            </Link>
            |
            <Link
              href="#"
              underline="hover"
              color="primary.link"
              sx={{ mx: 0.5 }}
            >
              Privacy Policy
            </Link>
          </Typography>
        </Paper>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "50% !important",
          transform: "translateY(-50%)",
        }}
      >
        <Alert severity="info" variant="outlined">
          Please enter both email and password !
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
