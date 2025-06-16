// src/components/ui/IceHoverIcon.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Wrap any SVG icon to give it:
 *  – default grey (#6E6E6E)
 *  – hover / focus ice-blue (#00CFFF) with soft glow
 *  – active state (e.g. current route) keeps the blue
 */
export default function IceHoverIcon({ active = false, size = 24, children }) {
  return (
    <motion.span
      initial={false}
      animate={{
        color: active ? "#00CFFF" : "#6E6E6E",
        filter: active ? "drop-shadow(0 0 6px rgba(0,207,255,.6))" : "none",
      }}
      whileHover={{
        color: "#00CFFF",
        filter: "drop-shadow(0 0 6px rgba(0,207,255,.6))",
      }}
      whileFocus={{
        color: "#00CFFF",
        filter: "drop-shadow(0 0 6px rgba(0,207,255,.6))",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 25 }}
      style={{ display: "flex", fontSize: size }}
    >
      {children}
    </motion.span>
  );
}
