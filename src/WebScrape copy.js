// src/WebScrape.js
import React, { useState } from "react";
import { useApi } from "./loginapi//client";          // ① shared axios instance
import formatError from "./components/formatError";  // ② helper from earlier
import DownloadExcel from "./DownloadExcel";
import BrandButton from "./components/BrandButton";

/* ── MUI ─────────────────────────────────────── */
import {
  Container,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function WebScrape() {
  const api = useApi();              // ① -> JWT header is now attached
  const [url, setUrl]         = useState("");
  const [pages, setPages]     = useState(1);
  const [fields, setFields]   = useState("");
  const [listings, setList]   = useState([]);
  const [timestamp, setTs]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  /* ── SCRAPE HANDLER ────────────────────────── */
  const handleScrape = async () => {
    setLoading(true);
    setError("");
    setList([]);
    setTs("");

    const payload = {
      url,
      pages: Number(pages),
      fields: fields
        ? fields.split(",").map((f) => f.trim())
        : [],
    };

    try {
      const res = await api.post("/api/scrape", payload);

      // expected shape: { data: { listings: [...] }, timestamp }
      const { data, timestamp: ts } = res.data;
      if (!data?.listings || !Array.isArray(data.listings)) {
        throw new Error("Server response malformed: no listings");
      }

      setList(data.listings);
      setTs(ts);
    } catch (e) {
      console.error(e);
      setError(formatError(e));      // ② stringify validation errors
    } finally {
      setLoading(false);
    }
  };

  /* ── TABLE RENDER ──────────────────────────── */
  const TableView = () => {
    if (!listings.length) return <Typography>No listings found.</Typography>;
    const headers = Object.keys(listings[0]);

    return (
      <TableContainer component={Paper} sx={{ maxHeight: 300, mt: 2 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell
                  key={h}
                  sx={{ backgroundColor: "#7E57C2", fontWeight: "bold" }}
                >
                  {h.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {listings.map((row, i) => (
              <TableRow key={i} hover>
                {headers.map((h) => (
                  <TableCell key={h}>
                    {h.toLowerCase() === "link" ? (
                      <a
                        href={row[h]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row[h]}
                      </a>
                    ) : Array.isArray(row[h]) ? (
                      row[h].join(", ")
                    ) : (
                      row[h]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  /* ── JSX ───────────────────────────────────── */
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Care-First Dashboard
      </Typography>

      {/* FORM */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="URL"
          fullWidth
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.funda.nl/..."
        />
        <TextField
          label="Pages"
          type="number"
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <TextField
          label="Fields (comma separated)"
          fullWidth
          size="small"
          value={fields}
          onChange={(e) => setFields(e.target.value)}
          placeholder="price,location,link"
        />

        <BrandButton
          onClick={handleScrape}
          disabled={loading}
          sx={{ width: 200 }}
        >
          {loading ? <CircularProgress size={24} /> : "Data ophalen"}
        </BrandButton>
      </div>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!!listings.length && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Results
          </Typography>
          <TableView />
          <DownloadExcel timestamp={timestamp} />
        </>
      )}
    </Container>
  );
}
