import React from 'react';
import { Avatar, Button, Box } from '@mui/material';

export default function AccountDemoSignedOut({ user, onSignOut }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar src={user.image} alt={user.name} />
      <Button color="inherit" onClick={onSignOut}>Sign Out</Button>
    </Box>
  );
}
