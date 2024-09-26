import { Box } from '@mui/material';
import React from 'react';

export default function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      width={'100%'}
      height={'100%'}
      className="fadein"
      {...other}
    >
      {value === index && (
        <Box width={'100%'} height={'100%'}>
          {children}
        </Box>
      )}
    </Box>
  );
}
