// ───────────────────────────────────────────────────────────
// src/App.js
// ───────────────────────────────────────────────────────────
import React from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import theme from "./theme";

/* layout */
import AnimatedHamburger from "./components/AnimatedHamburger";
import AnimatedDrawer from "./components/AnimatedDrawer";

/* auth */
import { AuthProvider, useAuth } from "./Authentication/AuthContext";
import ProtectedRoute from "./loginroutes/LoginRoute";

/* pages */
import Home from "./Pages/Home";
import WebScrape from "./WebScrape";
import Login from "./Pages/Login";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

/* ── Small util so we hide the drawer when user is logged-out ── */
function DrawerWrapper({ menuOpen, toggleMenu }) {
  const { isAuth } = useAuth();
  return isAuth ? (
    <AnimatedDrawer open={menuOpen} onClose={toggleMenu} />
  ) : null;
}

export default function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <AuthProvider>
          {/* ── AppBar ─────────────────────────────────────── */}
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Toolbar>
              <AnimatedHamburger open={menuOpen} toggle={toggleMenu} />
              <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
                Care First Dashboard
              </Typography>
            </Toolbar>
          </AppBar>

          {/* ── Drawer (only when authenticated) ──────────── */}
          <DrawerWrapper menuOpen={menuOpen} toggleMenu={toggleMenu} />

          {/* ── Routed content ────────────────────────────── */}
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar /> {/* spacer for AppBar height */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/scraper" element={
            <RequireAuth><WebScrape /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
