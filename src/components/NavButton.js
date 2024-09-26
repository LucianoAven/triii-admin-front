import React from 'react';
import { Button, Box, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';


const NavButton = ({ onClick, color, children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { //eslint-disable-line
    defaultMatches: true,
  });
  
  return (
    <Box marginRight={{ xs: 1, sm: 2 }}>
      <Button
        onClick={onClick}
        variant={'outlined'}
        color={color}
        sx={{
          borderRadius: 2,
          minWidth: 'auto',
          padding: 0.5,
          borderColor: alpha(theme.palette.divider, 0.2),
          // fontSize: '1rem',
          fontSize: '13px',
          whiteSpace: 'pre',
          lineHeight: '1.25 !important' 
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

NavButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default NavButton;
