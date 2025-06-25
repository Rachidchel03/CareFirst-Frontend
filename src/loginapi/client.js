// src/api/client.js
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import React, { useState } from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,        // ← ensures cookies/auth headers are included
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useApi = () => api;
