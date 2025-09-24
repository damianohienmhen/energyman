import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import { Avatar, Box, Card, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

function Icongrid() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={4} md={3}>
        <Card sx={{ p: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Box>
              <Typography color="text.secondary" variant="caption">
                {t('New Accounts')}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                586,356
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: theme.spacing(3.5),
                height: theme.spacing(3.5),
                background: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              }}
            >
              <AccountBoxTwoToneIcon fontSize="inherit" />
            </Avatar>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.success.main,
                pr: 0.5,
              }}
            >
              <ArrowUpwardTwoToneIcon fontSize="inherit" sx={{ mr: 0.2 }} />
              16.5%
            </Typography>
            <Typography variant="caption" noWrap color="text.secondary">
              {t('increase this month')}
            </Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} lg={4} md={3}>
        <Card sx={{ p: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Box>
              <Typography color="text.secondary" variant="caption">
                {t('Sales')}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                23,684
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: theme.spacing(3.5),
                height: theme.spacing(3.5),
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              <AddAlertTwoToneIcon fontSize="inherit" />
            </Avatar>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.warning.main,
                pr: 0.5,
              }}
            >
              <CompareArrowsTwoToneIcon fontSize="inherit" sx={{ mr: 0.2 }} />
              0.5%
            </Typography>
            <Typography variant="caption" noWrap color="text.secondary">
              {t('compared to previous month')}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Icongrid;