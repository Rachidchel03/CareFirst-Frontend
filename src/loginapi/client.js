// src/api/client.js
import axios from "axios";
import { useAuth } from "../Authentication/AuthContext";
import React, { useState } from "react";
/** axios instance with a dynamic Authorization header */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
});

export function useApi() {
  const { token } = useAuth();

  // attach / detach the header whenever the token changes
  React.useEffect(() => {
    if (token) {
      client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete client.defaults.headers.common.Authorization;
    }
  }, [token]);

  return client;
}
