import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Box from '@mui/material/Box';

//FormNotificationSuccess component with successMsg prop, used to
//"build" a success notification used as header in a form.

export default function FormNotificationSuccess({ successMsg }) {
  return (
    <Box display={'flex'} alignItems={'baseline'} mb={3}>
      <CheckCircleOutlineRoundedIcon
        color={'success'}
        sx={{ fontSize: 16, marginRight: 1, float: 'left' }}
      />
      {successMsg}
    </Box>
  );
}

FormNotificationSuccess.propTypes = {
  successMsg: PropTypes.string.isRequired,
};
