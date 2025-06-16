// src/components/layout/BrandCard.jsx
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function BrandCard({ children, ...p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 6,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        {...p}
      >
        {children}
      </Paper>
    </motion.div>
  );
}
