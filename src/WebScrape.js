// src/WebScrape.js
import React, { useState } from 'react';
import axios from 'axios';
import DownloadExcel from './DownloadExcel';

// MUI Components
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
  Alert
} from '@mui/material';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
const WebScrape = () => {
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState(1);
  const [fields, setFields] = useState('');
  const [listings, setListings] = useState([]);           // flattened out
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScrape = async () => {
    setLoading(true);
    setError('');
    setListings([]);
    setTimestamp('');

    try {
      const res = await axios.post('/api/scrape', {
        url,
        pages,
        fields: fields
          ? fields.split(',').map(f => f.trim())
          : []
      });
      // Backend payload shape is { data: { listings: [...] }, timestamp }
      const payload = res.data;
      if (!payload.data || !Array.isArray(payload.data.listings)) {
        throw new Error('Server response malformed: no listings');
      }

      setListings(payload.data.listings);
      setTimestamp(payload.timestamp);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const renderTable = rows => {
    if (!rows.length) return <Typography>No listings found.</Typography>;
    const headers = Object.keys(rows[0]);
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 300, mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map(h => (
                <TableCell key={h} sx={{ backgroundColor: '#7E57C2', fontWeight: 'bold' }}>
                  {h.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, i) => (
              <TableRow key={i} hover>
                {headers.map(h => (
                  <TableCell key={h}>
                    {h.toLowerCase() === 'link'
                      ? <a href={item[h]} target="_blank" rel="noopener noreferrer">{item[h]}</a>
                      : Array.isArray(item[h])
                        ? item[h].join(', ')
                        : item[h]
                    }
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
        Funda Extraction & Bestemmingsplan
      </Typography>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <TextField
          label="URL"
          variant="outlined"
          size="small"
          fullWidth
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
        />
        <TextField
          label="Pages"
          type="number"
          variant="outlined"
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
          value={pages}
          onChange={e => setPages(Number(e.target.value))}
        />
        <TextField
          label="Fields (comma separated)"
          variant="outlined"
          size="small"
          fullWidth
          value={fields}
          onChange={e => setFields(e.target.value)}
          placeholder="price,location,link"
        />
        <Button
          variant="contained"
          onClick={handleScrape}
          disabled={loading}
          sx={{ width: 200 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Scrape & Plan ophalen'}
        </Button>
      </div>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!!listings.length && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>Results</Typography>
          {renderTable(listings)}
          <DownloadExcel timestamp={timestamp} />
        </>
      )}
    </Container>
  );
};

export default WebScrape;
