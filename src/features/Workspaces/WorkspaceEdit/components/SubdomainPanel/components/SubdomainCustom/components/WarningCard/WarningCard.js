import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
//components/ui
import { StyleContext } from 'style/styleProvider';
import { WarningItem } from './components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const WarningCard = () => {
  const { color, fontSize, fontWeight } = useContext(StyleContext);
  const { t } = useTranslation();
  const items = [
    'edit.subdomain.warning1',
    'edit.subdomain.warning2',
    'edit.subdomain.warning3',
    'edit.subdomain.warning4',
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        bgcolor: color.red[200],
        border: `2px solid ${color.red[300]}`,
        borderRadius: '4px',
        paddingX: 2,
        paddingY: 2.5,
        gap: 0.8,
        marginY: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
        }}
      >
        {t('edit.subdomain.caution')}
      </Typography>
      {items.map((item) => (
        <WarningItem text={t(item)} />
      ))}
    </Box>
  );
};

export default WarningCard;
