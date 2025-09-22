"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography } from "@mui/material";

// Leaflet marker fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Example data (Atlanta, GA)
const panelLocation = {
  lat: 33.7490,
  lng: -84.3880,
  label: "Solar Panel Array — Atlanta, GA",
  energy: "38.7 kWh",
};

// Custom solar panel icon
const solarIcon = new L.Icon({
  iconUrl: "/solar-marker.png", // 🔁 Make sure this image exists in your public folder
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function Page() {
  return (
    <Box sx={{ height: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
        Solar Panel Location
      </Typography>

      <MapContainer
        center={[panelLocation.lat, panelLocation.lng]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "90%", width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Default">
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Clouds">
            <TileLayer
              url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=0a774ffbcce0841b42578621e43b0591"
              attribution='Weather data © <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Precipitation">
            <TileLayer
              url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_API_KEY"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Temperature">
            <TileLayer
              url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_API_KEY"
            />
          </LayersControl.Overlay>
        </LayersControl>

        <Marker position={[panelLocation.lat, panelLocation.lng]} icon={solarIcon}>
          <Popup>
            <strong>{panelLocation.label}</strong>
            <br />
            Current Energy: <b>{panelLocation.energy}</b>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
