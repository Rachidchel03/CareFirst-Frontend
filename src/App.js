// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  ThemeProvider, CssBaseline,
  AppBar, Toolbar, Typography, Box
} from "@mui/material";

import theme from "./theme";
import AnimatedHamburger from "./components/AnimatedHamburger";
import AnimatedDrawer    from "./components/AnimatedDrawer";

import { AuthProvider, useAuth } from "./Authentication/AuthContext";
import ProtectedRoute             from "./loginroutes/LoginRoute";

import Login     from "./Pages/Login";
import Home      from "./Pages/Home";
import WebScrape from "./WebScrape";
import LogoutButton      from "./components/LogoutButton";

function AppLayout() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuth } = useAuth();

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{
        background: theme.palette.background.default,
        color:      theme.palette.text.primary,
        borderBottom:`1px solid ${theme.palette.divider}`,
      }}>
        <Toolbar>
          <AnimatedHamburger
            open={menuOpen}
            toggle={() => setMenuOpen(o => !o)}
          />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
            Care First Dashboard
          </Typography>
          <LogoutButton /> 
        </Toolbar>
      </AppBar>

      {isAuth && (
        <AnimatedDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar/> {/* spacer */}

        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login/>}/>

          {/* All private pages */}
          <Route path="/home"    element={
            <ProtectedRoute><Home/></ProtectedRoute>
          }/>
          <Route path="/scraper" element={
            <ProtectedRoute><WebScrape/></ProtectedRoute>
          }/>

          {/* Redirect anything else to /login */}
          <Route path="/"  element={<Navigate to="/login" replace/>}/>
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <AuthProvider>
          <AppLayout/>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
