import React, { useContext } from 'react';
import { StyleContext } from '../../../../../../../../../style/styleProvider';
import { useTranslation } from 'react-i18next';
import {Box} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Typography from '@mui/material/Typography';

export default function StatusPill({ pending }) {
  const { t } = useTranslation();
  const { mediaQuery, fontSize, color, fontWeight } = useContext(StyleContext);
  const subStatus = pending ? t('subscription.pending') : t('subscription.paid');
  const border = pending ? '2px solid #ef4444' : '2px solid #2dd4bf';
  const borderLeft = pending ? '31px solid #ef4444' : '31px solid #2dd4bf';
  const width = mediaQuery.md ? '140px' : '165px';

  return (
    <Box
      display={'flex'}
      fontWeight={fontWeight.medium}
      color={color.slate[800]}
      border={border}
      borderLeft={borderLeft}
      borderRadius="9999px"
      width={width}
    >
      {pending ? (
        <WarningAmberRoundedIcon
          fontSize={'small'}
          sx={{
            color: 'white',
            position: 'relative',
            right: '25px',
          }}
        />
      ) : (
        <CheckRoundedIcon
          fontSize={'small'}
          sx={{
            color: 'white',
            position: 'relative',
            right: '25px',
          }}
        />
      )}
      <Typography fontSize={fontSize.sm}>{subStatus}</Typography>
    </Box>
  );
}
