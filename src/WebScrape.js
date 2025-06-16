// Updated WebScrape.js (2025‑06‑02)
// ──────────────────────────────────────────────────────────────────────────────
// • Veld‑selectie verwijderd; backend gebruikt hard‑coded 12‑kolommen template.
// • Sluit aan op bestaande project‑helpers: useApi, formatError, DownloadExcel,
//   BrandButton.
// • MUI‑layout blijft; één formulier + progress + download.

import React, { useState } from "react";
import { useApi } from "./loginapi/client";          // gedeelde axios‑instance
import formatError from "./components/formatError";  // fout‑formatter
import DownloadExcel from "./DownloadExcel";
import BrandButton from "./components/BrandButton";

import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Alert,
  LinearProgress,
  Paper,
} from "@mui/material";

export default function WebScrape() {
  const api = useApi();                // ① gedeelde, geauthenticeerde axios

  const [url, setUrl] = useState("");
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [items, setItems] = useState(0);

  // ────────────────────────────────────────────────────────────────────────────
  //   Form submit handler
  // ────────────────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimestamp("");
    setItems(0);

    try {
      const resp = await api.post("/api/scrape", {
        url,
        pages: Number(pages) || 1,
        // géén field_names → backend pakt standaard template
      });

      setTimestamp(resp.data.timestamp);
      setItems(resp.data.items);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Extract Data
      </Typography>

      {/* ───────────── Form ───────────── */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={20} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Listing‑URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              type="number"
              label="Pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              inputProps={{ min: 1, max: 50 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <BrandButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Scrape"}
            </BrandButton>
          </Grid>
        </Grid>
      </Box>

      {/* ───────────── Feedback ───────────── */}
      {loading && <LinearProgress sx={{ mt: 3 }} />}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* Download‑component toont knop + success‑bericht */}
      {!loading && timestamp && (
        <DownloadExcel timestamp={timestamp} items={items} />
      )}
    </Paper>
  );
}
