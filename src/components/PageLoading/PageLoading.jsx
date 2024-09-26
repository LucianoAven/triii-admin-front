import React, { useContext } from 'react';
import { StyleContext } from 'style/styleProvider';
//redux
//components/ui
import { LinearProgress, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PageLoading = () => {
  const { color } = useContext(StyleContext);
  const {t} = useTranslation()
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: color.slate[700],
          marginBottom: 2,
        }}
      >
        {t('global.loading')}...
      </Typography>
      <LinearProgress sx={{ width: '20%' }} />
    </Box>
  );
};

export default PageLoading;
