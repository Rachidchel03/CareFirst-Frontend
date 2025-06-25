// src/loginroutes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth
    ? children
    : <Navigate to="/login" replace />;
}
