"use client";

import React, { useState, useEffect } from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/logout", { method: "POST", credentials: "include" });
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    window.location.href = "/dashboard";
  };

  if (!user) return <CredentialsSignInPage onSuccess={handleAuthSuccess} />;

  return (
    <AppProvider
        theme={theme}
        navigation={NAVIGATION}
        branding={{
        title: "Grid",
        logo: <img src="/leaf.png" alt="Logo" style={{ height: 32 }} />, // ✅ Logo here
        }}
        >
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Box style={{ padding: 16 }}>
        {children}
      </Box>
    </AppProvider>
  );
}
