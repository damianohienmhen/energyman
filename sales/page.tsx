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
import TotalCostChart from "../components/TotalCostChart.jsx";
import EnergySalesTable from "../components/EnergySalesTable.jsx";
import DistChart from "../components/piechart.jsx"


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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <div style={{ width: "100%", padding: "20px" }}>
      <Box mb={4}>
        <TotalCostChart />
      </Box>

      {/* ROW WITH TWO CARDS SIDE BY SIDE ON LAPTOP */}
      <Grid container spacing={2}>
        {/* Left card (8/12 on medium+) */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Energy Sales
              </Typography>
              <Typography>
                This is the first card below the Energy Sales Cost chart.
              </Typography>
              <EnergySalesTable />
            </CardContent>
          </Card>
        </Grid>

        {/* Right card (4/12 on medium+) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography align="center" variant="h6" gutterBottom>
                Energy Sales - Generation Distribution
              </Typography>
              <DistChart/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}