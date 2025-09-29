"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CredentialsSignInPage from "./BrandingSignInPage";
import theme from "../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LayersIcon from "@mui/icons-material/Layers";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "account", title: "Account", icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  { segment: "sales", title: "Sales", icon: <MonetizationOnIcon /> },
  { segment: "statistics", title: "Statistics", icon: <BarChartIcon /> },
  { segment: "map", title: "Map", icon: <LayersIcon /> },
];

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const sessionTimer = useRef(null);

  // Load user + session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expiration = localStorage.getItem("sessionExpiration");

    if (storedUser && expiration) {
      const expiresAt = parseInt(expiration, 10);
      const now = Date.now();

      if (now < expiresAt) {
        setUser(JSON.parse(storedUser));
        startSessionTimer(expiresAt - now); // Continue session
      } else {
        handleLogout();
      }
    }
  }, []);

  // Clear caches
  const clearCaches = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();

      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }
    } catch (err) {
      console.warn("Error clearing caches:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      await clearCaches();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Expiration 1 hour ahead
    const expiresAt = Date.now() + 60 * 60 * 1000;
    localStorage.setItem("sessionExpiration", expiresAt.toString());

    startSessionTimer(60 * 60 * 1000);
    window.location.href = "/";
  };

  // Session timer
  const startSessionTimer = (timeout = 60 * 60 * 1000) => {
    if (sessionTimer.current) clearTimeout(sessionTimer.current);

    sessionTimer.current = setTimeout(() => {
      console.log("⏰ Session expired, logging out...");
      handleLogout();
    }, timeout);
  };

  // Reset session on user activity
  useEffect(() => {
    const resetTimer = () => {
      if (user) {
        const newExpiration = Date.now() + 60 * 60 * 1000;
        localStorage.setItem("sessionExpiration", newExpiration.toString());
        startSessionTimer(60 * 60 * 1000);
      }
    };

    window.addEventListener("click", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    return () => {
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
    };
  }, [user]);

  if (!user) return <CredentialsSignInPage onSuccess={handleAuthSuccess} />;

  return (
    <AppProvider
      theme={theme}
      navigation={NAVIGATION}
      branding={{
        title: "Grid",
        logo: <Box component="img" src="/yup.jpg" alt="Logo" sx={{ height: 40 }} />,
      }}
    >
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">My App</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Box style={{ padding: 16 }}>{children}</Box>
    </AppProvider>
  );
}
