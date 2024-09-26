import React, { useContext } from 'react';
import PropTypes from 'prop-types';
//components/ui
import { StyleContext } from 'style/styleProvider';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DialogItem = ({ text }) => {
  const { color, fontSize } = useContext(StyleContext);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <ArrowForwardRoundedIcon
        sx={{
          marginTop: 0.3,
          fontSize: 'medium',
          marginRight: '0.5rem',
        }}
      />
      <Typography
        sx={{
          fontSize: fontSize.sm,
          color: color.slate[700],
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

DialogItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DialogItem;
