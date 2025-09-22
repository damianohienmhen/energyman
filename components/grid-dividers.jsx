import { Box, Card, Typography, Stack, Divider, CardContent, Grid } from '@mui/material';
import TotalCostChart from "./TotalCostChart";

const Griddivider = () => {
  const reportStats = { reported: 908, handled: 48, finished: 860 };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* Overview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#1e3a8a", color: "white", height: "100%", width: 500}}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Stack direction="column" spacing={6} sx={{ mt: 2 }}>
                <Box>
                  <Typography>Site Installed</Typography>
                  <Typography variant="h5" fontWeight="bold">3,456</Typography>
                </Box>
                <Box>
                  <Typography>Total Charging</Typography>
                  <Typography variant="h5" fontWeight="bold">1,824 kWh</Typography>
                </Box>
                <Box>
                  <Typography>Power Used</Typography>
                  <Typography variant="h5" fontWeight="bold">1,002 kWh</Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />
              <Stack direction="row" spacing={6}>
                <Box>
                  <Typography>Avg Used</Typography>
                  <Typography>240 kWh/day</Typography>
                </Box>
                <Box>
                  <Typography>Avg Charged</Typography>
                  <Typography>298 kWh/day</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Cost Over Time */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%",  width: 500 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Cost Over Time
              </Typography>
              <TotalCostChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Device Monitoring (full width below) */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Monitoring
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography>Panel Bu Dewi</Typography>
                  <Typography variant="caption">Charged: 132 kWh | Used: 80 kWh</Typography>
                </Box>
                <Box>
                  <Typography>Panel Taman Pahlawan</Typography>
                  <Typography variant="caption">Charged: 240 kWh | Used: 189 kWh</Typography>
                </Box>
                <Box>
                  <Typography>Panel Pak Abdul</Typography>
                  <Typography variant="caption">Charged: 80 kWh | Used: 45 kWh</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Griddivider;
