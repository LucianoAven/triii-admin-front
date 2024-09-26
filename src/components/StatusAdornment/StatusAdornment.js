import React, { useContext } from 'react';
import { StyleContext } from 'style/styleProvider';
import { Adornment } from './components';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

const StatusAdornment = ({ status, text }) => {
  const { fontSize } = useContext(StyleContext);

  const textAdornment = text ? (
    <Typography fontSize={fontSize.sm} marginRight={0.5}>
      {text}
    </Typography>
  ) : null;

  return (
    <InputAdornment position="end">
      {textAdornment}
      <div style={{ width: 30, display: 'flex', justifyContent: 'center' }}>
        <Adornment status={status} />
      </div>
    </InputAdornment>
  );
};

export default StatusAdornment;
