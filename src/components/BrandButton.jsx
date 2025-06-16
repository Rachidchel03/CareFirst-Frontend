// src/components/ui/BrandButton.jsx
import { motion } from "framer-motion";
import { Button } from "@mui/material";

/**
 * Een MUI Button die:
 *  – zelf geanimeerd is (geen extra wrapper nodig)
 *  – altijd z’n ronde vorm behoudt
 *  – duidelijke focus-ring toont (a11y)
 */
export default function BrandButton({ children, sx = {}, ...rest }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 6px 12px rgba(0,0,0,.15)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      style={{
        display: "inline-block",
        borderRadius: 32,
        overflow: "hidden",          // <── masker voorkomt rechthoek-flash
      }}
    >
      <Button
        disableElevation
        {...rest}
        sx={{
          borderRadius: 32,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          background: "linear-gradient(90deg, #FF9D3C, #593BF7)",
          color: "#fff",
          transition: "background 0.3s",
          "&:hover": {
            background: "linear-gradient(90deg, #FFA84F, #695CFF)",
          },
          // nette focus-ring die óók rond is
          "&:focus-visible": {
            outline: "3px solid rgba(0,207,255,.65)",
            outlineOffset: 2,
          },
          // plus eventuele extra sx-prop die je meegeeft
          ...sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
}
