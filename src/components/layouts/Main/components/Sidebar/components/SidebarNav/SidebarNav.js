import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import NavItem from './components/NavItem';

const SidebarNav = ({ pages }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const {
    landings: landingPages,
    contact: contactPages,
    modules: modulePages,
    functions: functionsPages,
  } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={mode === 'light' ? '/img/Trii.svg' : '/img/Trii.svg'}
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title={'home'} items={landingPages} />
        </Box>
        <Box>
          <NavItem title={'Modulos'} items={modulePages} />
        </Box>
        <Box display="none">
          <NavItem title={'Funciones'} items={functionsPages} />
        </Box>
        <Box>
          <NavItem title={'contact'} items={contactPages} />
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
