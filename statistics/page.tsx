"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid
} from "@mui/material";
import axios from "axios";
import Weather from "../components/weather.jsx";
import AccentIcon from "../components/accenticon.jsx";
import Budget from "../components/budget.jsx"

interface RowData {
  id: number;
  energy: number;
  unit_price: number;
  total_cost: number;
  timestamp: string;
}

export default function BasicTable() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:4000/energysales");

      const formattedData = response.data.energysold.map((item: any) => ({
        id: item.id,
        energy: item.energy,
        unit_price: item.unit_price,
        total_cost: item.total_cost,
        timestamp: new Date(item.timestamp).toLocaleDateString(),
      }));

      setRows(formattedData);
    } catch (error: any) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Left side: 4 cards in 2 rows (2 per row) */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ pb: 3}}>
            {/* Row 1: Cards 1 and 2 */}
                <AccentIcon/>
            </Grid>
            <Grid>
            {/* Row 2: Cards 3 and 4 */}
            <Grid container spacing={2} sx={{ pb: 3}}>
            {/* Row 1: Cards 1 and 2 */}
                <Budget/>
            </Grid>
           
          </Grid>
        </Grid>
       

        {/* Right side: Weather card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <CardContent>
              <Typography align="center" variant="h6" gutterBottom>
                7-Day Weather Forecast
              </Typography>
              <Weather />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}