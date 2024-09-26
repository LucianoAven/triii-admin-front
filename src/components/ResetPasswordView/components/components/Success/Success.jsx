import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

export default function Success() {
  const [grow, setGrow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setGrow(true);
  }, []);

  return (
    <Grow in={grow} unmountOnExit>
      <Box
        margin={'auto'}
        display="flex"
        justifyContent="center"
        alignItems={'center'}
        height={'30vh'}
        style={{ gap: '0.5rem' }}
      >
        <CheckCircleOutlineRoundedIcon
          sx={{ color: green[600], fontSize: 56 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 700, color: green[400] }}>
          {t('resetPasswordForm.success')}
        </Typography>
      </Box>
    </Grow>
  );
}
