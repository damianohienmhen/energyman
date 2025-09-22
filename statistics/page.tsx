"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from "axios";
import TotalCostChart from "../components/TotalCostChart.jsx";
import EnergySalesTable from "../components/EnergySalesTable.jsx";
import Weather from "../components/weather.jsx";

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
      const response = await axios.get("http://localhost:3000/energysales");

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
      <Grid container spacing={20}>
        {/* Left side: 4 cards in 2 rows (2 per row) */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* Row 1: Cards 1 and 2 */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Card 1</Typography>
                  <Typography>This is card 1 content.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Card 2</Typography>
                  <Typography>This is card 2 content.</Typography>
                </CardContent>
              </Card>
            </Grid>
            </Grid>
            <Grid>
            {/* Row 2: Cards 3 and 4 */}
            <Grid container spacing={2}>
            {/* Row 1: Cards 1 and 2 */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Card 3</Typography>
                  <Typography>This is card 3 content.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Card 4</Typography>
                  <Typography>This is card 4 content.</Typography>
                </CardContent>
              </Card>
            </Grid>
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
