import AirTwoToneIcon from '@mui/icons-material/AirTwoTone';
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import CloudTwoToneIcon from '@mui/icons-material/CloudTwoTone';
import GrainTwoToneIcon from '@mui/icons-material/GrainTwoTone';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import OpacityTwoToneIcon from '@mui/icons-material/OpacityTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import ThermostatAutoTwoToneIcon from '@mui/icons-material/ThermostatAutoTwoTone';
import WaterTwoToneIcon from '@mui/icons-material/WaterTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import {
  alpha,
  Box,
  Card,
  Divider,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { addDays, format } from 'date-fns';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useTranslation } from 'react-i18next';
import { ButtonLight } from './base/styles/button';

const WeatherBox = styled(Card)(() => ({
  background: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%) !important',
  overflow: 'hidden',
  position: 'relative',
}));
const WeatherBoxContent = styled(Box)(({ theme }) => ({
  zIndex: 5,
  position: 'relative',
  color: theme.palette.common.white,
}));
const TopBarImage = styled(Box)({
  backgroundSize: 'cover',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  opacity: 0.3,
});
const WeatherIcon = styled(Box)({
  height: 'auto',
  width: '100%',
  textAlign: 'center',
  img: {
    maxWidth: '158px',
  },
});
const BoxWeather = styled(Box)(({ theme }) => ({
  width: '100%',
  backdropFilter: 'blur(8px)',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));
const BoxWeatherSmall = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(8px)',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  '.MuiTypography-root': {
    color: theme.palette.common.white,
  },
  '.MuiTypography-caption': {
    fontSize: theme.typography.pxToRem(6),
    display: 'flex',
    color: alpha(theme.palette.common.white, 0.5),
    alignItems: 'center',
    '.MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
      marginRight: theme.spacing(0.5),
    },
  },
  '.MuiTypography-body2': {
    fontSize: theme.typography.pxToRem(6),
    lineHeight: 1.4,
  },
}));
const DividerWrapper = styled(Divider)(({ theme }) => ({
  borderColor: alpha(theme.palette.common.white, 0.1),
}));
const LinearHighLow = styled(Box)({
  height: '4px',
  width: '100%',
  borderRadius: '50px',
  background: 'linear-gradient(90deg, rgba(103,188,255,1) 0%, rgba(255,184,90,1) 100%)',
});
const LinearUv = styled(Box)(({ theme }) => ({
  height: '4px',
  width: '100%',
  borderRadius: '50px',
  position: 'relative',
  background:
    'linear-gradient(to right, #41ea55 0%,#f2f22e 25%,#ef8c2f 50%,#ff0c0c 75%,#ba0cff 100%)',
  ':after': {
    content: '" "',
    borderRadius: '50px',
    background: theme.palette.common.white,
    boxShadow: `0 0 0 2px ${theme.palette.common.black}`,
    position: 'absolute',
    left: '30%',
    top: '-2px',
    height: '8px',
    width: '8px',
  },
}));
function Weather() {
  const { t } = useTranslation();
  const theme = useTheme();
  const user = {
    name: 'Ethan Donovan',
  };
  const data = {
    percentage: 67,
  };
  return (
    <WeatherBox
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <TopBarImage
        sx={{
          backgroundImage: 'url("/placeholders/covers/automation-bg.jpg")',
        }}
      />
      <WeatherBoxContent>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
          }}
        >
   
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={5}
            display="flex"
            justifyContent="center"
          >
            <BoxWeather>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  xs={12}
                  sm={4}
                >
                  <WeatherIcon>
                    <img
                      src="/cloud.gif"
                      alt="Partly cloudy"
                    />
                  </WeatherIcon>
                </Grid>
                <Grid
                  xs={12}
                  sm={8}
                  sx={{
                    textAlign: {
                      xs: 'center',
                      sm: 'left',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 700,
                      fontSize: theme.typography.pxToRem(45),
                    }}
                    variant="body2"
                  >
                    17<sup>°</sup>
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      pt: 1,
                      pb: 0.5,
                    }}
                    variant="body3"
                  >
                    {t('Rain Shower')}
                  </Typography>
                  <Typography
                    fontWeight={400}
                    noWrap
                    variant="body5"
                  >
                    Today, {format(new Date(), 'MMM dd yyyy')}
                  </Typography>
                  </Box>
                  <Box
                    display="flex"
                    pt={2}
                    justifyContent={{
                      xs: 'center',
                      sm: 'flex-start',
                    }}
                    alignItems="center"
                  >
                    <MyLocationTwoToneIcon />
                    <Typography
                      sx={{
                        pl: 1,
                      }}
                      noWrap
                    >
                      Berlin, Germany
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <DividerWrapper
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography variant="body5">{t('Today')}</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <CloudTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    10<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    14<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body5"
                  >
                    {format(addDays(new Date(), 1), 'MMM dd')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <WbSunnyTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    10<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    21<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body5"
                  >
                    {format(addDays(new Date(), 2), 'MMM dd')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <GrainTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    13<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    18<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body5"
                  >
                    {format(addDays(new Date(), 3), 'MMM dd')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <AirTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    12<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    17<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body5"
                  >
                    {format(addDays(new Date(), 4), 'MMM dd')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <WbSunnyTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    12<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    16<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  my: 2,
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 65,
                  }}
                >
                  <Typography
                    fontWeight={400}
                    variant="body5"
                  >
                    {format(addDays(new Date(), 5), 'MMM dd')}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                >
                  <CloudTwoToneIcon />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(theme.palette.common.white, 0.5),
                    }}
                    variant="body5"
                  >
                    14<sup>°</sup>
                  </Typography>
                </Box>
                <Box
                  mx={1}
                  sx={{
                    width: '35%',
                  }}
                >
                  <LinearHighLow />
                </Box>
                <Box>
                  <Typography variant="body5">
                    23<sup>°</sup>
                  </Typography>
                </Box>
              </Stack>
              <DividerWrapper
                sx={{
                  mt: 2,
                  mb: 3,
                }}
              />
              <ButtonLight fullWidth>{t('View 10-day forecast')}</ButtonLight>
            </BoxWeather>
          </Grid>
        </Grid>
      </WeatherBoxContent>
    </WeatherBox>
  );
}
export default Weather;
