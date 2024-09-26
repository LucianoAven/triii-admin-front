import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../style/styleProvider';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import StatusBar from './components';

export default function Header() {
  const { t } = useTranslation();
  const { fontSize, color } = useContext(StyleContext);

  return (
    <Box height={'20%'}>
      <Box
        display={'flex'}
        borderBottom="1px solid #e5e7eb"
        alignItems="center"
        px={3}
        py={2}
        bgcolor={color.neutral[50]}
        borderRadius={4}
      >
        <Typography color={color.slate[800]} fontSize={fontSize.md}>
          {t('subscription.amountToBePaid')}
        </Typography>
      </Box>
      <StatusBar debt={true} />
    </Box>
  );
}
