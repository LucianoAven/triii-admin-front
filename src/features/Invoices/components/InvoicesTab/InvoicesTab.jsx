import React from 'react';
import { Header, Body } from './components';
import TabPanel from '../components/TabPanel';
import {Box} from '@mui/material';

export default function InvoicesTab({ value }) {
  return (
    <TabPanel value={value} index={0}>
      <Box width={'100%'} height={'100%'} p={2}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          style={{ gap: 1.5 }}
          width={'100%'}
          height={'100%'}
          borderRadius={4}
        >
          <Header />
          <Body />
        </Box>
      </Box>
    </TabPanel>
  );
}
