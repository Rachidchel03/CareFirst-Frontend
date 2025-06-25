// src/Authentication/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // 🚩 Start always as false
  const [isAuth, setIsAuth] = useState(false);

  // (Optional) If you want to auto‐login from a saved token:
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
  }, []);

  return (
    <AuthCtx.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
