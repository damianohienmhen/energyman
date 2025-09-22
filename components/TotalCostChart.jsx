// components/TotalCostChart.jsx

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ElectricalServicesTwoToneIcon from '@mui/icons-material/ElectricalServicesTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import { ButtonIcon } from './base/styles/button-icon';
import EmptyStateImageTitle from './application-ui/empty-states/image-title/image-title';
import { useTranslation } from 'react-i18next';

const ElectricalServicesTwoToneIconWrapper = styled(ElectricalServicesTwoToneIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
  marginRight: theme.spacing(1),
}));

const TotalCostChart = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const actionRef = useRef(null);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState('Daily');
  const [openLocation, setOpenMenuLocation] = useState(false);

  const locations = [
    { value: 'daily', text: t('Daily') },
    { value: 'weekly', text: t('Weekly') },
    { value: 'monthly', text: t('Monthly') },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/energysales');
      const formattedData = response.data.energysold.map((item) => ({
        total_cost: item.total_cost,
        timestamp: new Date(item.timestamp),
      }));
      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const valueFormatter = (date) =>
    date.getHours() === 0
      ? date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
      : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const xAxisCommon = {
    data: rows.map((row) => row.timestamp),
    scaleType: 'time',
    valueFormatter,
  };

  const config = {
    series: [
      {
        data: rows.map((row) => row.total_cost),
        color: theme.palette.primary.main,
        showMark: false,
        area: true,
      },
    ],
    height: 100,
    sx: {
      '.MuiLineElement-root': {
        strokeWidth: 3,
        strokeOpacity: theme.palette.mode === 'dark' ? 0.8 : 1,
      },
      '.MuiAreaElement-root': {
        fillOpacity: theme.palette.mode === 'dark' ? 0.1 : 1,
      },
    },
    margin: {
      top: 24,
      bottom: 36,
      left: 24,
      right: 24,
    },
  };

  return (
    <>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            ref={actionRef}
            onClick={() => setOpenMenuLocation(true)}
            endIcon={<ExpandMoreTwoToneIcon />}
          >
            {location}
          </Button>
          <Tooltip title={t('Advanced statistics')} arrow>
            <ButtonIcon
              size="small"
              sx={{ ml: 1 }}
              color="secondary"
              variant="contained"
              startIcon={<KeyboardArrowRightTwoToneIcon />}
            />
          </Tooltip>
        </Box>
        <Menu
          disableScrollLock
          anchorEl={actionRef.current}
          onClose={() => setOpenMenuLocation(false)}
          open={openLocation}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {locations.map((_location) => (
            <MenuItem
              key={_location.value}
              onClick={() => {
                setLocation(_location.text);
                setOpenMenuLocation(false);
              }}
            >
              {_location.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Card>
        <Box
          display="flex"
          justifyContent="space-between"
          p={{ xs: 2, sm: 3 }}
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <ElectricalServicesTwoToneIconWrapper />
            <Typography variant="h5">{t('Sales Trend')}</Typography>
          </Box>
          <Typography fontWeight={700}>{t('Live Data')}</Typography>
        </Box>

        {location === 'Daily' && (
          <Box
            px={{ xs: 2, sm: 3 }}
            pb={{ xs: 2, sm: 3 }}
          >
            <LineChart
              xAxis={[
                { ...xAxisCommon, tickMinStep: 3600 * 1000 * 24 }, // Days
                { ...xAxisCommon, id: 'half days', tickMinStep: 3600 * 1000 * 12 }, // 12 hours
              ]}
              {...config}
            />
          </Box>
        )}

        {(location === 'Weekly' || location === 'Monthly') && (
          <Container maxWidth="xs">
            <Box p={{ xs: 2, sm: 3 }}>
              <EmptyStateImageTitle />
            </Box>
          </Container>
        )}
      </Card>
    </>
  );
};

export default TotalCostChart;
