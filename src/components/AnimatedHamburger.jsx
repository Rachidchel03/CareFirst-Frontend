import React from "react";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

/** Animated icon that toggles between ≡  and  ×  */
export default function AnimatedHamburger({ open, toggle }) {
  return (
    <IconButton onClick={toggle} sx={{ ml: -1 }}>
      <motion.svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M3 6h18" },
            open:   { d: "M6 18L18 6" },
          }}
          stroke="#1C1C1E"
        />
        <Path
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M3 12h18", opacity: 1 },
            open:   { opacity: 0 },
          }}
          stroke="#1C1C1E"
        />
        <Path
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M3 18h18" },
            open:   { d: "M6 6l12 12" },
          }}
          stroke="#1C1C1E"
        />
      </motion.svg>
    </IconButton>
  );
}
