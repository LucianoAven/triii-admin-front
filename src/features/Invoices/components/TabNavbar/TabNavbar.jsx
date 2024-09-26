import React from 'react';
import TallTab from './components';
import { useTranslation } from 'react-i18next';
import {Box, Tabs} from '@mui/material';

export default function TabNavbar({ value, handleChange }) {
  const { t } = useTranslation();

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box bgcolor={'white'} borderRadius={'4px'}>
      <Tabs
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        aria-label=""
      >
        <TallTab label={t('subscription.invoices')} {...a11yProps(0)} />
        <TallTab label={t('subscription.addresses')} {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}
