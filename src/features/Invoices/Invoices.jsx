import React, { useState, useContext } from 'react';
import {
  TabNavbar,
  AddressesTab,
  InvoicesTab,
} from './components';
import { StyleContext } from '../../style/styleProvider';
import { Box, Container } from '@mui/material';

export default function Invoices() {
  const [value, setValue] = useState(0);
  const { color, shadow } = useContext(StyleContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">

      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'85vh'}
        width={'100%'}
        boxShadow={shadow.base}
        bgcolor={color.gray[100]}
        className={'fadeinup'}
        borderRadius={4}
      >
        <TabNavbar value={value} handleChange={handleChange} />
        <AddressesTab value={value} />
        <InvoicesTab value={value} />
      </Box>
    </Container>
  );
}
