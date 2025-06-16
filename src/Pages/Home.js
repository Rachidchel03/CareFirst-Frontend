// src/pages/Home.js
import React from "react";
import { Box, Typography } from "@mui/material";
import BrandButton from "../components/BrandButton";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ maxWidth: 720, mx: "auto", textAlign: "center", mt: 8 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Welkom bij Care First
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Gebruik het dashboard om het Excel bestand te downloaden.
      </Typography>

      <BrandButton component={RouterLink} to="/scraper">
        Extract Data voor Excel Bestand
      </BrandButton>
    </Box>
  );
}
