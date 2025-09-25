"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
interface DataItem {
  date: string;
  energy?: number;
}

export default function Page() {
  const [energyData, setEnergyData] = useState<DataItem[]>([]);
  const [filteredEnergyData, setFilteredEnergyData] = useState<DataItem[]>([]);
  const [energyFactor, setEnergyFactor] = useState<number>(0.5);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const handleEnergyFactorChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setEnergyFactor(newValue);
    }
  };
  
  const updateEnergyFactor = () => {
    setIsUpdating(true);
    axios
      .post("http://localhost:4000/update-energy-factor", { energy_factor: energyFactor })
      .then(() => {
        setUpdateMessage("Energy factor updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating energy factor:", error);
        setUpdateMessage("Failed to update energy factor.");
      })
      .finally(() => {
        setIsUpdating(false);
        setTimeout(() => setUpdateMessage(null), 3000);
      });
  };
  

  const fetchData = () => {
    axios
      .get("http://localhost:4000/energy")
      .then((response) => {
        const formattedData = response.data.energy.map((item: { timestamp: string; energy: number }) => ({
          date: new Date(item.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          energy: item.energy,
        }));
        setEnergyData(formattedData);
        setFilteredEnergyData(formattedData);
      })
      .catch((error) => console.error("Error fetching energy data:", error));
  };

  const filterByInterval = (data: DataItem[], interval: "week" | "month" | "year" | "all") => {
    if (interval === "all") return data;
    const now = new Date();
    const filterDate = new Date(now);
    if (interval === "week") filterDate.setDate(now.getDate() - 7);
    else if (interval === "month") filterDate.setMonth(now.getMonth() - 1);
    else if (interval === "year") filterDate.setFullYear(now.getFullYear() - 1);

    return data.filter((item) => new Date(`1970-01-01T${item.date}:00`) >= filterDate);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#fff", padding: 4 }}>
<Grid container spacing={4}>
  {/* Left: Image with header + weather icons */}
  <Grid item xs={12} md={8}>
    {/* Header Row */}
{/* Header Row with Weather Icons Inline */}
<Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ mb: 2 }} gap={4}>
  <Typography variant="h5" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
    Solar Panel — Atlanta, Georgia
  </Typography>

  <Stack direction="row" spacing={3}>
    <Stack direction="row" spacing={1} alignItems="center">
      <WbSunnyIcon sx={{ color: "#facc15" }} />
      <Typography variant="h6">87%</Typography>
    </Stack>
    <Stack direction="row" spacing={1} alignItems="center">
      <OpacityIcon sx={{ color: "#38bdf8" }} />
      <Typography variant="h6">70%</Typography>
    </Stack>
  </Stack>
</Box>


    {/* Image and Actual Conditions Side by Side */}
    <Box display="flex" flexDirection="row" gap={4}>
      {/* Solar Image */}
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#1e293b",
          flex: 1,
        }}
      >
        <CardMedia
          component="img"
          image="/solarfarm.jpg"
          alt="Solar Panel Layout"
          sx={{
            height: 400,
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Card>

      {/* Actual Conditions */}
      <Box
        sx={{
          backgroundColor: "#1e293b",
          borderRadius: 2,
          padding: 2,
          width: "35%",
          minWidth: 300,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Actual condition
        </Typography>
        <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mb: 2 }}>
          State up to 28/11/2022 23:04
        </Typography>

        <Stack spacing={2}>
          <Box sx={{ backgroundColor: "#0f172a", p: 2, borderRadius: 2 }}>
            <Typography sx={{ color: "#f87171", fontWeight: "bold" }}>
              [D1] Sudden energy loss
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              24% energy lost at 11:14 due to battery issues
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: "#0f172a", p: 2, borderRadius: 2 }}>
            <Typography sx={{ color: "#f87171", fontWeight: "bold" }}>
              [A1] Sudden energy loss
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              65% energy lost at 12:34 due to battery issues
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: "#0f172a", p: 2, borderRadius: 2 }}>
            <Typography sx={{ color: "#f87171", fontWeight: "bold" }}>
              [B8] Overheating
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
              Panel B8 reached 87°C at 16:38. Additional cooling required.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  </Grid>
</Grid>



      {/* Divider */}
      <Divider sx={{ my: 4, borderColor: "#334155" }} />

      <Box sx={{ mb: 4 }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
    Adjust Energy Factor
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Slider
      value={energyFactor}
      onChange={handleEnergyFactorChange}
      step={0.01}
      min={0}
      max={1}
      sx={{ width: 300 }}
    />
    <Typography variant="body1">{energyFactor.toFixed(2)}</Typography>
    <Button
      variant="contained"
      onClick={updateEnergyFactor}
      disabled={isUpdating}
    >
      Update
    </Button>
  </Box>

  {updateMessage && (
    <Typography variant="caption" sx={{ mt: 1, color: "#94a3b8" }}>
      {updateMessage}
    </Typography>
  )}
</Box>


      {/* Bottom: Energy Chart */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Generated Energy Performance
        </Typography>

        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="outlined" onClick={() => setFilteredEnergyData(filterByInterval(energyData, "week"))}>
            Last 7 Days
          </Button>
          <Button variant="outlined" onClick={() => setFilteredEnergyData(filterByInterval(energyData, "month"))}>
            Last Month
          </Button>
          <Button variant="outlined" onClick={() => setFilteredEnergyData(filterByInterval(energyData, "year"))}>
            Last Year
          </Button>
          <Button variant="outlined" onClick={() => setFilteredEnergyData(filterByInterval(energyData, "all"))}>
            All-to-Date
          </Button>
        </Stack>

        <Box sx={{ backgroundColor: "#1e293b", borderRadius: 2, padding: 2 }}>
          <LineChart width={1000} height={300} data={filteredEnergyData}>
            <Line type="monotone" dataKey="energy" stroke="#38bdf8" strokeWidth={2} />
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
}
