import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ProfileForm from '../components/profile-form.jsx';
import ProfileStacked from '../components/profile-stacked'

function AccountPage() {
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <Box>
        <ProfileStacked/>
      </Box>
    </div>
  );
}

export default AccountPage;
