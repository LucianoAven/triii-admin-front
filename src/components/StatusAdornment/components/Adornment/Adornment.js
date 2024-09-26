import React from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircularProgress from '@mui/material/CircularProgress';

const Adornment = ({ status }) => {
  switch (status) {
    case 'iddle':
      return null;
    case 'loading':
      return <CircularProgress size={20} />;
    case 'available':
      return <CheckRoundedIcon style={{ height: 27, width: 27 }} color="success" />;
    case 'unavailable':
      return <CloseRoundedIcon style={{ height: 27, width: 27 }} color="error" />;
    default:
      return null;
  }
};

export default Adornment;
