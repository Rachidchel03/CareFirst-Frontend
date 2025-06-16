import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useApi } from "../loginapi/client";
import { useAuth } from "../Authentication/AuthContext";
import BrandButton from "../components/BrandButton";
import formatError from "../components/formatError";

export default function Login() {
  /* 1. Hooks binnen de component */
  const api = useApi();
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  /* 2. Local state */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  /* 3. Submit-handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resp = await api.post("/api/login", { username, password });
      localStorage.setItem("token", resp.data.token); // of resp.data.access_token
      setIsAuth(true);            // ↺ update AuthContext
      navigate("/home", { replace: true });
    } catch (err) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  };

  /* 4. UI */
  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ p: 4, width: 320 }}>
        <Typography variant="h6" mb={2}>Log in</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Gebruikersnaam"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Wachtwoord"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <BrandButton
            type="submit"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : "Inloggen"}
          </BrandButton>
        </form>
      </Paper>
    </Box>
  );
}
