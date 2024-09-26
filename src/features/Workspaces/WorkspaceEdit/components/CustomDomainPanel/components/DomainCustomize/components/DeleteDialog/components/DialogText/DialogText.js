import React from 'react';
import { useTranslation } from 'react-i18next';
//components/ui
import { DialogItem } from './components';
import Box from '@mui/material/Box';

const DialogText = () => {
  const { t } = useTranslation();
  const items = [
    'edit.domain.dialog.subtitle1',
    'edit.domain.dialog.subtitle2',
    'edit.domain.dialog.subtitle3',
    'edit.domain.dialog.subtitle4',
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingX: 1,
        paddingY: 1.5,
        gap: 0.8,
        marginY: 1,
      }}
    >
      {items.map((item) => (
        <DialogItem text={t(item)} />
      ))}
    </Box>
  );
};

export default DialogText;
