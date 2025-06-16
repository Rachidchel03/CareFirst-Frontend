import React from "react";
import client from "./api";   // ← use the same client!

import { Button } from "@mui/material";
import BrandButton from './components/BrandButton';
export default function DownloadExcel({ timestamp }) {
  const handleDownload = async () => {
    try {
      const resp = await client.get(`/api/download-excel`, {
        params: { timestamp },
        responseType: "blob",
      });
      const blobUrl = window.URL.createObjectURL(new Blob([resp.data]));
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `sorted_data_${timestamp}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  return (
    <BrandButton variant="outlined" onClick={handleDownload} sx={{ mt: 2 }}>
      Download Excel
    </BrandButton>
  );
}
