// src/components/layout/AnimatedDrawer.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SidebarContent from "./SideBarContent";

/**
 * Props:
 *   open        – boolean: drawer zichtbaar
 *   onClose     – function: sluit-actie
 *   width       – px breedte (default 260)
 */
export default function AnimatedDrawer({ open, onClose, width = 260 }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── BACKDROP ─────────────────────────── */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#000",
              zIndex: 1190,
            }}
          />

          {/* ── SLIDING PANEL ───────────────────── */}
          <motion.aside
            initial={{ x: -width }}
            animate={{ x: 0 }}
            exit={{ x: -width }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width,
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              background: "#F7F7F9",
              zIndex: 1200,
              boxShadow: "2px 0 12px rgba(0,0,0,.08)",
              borderRight: "1px solid #EDEDED",
              overflowY: "auto",
            }}
          >
            {/* Close (X) button */}
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
              aria-label="Sluit navigatie"
            >
              <CloseIcon />
            </IconButton>

            {/* Sidebar-inhoud met tekst + sub-items */}
            <Box sx={{ pt: 9, px: 1 }}>
              <SidebarContent expanded onNavigate={onClose} />
            </Box>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
