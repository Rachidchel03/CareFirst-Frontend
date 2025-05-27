import React, { useState } from "react";
import axios from "./api";
import { fetchBestemming } from "./api";
import DownloadExcel from "./DownloadExcel";

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

export default function WebScrape() {
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState(1);
  const [fields, setFields] = useState("");
  const [listings, setListings] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    setLoading(true);
    setError("");
    setListings([]);
    setTimestamp("");

    try {
      const fieldsArray = fields
        ? fields.split(",").map((f) => f.trim())
        : [];
      const resp = await axios.post("/api/scrape", {
        url,
        pages,
        fields: fieldsArray,
      });
      const container = resp.data.data;
      const ts = resp.data.timestamp;

      if (!container?.listings) {
        throw new Error("Server response malformed: no listings");
      }

      // enrich each listing with bestemmingsplan via frontend API call
      const enriched = await Promise.all(
        container.listings.map(async (item) => {
          const addr = item.Adress || item.address || item.adres || "";
          try {
            const ai = await fetchBestemming(addr);
            return { ...item, bestemmingsplan: ai.bestemming || [] };
          } catch {
            return { ...item, bestemmingsplan: [] };
          }
        })
      );

      setListings(enriched);
      setTimestamp(ts);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.detail || e.message || "Onbekende fout");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (rows) => {
    if (!rows.length) {
      return <Typography>No listings found.</Typography>;
    }
    const headers = Object.keys(rows[0]);
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
        <Table stickyHeader>
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
            {rows.map((item, i) => (
              <TableRow key={i} hover>
                {headers.map((h) => (
                  <TableCell key={h}>
                    {Array.isArray(item[h])
                      ? item[h].join(", ")
                      : h.toLowerCase() === "link"
                      ? (
                        <a
                          href={item[h]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item[h]}
                        </a>
                      )
                      : item[h]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Funda & Bestemmingsplan Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="URL"
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <TextField
          label="Pages"
          type="number"
          size="small"
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          sx={{ width: 100 }}
        />
        <TextField
          label="Fields (comma separated)"
          size="small"
          value={fields}
          onChange={(e) => setFields(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleScrape}
          disabled={loading}
          sx={{ width: 200 }}
        >
          {loading ? <CircularProgress size={24} /> : "Scrape & Enrich"}
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {listings.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Results
          </Typography>
          {renderTable(listings)}
          <Box sx={{ mt: 2 }}>
            <DownloadExcel timestamp={timestamp} />
          </Box>
        </>
      )}
    </Container>
  );
}
