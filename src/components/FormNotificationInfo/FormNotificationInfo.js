import React from 'react';
import PropTypes from 'prop-types';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Box from '@mui/material/Box';

//FormNotificationInfo component with infoMsg prop, used to
//"build" an info notification used as header in a form.

export default function FormNotificationInfo({ infoMsg }) {
  return (
    <Box display={'flex'} alignItems={'baseline'} mb={3}>
      <InfoRoundedIcon
        color={'info'}
        sx={{ fontSize: 16, marginRight: 1, float: 'left' }}
      />
      {infoMsg}
    </Box>
  );
}

FormNotificationInfo.propTypes = {
  infoMsg: PropTypes.string.isRequired,
};
