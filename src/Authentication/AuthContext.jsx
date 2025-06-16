// Authentication/AuthContext.js (schets)
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext({ isAuth: false });

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  // ► luister op storage-events (andere tab) óf handmatig dispatch
  useEffect(() => {
    function onStorage() {
      setIsAuth(!!localStorage.getItem("token"));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthCtx.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
