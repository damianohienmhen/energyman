"use client";

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { membersList } from './application-ui/select/indicator-description/data';
import { AvatarState } from './base/styles/avatar';
import { MenuItemPrimaryAccent } from './base/styles/menu-item';
import { QuillEditor } from './base/styles/quill-editor';
import 'react-quill/dist/quill.snow.css';
import AvatarUploadSmall from './application-ui/upload/avatar/avatar-upload-small';
import ProfileCoverUpload from './application-ui/upload/profile-cover/profile-cover-upload';

const ProfileFormStacked = () => {
  const [selectedOptions, setSelectedOptions] = React.useState(['Bob Smith']);
  const handleChangeManager = (event) => {
    const value = event.target.value;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
<Grid container spacing={2} direction="column">
  <Grid item xs={12}>
    <Typography variant="h6" gutterBottom fontWeight={500}>
      Full name
    </Typography>
    <FormControl fullWidth size="small" variant="outlined" sx={{ mb: 2 }}>
      <OutlinedInput id="firstname-input" placeholder="First name" />
    </FormControl>
    <FormControl fullWidth size="small" variant="outlined">
      <OutlinedInput id="lastname-input" placeholder="Last name" />
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth size="small" variant="outlined">
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Email
      </Typography>
      <OutlinedInput
        type="email"
        id="email-input"
        placeholder="Write your email"
        startAdornment={
          <InputAdornment position="start">
            <MailOutlineRoundedIcon fontSize="small" />
          </InputAdornment>
        }
      />
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth size="small">
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Manager
      </Typography>
      <Select
        value={selectedOptions}
        onChange={handleChangeManager}
        inputProps={{ name: 'manager', id: 'manager-select' }}
        IconComponent={UnfoldMoreRoundedIcon}
      >
        {membersList.map((member) => (
          <MenuItemPrimaryAccent key={member.name} value={member.name}>
            <ListItemAvatar sx={{ minWidth: 38 }}>
              <AvatarState useShadow state="secondary" src={member.avatar} sx={{ width: 28, height: 28 }} />
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={member.detail} />
            {selectedOptions.includes(member.name) && <CheckRoundedIcon fontSize="small" />}
          </MenuItemPrimaryAccent>
        ))}
      </Select>
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth size="small">
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Bio
        <Typography variant="subtitle2" color="text.secondary">
          Write a short description for this profile
        </Typography>
      </Typography>
     
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <AvatarUploadSmall />
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth size="small" variant="outlined">
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Cover photo
        <Typography variant="subtitle2" color="text.secondary">
          Select the cover profile photo
        </Typography>
      </Typography>
      <ProfileCoverUpload />
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth size="small">
      <Typography variant="h6" gutterBottom fontWeight={500}>
        Noise suppression
        <Typography variant="subtitle2" color="text.secondary">
          Choose Low if you want others to hear music
        </Typography>
      </Typography>

      {/* ... noise suppression options */}
    </FormControl>
  </Grid>
</Grid>

  );
};

export default ProfileFormStacked;
