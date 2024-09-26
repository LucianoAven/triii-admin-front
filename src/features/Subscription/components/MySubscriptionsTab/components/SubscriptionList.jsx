import React from 'react';
import Subscription from './components';
import subscriptionList from '../../../utils/subscriptions';
import { Box } from '@mui/material';

export default function SubscriptionList() {
  return (
    <Box
      maxHeight={{ md: '78vh', xl: '80vh' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: '1rem',
        overflowY: 'auto',
      }}
      paddingLeft={{ md: 5, lg: 7 }}
      paddingRight={{ md: 5, lg: 7 }}
      py={2}
    >
      {subscriptionList.map((subscription) => (
        <Subscription subscriptionData={subscription} key={subscription.id} />
      ))}
    </Box>
  );
}
