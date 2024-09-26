import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerIcon({ isLoading }) {
  if (!isLoading) return null;

  return (
    <Spinner
      style={{
        height: '1.5rem',
        width: '1.5rem',
        fontSize: '12px',
      }}
      animation="border"
    />
  );
}

SpinnerIcon.propTypes = { isLoading: PropTypes.bool };

export default SpinnerIcon;
