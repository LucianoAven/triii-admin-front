import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../../style/styleProvider';
import { Date, StatusPill } from './components';
import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Payment({ pending }) {
  const { t } = useTranslation();
  const { mediaQuery, color, fontSize, buttonSize, shadow } =
    useContext(StyleContext);
  const height = mediaQuery.xl ? '25%' : '33%';
  const borderLeft = pending ? '8px solid #ef4444' : '8px solid #2dd4bf';

  return (
    <Box
      className="fadein"
      display={'flex'}
      alignItems={'center'}
      justifyContent="space-between"
      borderRadius="3px"
      border={'1px solid #e6e6e6'}
      borderLeft={borderLeft}
      px={3}
      py={2}
      bgcolor={color.neutral[50]}
      color={color.slate[600]}
      height={height}
      boxShadow={shadow.md}
    >
      <Box display={'flex'} flexDirection="column" style={{ gap: '7px' }}>
        <StatusPill pending={pending} />
        <Typography fontSize={fontSize.xl}>$1000,50</Typography>
      </Box>
      <Date text={t('subscription.period')} date="12/11/2021" />
      <Box display={'flex'} flexDirection="column" style={{ gap: '7px' }}>
        <Date text={t('subscription.expirationDate')} date="12/11/2021" />
        {pending && <Date text={t('subscription.paymentDate')} date="12/11/2021" />}
      </Box>
      <Button variant="outlined" size={buttonSize.responsive}>
        {t('global.download')}
      </Button>
    </Box>
  );
}

Payment.propTypes = {
  pending: PropTypes.bool.isRequired,
};
