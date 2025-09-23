"use client";

import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 🚪 Not logged in → redirect to login
      window.location.href = "/login";
    }
  }, []);

  const handleSignOut = async () => {
    try {
      // If your backend has a logout route, call it
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("❌ Sign out failed:", error.message);
    }
  };

  if (!user) return null; // prevent flicker before redirect

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Welcome, {user.email}</Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </Box>
  );
}
