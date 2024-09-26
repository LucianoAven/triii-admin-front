import React, { useState, useContext } from 'react';
import { Header, Body } from './components';
import TabPanel from '../components/TabPanel';
import { StyleContext } from '../../../../style/styleProvider';
import { Box } from '@mui/material';

export default function AddressesTab({ value }) {
  const { shadow, color } = useContext(StyleContext);
  const [user, setUser] = useState({
    firstName: 'Ezequiel',
    lastName: 'Olivero',
    address: 'Estrada 939',
    cuit: '27394223108',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <TabPanel value={value} index={1}>
      <Box width={'100%'} height={'100%'} p={2}>
        <Box
          height={'100%'}
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          boxShadow={shadow.base}
          bgcolor={color.neutral[50]}
          borderRadius={4}
          color={color.slate[900]}
        >
          <Header
            isEditing={isEditing}
            handleEditButtonClick={handleEditButtonClick}
            handleSaveButtonClick={handleSaveButtonClick}
          />

          <Body
            isEditing={isEditing}
            user={user}
            handleInputChange={handleInputChange}
          />
        </Box>
      </Box>
    </TabPanel>
  );
}
