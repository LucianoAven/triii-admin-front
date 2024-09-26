import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Success } from 'components';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function VerificationSuccessBox({ successMsg, redirectLink }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Success msg={successMsg} />
      {redirectLink && (
        <Box
          display={'flex'}
          justifyContent="center"
          marginBottom={{ xs: 1, sm: 0 }}
        >
          <Typography style={{ display: 'flex', gap: 4 }} variant={'subtitle2'}>
            {t('signUp.youMay')}
            <Link
              component={'a'}
              color={'primary'}
              to={'/signin'}
              underline={'none'}
            >
              {t('global.login')}
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

VerificationSuccessBox.propTypes = {
  successMsg: PropTypes.string.isRequired,
  redirectLink: PropTypes.bool.isRequired,
};
