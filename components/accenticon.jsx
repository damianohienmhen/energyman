import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import {
  alpha,
  Avatar,
  Box,
  Card,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import SolarPowerTwoToneIcon from '@mui/icons-material/SolarPowerTwoTone';
import { useTranslation } from 'react-i18next';

function AccentIcon() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={{
        xs: 2,
        sm: 3,
      }}
    >
      <Grid
        xs={12}
        lg={4}
        md={6}
      >
        <Card
          sx={{
            p: 2.5,
            background: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%) !important',
          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="subtitle2"
                fontWeight={500}
                textTransform="uppercase"
                sx={{
                  color: alpha(theme.palette.common.white, 0.7),
                }}
              >
                {t('Energy Generated')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.common.white,
                  marginRight: 2
                }}
                
              >
                500 KW
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: theme.spacing(5),
                height: theme.spacing(5),
                background: theme.palette.common.white,
                color: theme.palette.success.main,
              }}
            >
              <SolarPowerTwoToneIcon/>
            </Avatar>
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                display: 'flex',
                alignItems: 'center',
                pr: 0.5,
                color: theme.palette.success.main,
              }}
            >
              <ArrowUpwardTwoToneIcon
                fontSize="small"
                sx={{
                  mr: 0.2,
                }}
              />
              <span>16.5%</span>
            </Typography>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                color: alpha(theme.palette.common.white, 0.7),
              }}
            >
              {t('increase this month')}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid
        xs={12}
        lg={4}
        md={6}
      >
        <Card
          sx={{
            p: 2.5,
             background: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%) !important',
          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="subtitle2"
                fontWeight={500}
                textTransform="uppercase"
                sx={{
                  color: alpha(theme.palette.common.white, 0.7),
                  marginRight: 2
                }}
              >
                {t('Energy Sold')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.common.white,
                }}
              >
                200 KW
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: theme.spacing(5),
                height: theme.spacing(5),
                background: alpha(theme.palette.common.white, 0.2),
                color: theme.palette.common.white,
              }}
            >
              <TipsAndUpdatesRoundedIcon />
            </Avatar>
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                display: 'flex',
                alignItems: 'center',
                pr: 0.5,
                color: theme.palette.common.white,
              }}
            >
              <CompareArrowsTwoToneIcon
                fontSize="small"
                sx={{
                  mr: 0.2,
                }}
              />
              <span>0.5%</span>
            </Typography>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                color: alpha(theme.palette.common.white, 0.7),
              }}
            >
              {t('compared to previous month')}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
export default AccentIcon;