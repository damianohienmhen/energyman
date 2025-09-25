import {
    alpha,
    Avatar,
    Box,
    Card,
    Divider,
    Unstable_Grid2 as Grid,
    LinearProgress,
    Stack,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
  } from '@mui/material';
  import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
  import { useTranslation } from 'react-i18next';
  import StatusLabels from './statuslabels.jsx';
  
  const BoxChartWrapperText = styled(Box)(({ theme }) => ({
    position: 'relative',
    '.ChartText': {
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
      fontWeight: 700,
      position: 'absolute',
      height: '100px',
      width: '100px',
      fontSize: theme.typography.pxToRem(23),
      top: '50%',
      left: '50%',
      margin: '-65px 0 0 -50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }));
  const AvatarUnhappy = styled(Avatar)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
    fontSize: theme.typography.pxToRem(26),
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: `3px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    marginBottom: theme.spacing(0.5),
  }));
  const AvatarOk = styled(Avatar)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
    fontSize: theme.typography.pxToRem(26),
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: `3px solid ${theme.palette.warning.main}`,
    color: theme.palette.warning.main,
    marginBottom: theme.spacing(0.5),
  }));
  const AvatarHappy = styled(Avatar)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
    fontSize: theme.typography.pxToRem(26),
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: `3px solid ${theme.palette.success.main}`,
    color: theme.palette.success.main,
    marginBottom: theme.spacing(0.5),
  }));
  function DistChart() {
    const { t } = useTranslation();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const data = [
      {
        label: 'Energy Consumed',
        color: theme.palette.success.main,
        value: 60,
      },
      {
        label: 'Energy Sold',
        color: theme.palette.error.main,
        value: 40,
      },

    ];
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel = (params) => {
      const percent = params.value / TOTAL;
      return `${(percent * 100).toFixed(0)}%`;
    };
    return (
      <Card sx={{ width: 450}}>
        <Box
          p={{
            xs: 2,
            sm: 3,
          }} 
        >
        </Box>
        <Divider />
        <Box
          p={{
            xs: 2,
            sm: 3,
          }}
        >
          <BoxChartWrapperText
            display="flex"
            alignItems="center"
          >
            <div className="ChartText">
              <Typography
                variant="h5"
                fontWeight={600}
                align="center"
              >
               Total
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                align="center"
              >
                980 KW
              </Typography>
            </div>
            <PieChart
              series={[
                {
                  data,
                  innerRadius: 65,
                  paddingAngle: 5,
                  cornerRadius: 4,
                  startAngle: -180,
                  endAngle: 180,
                  arcLabel: getArcLabel,
                },
              ]}
              width={260}
              height={260}
              margin={{
                right: 0,
              }}
              slotProps={{
                legend: {
                  hidden: true,
                },
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: theme.palette.common.white,
                  fontWeight: 500,
                  fontSize: 14,
                },
              }}
            />
          </BoxChartWrapperText>
        </Box>
        <StatusLabels/>
      </Card>
    );
  }
  export default DistChart;
  