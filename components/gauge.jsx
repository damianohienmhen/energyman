import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Typography, Box } from '@mui/material';

const Gauge = ({ value, maxValue = 5000, label, unit = 'W', color = '#3e98c7' }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <Box textAlign="center" width={150}>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: color,
          trailColor: '#d6d6d6',
        })}
      >
        <Typography variant="h6" fontWeight={600}>
          {value} {unit}
        </Typography>
      </CircularProgressbarWithChildren>
      <Typography variant="subtitle2" mt={1}>
        {label}
      </Typography>
    </Box>
  );
};

export default Gauge;