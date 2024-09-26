import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../../style/styleProvider';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';

export default function StatusBar({ debt }) {
  const { t } = useTranslation();
  const { mediaQuery, fontSize, color } = useContext(StyleContext);
  const py = mediaQuery.md ? 1 : 1.5;
  const borderLeft = debt ? '8px solid #ef4444' : '8px solid #2dd4bf';
  const msg = debt
    ? t('subscription.outstandingBalance')
    : t('subscription.upToDateBalance');

  return (
    <Box
      display={'flex'}
      justifyContent="space-between"
      borderRadius="3px"
      borderLeft={borderLeft}
      borderBottom="1px solid #e5e7eb"
      px={3}
      py={py}
      bgcolor={color.neutral[50]}
    >
      <Typography fontSize={fontSize.xl}>{msg}</Typography>
      {debt && (
        <Typography fontSize={fontSize.xl}>
          {/* {debtData} */}
          $1000,50
        </Typography>
      )}
    </Box>
  );
}

StatusBar.propTypes = {
  debt: PropTypes.bool.isRequired,
};
