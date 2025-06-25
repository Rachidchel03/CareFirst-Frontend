// src/api/client.js
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import React, { useState } from "react";

const api = axios.create({
  baseURL:  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000", 
  headers: { "Content-Type": "application/json" },
  withCredentials: true,   // if you need cookies
});

// (Optional) attach the JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useApi = () => api;
