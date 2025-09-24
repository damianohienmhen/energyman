import React from "react";
import { Box, Typography } from "@mui/material";

const StatusLabels = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100%" // optional, ensures vertical centering if parent has height
    >
      <Box display="flex" gap={4} alignItems="center">
        {/* Active */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "green",
            }}
          />
          <Typography variant="body1">Energy Consumed</Typography>
        </Box>

        {/* Deactive */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          />
          <Typography variant="body1">Energy Sold</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusLabels;