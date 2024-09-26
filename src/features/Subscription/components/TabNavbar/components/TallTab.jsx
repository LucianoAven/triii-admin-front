import { Tab } from '@mui/material';
import React from 'react';

export default function TallTab({ label, ...other }) {
  return (
    <Tab
      style={{
        paddingTop: 20,
        paddingBottom: 11,
      }}
      label={label}
      {...other}
    />
  );
}
