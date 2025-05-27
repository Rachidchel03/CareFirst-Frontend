// src/DownloadExcel.js
import React from "react"
import axios from "axios"
import { Button } from "@mui/material"

// ensure same baseURL
const API = process.env.REACT_APP_BACKEND_URL || ""
axios.defaults.baseURL = API

export default function DownloadExcel({ timestamp }) {
  const handleDownload = async () => {
    try {
      const resp = await axios.get(`/api/download-excel?timestamp=${timestamp}`, {
        responseType: "blob",
      })
      const blobUrl = window.URL.createObjectURL(new Blob([resp.data]))
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `data_${timestamp}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (e) {
      console.error("Download failed:", e)
    }
  }

  return (
    <Button variant="outlined" onClick={handleDownload} sx={{ mt: 2 }}>
      Download Excel
    </Button>
  )
}
