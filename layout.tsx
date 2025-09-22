<<<<<<< HEAD
=======
"use client";

import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LayersIcon from "@mui/icons-material/Layers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "../theme";
import BrandingSignInPage from "./components/BrandingSignInPage";
import '@/app/lib/i18n';
import 'leaflet/dist/leaflet.css';

interface User {
  name: string;
  email: string;
  image: string;
}

const NAVIGATION: Navigation = [
  { kind: "header", title: "Main items" },
  { segment: "", title: "Dashboard", icon: <DashboardIcon /> }, 
  { segment: "account", title: "Account", icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  { segment: "sales", title: "Sales", icon: <MonetizationOnIcon /> },
  { segment: "statistics", title: "Statistics", icon: <BarChartIcon /> },
  { segment: "map", title: "Map", icon: <LayersIcon /> },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  // Function to handle successful login
  const handleAuthSuccess = (userData: User) => {
    setUser(userData); // Set authenticated user state
  };

  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
      <AppProvider
          theme={theme}
          navigation={NAVIGATION}
          branding={{ title: "Grid" }}
          >
          {children}
      </AppProvider>
      </body>
    </html>
  );
}
>>>>>>> parent of c84ffc2 (Seperated local host 4000 & 3000, no authentication added yet)
