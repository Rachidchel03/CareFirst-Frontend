// src/components/LogoutButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const handleLogout = () => {
    // 1) Remove the token
    localStorage.removeItem("token");
    // 2) Update your auth context
    setIsAuth(false);
    // 3) Send the user back to login
    navigate("/login", { replace: true });
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{ ml: "auto" }}    // pushes it to the far right in your Toolbar
    >
      Logout
    </Button>
  );
}
