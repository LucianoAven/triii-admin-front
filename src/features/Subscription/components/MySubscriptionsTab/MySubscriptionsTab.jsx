import React from 'react';
import TabPanel from '../components/TabPanel';
import SubscriptionList from './components/SubscriptionList';

export default function MySubscriptionsTab({ value }) {
  return (
    <TabPanel value={value} index={0}>
      <SubscriptionList />
    </TabPanel>
  );
}
