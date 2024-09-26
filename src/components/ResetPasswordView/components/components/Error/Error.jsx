import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// components/ui
import { Fade, Box } from '@mui/material';
import { FormNotificationError } from 'components';

const Error = ({ showError }) => {
  const { t } = useTranslation();
  const errorMsg =
    showError === 'LimitExceededException'
      ? t('error.limitExceeded')
      : t('error.changingPassword');
  console.log(showError);
  return (
    <Fade in={showError !== false}>
      <Box display={'flex'} color="red" alignItems={'center'} mb={3}>
        <FormNotificationError errorMsg={errorMsg} />
      </Box>
    </Fade>
  );
};

Error.propTypes = {
  showError: PropTypes.string.isRequired,
};

export default Error;
