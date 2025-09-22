import { Unstable_Grid2 as Grid } from '@mui/material';
import PlaceholderBox from './base/placeholder-box';

const Component = () => {
  return (

<Grid
xs={12}
lg={4}
container
spacing={{
  xs: 2,
  sm: 3,
}}
>
<Grid xs={12}>
  <PlaceholderBox
    height={128}
    title="2"
  />
</Grid>
<Grid
  xs={12}
  md={6}
  lg={12}
>
  <PlaceholderBox
    height={128}
    title="3"
  />
</Grid>
<Grid
  xs={12}
  md={6}
  lg={12}
>
  <PlaceholderBox
    height={128}
    title="4"
  />
</Grid>
 </Grid>
    );
};
export default Component;