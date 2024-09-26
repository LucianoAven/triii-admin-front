import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

//Success component with grow-in transition
export default function Success({ msg }) {
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    setGrow(true);
  }, []);

  return (
    <Grow in={grow} unmountOnExit>
      <Box
        margin={'auto'}
        display="flex"
        justifyContent="center"
        alignItems={'center'}
        height={'30vh'}
        style={{ gap: '0.5rem' }}
      >
        <CheckCircleOutlineRoundedIcon
          sx={{ color: green[300], fontSize: 56 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 700, color: green[300] }}>
          {msg}
        </Typography>
      </Box>
    </Grow>
  );
}

Success.propTypes = {
  msg: PropTypes.string.isRequired,
};
