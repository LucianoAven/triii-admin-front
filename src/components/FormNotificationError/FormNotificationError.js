import React from 'react';
import PropTypes from 'prop-types';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

//FormNotificationError component with error props, used to
//"build" an error node to pass as a prop to the "Input" custom
//component or by itself.

export default function FormNotificationError({ errorMsg }) {
  return (
    <>
      <ErrorRoundedIcon
        color={'error'}
        sx={{ fontSize: 16, marginRight: 1, float: 'left' }}
      />
      {errorMsg}
    </>
  );
}

FormNotificationError.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};
