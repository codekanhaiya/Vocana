import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 40;
const ITEM_GAP = 8;

export default function CustomLanguageSelector({ label, value, onChange }) {
  const theme = useTheme();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isRendered, setIsRendered] = useState(false);

  const listRef = useRef(null);

  // Fetch languages from backend
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/languages");
        const langs = Object.entries(res.data).map(([code, label]) => ({
          code,
          label,
        }));
        langs.sort((a, b) => a.label.localeCompare(b.label));
        setLanguages(langs);

        const defaultIndex = langs.findIndex((lang) => lang.code === value);
        setSelectedIndex(defaultIndex !== -1 ? defaultIndex : null);
      } catch (err) {
        console.error("Error fetching languages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [value]);

  // Handle rendering delay for smooth spinner transition
  useEffect(() => {
    if (!loading && languages.length > 0) {
      const timer = setTimeout(() => {
        setIsRendered(true);
      }, 100); // slight delay
      return () => clearTimeout(timer);
    }
  }, [loading, languages]);

  return (
    <Paper
      elevation={4}
      sx={{
        width: 200,
        height: 250,
        p: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {label}
      </Typography>

      {loading || !isRendered ? (
        <CircularProgress size={28} sx={{ mt: 3 }} />
      ) : (
        <Box
          ref={listRef}
          sx={{
            height: ITEM_HEIGHT * 4,
            overflowY: "scroll",
            width: "100%",
            mt: 1,
            "&::-webkit-scrollbar": {
              width: "2px",
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.light,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          {languages.map((lang, i) => (
            <Typography
              key={lang.code}
              variant="body2"
              onClick={() => {
                setSelectedIndex(i);
                onChange({ target: { value: lang.code } });
              }}
              sx={{
                height: ITEM_HEIGHT,
                lineHeight: `${ITEM_HEIGHT}px`,
                pl: 1,
                my: `${ITEM_GAP / 2}px`,
                cursor: "pointer",
                fontWeight: i === selectedIndex ? "bold" : "normal",
                backgroundColor:
                  i === selectedIndex
                    ? theme.palette.action.selected
                    : "transparent",
                color:
                  i === selectedIndex
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                borderRadius: 1,
                textAlign: "left",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {lang.label}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
}
