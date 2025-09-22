import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import SnowmobileTwoToneIcon from '@mui/icons-material/SnowmobileTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';

import {
  Avatar,
  Box,
  Card,
  Typography,
  Grid
} from '@mui/material';

import { styled, useTheme, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  color: theme.palette.common.white,
  width: theme.spacing(5.5),
  height: theme.spacing(5.5),
}));

function StatBars() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [gaugeValue, setGaugeValue] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/recent-year-average-energy")
      .then((response) => {
        setGaugeValue(response.data.annual_average_energy);
      })
      .catch((error) => console.error("Error fetching gauge data:", error));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const cards = [
    {
      title: 'Energy',
      value: gaugeValue !== null ? `${gaugeValue}` : 'Loading...',
      icon: <ReceiptTwoToneIcon fontSize="small" />,
      change: '+36%',
      trendIcon: <ArrowDownwardTwoToneIcon sx={{ color: 'error.main' }} />,
      bg: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
      avatarBg: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    },
    {
      title: 'Reports',
      value: '987',
      icon: <SupportTwoToneIcon fontSize="small" />,
      change: '+65%',
      trendIcon: <ArrowUpwardTwoToneIcon sx={{ color: 'success.main' }} />,
      bg: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
      avatarBg: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    },
    {
      title: 'Customers',
      value: '17,865',
      icon: <YardTwoToneIcon fontSize="small" />,
      change: '+22%',
      trendIcon: <ArrowUpwardTwoToneIcon sx={{ color: theme.palette.common.white }} />,
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      avatarBg: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    },
    {
      title: 'Sales',
      value: '$65,489',
      icon: <SnowmobileTwoToneIcon fontSize="small" />,
      change: '-15.35%',
      trendIcon: <ArrowDownwardTwoToneIcon sx={{ color: theme.palette.warning.main }} />,
      bg: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
      avatarBg: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} lg={3}>
          <Card
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              background: `${card.bg} !important`,
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper sx={{ background: `${card.avatarBg} !important` }}>
                {card.icon}
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  color: alpha(theme.palette.common.white, 0.7),
                  fontWeight: 600,
                }}
                variant="h5"
              >
                {t(card.title)}
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ ml: -2, pt: 2, pb: 0.5 }}
            >
              {card.trendIcon}
              <Typography
                sx={{
                  pl: 1,
                  fontSize: theme.typography.pxToRem(35),
                  color: theme.palette.common.white,
                }}
                variant="h1"
              >
                {card.value}
              </Typography>
            </Box>

            <Typography
              align="center"
              variant="body1"
              sx={{ color: alpha(theme.palette.common.white, 0.5) }}
            >
              <b>{card.change}</b> last month
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatBars;
