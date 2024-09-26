import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { NavItem } from './components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIcon } from 'ReduxToolkit/features/iconNavSlice';

const Topbar = ({ onSidebarOpen, pages, colorInvert = false }) => {
  const theme = useTheme();
  // const { mode } = theme.palette;
  const {
    landings: landingPages,
    contact: contactPages,
    modules: modulePages,
    functions: functionsPages,
  } = pages;

  const iconNav = useSelector(selectIcon); //eslint-disable-line
  // console.log('icon', iconNav);

  const { t } = useTranslation();

  let location = useLocation();

  const [pathName, setPathName] = useState('');

  const iconoDesdeLocation = useCallback(() => {
    let locNav= location.pathname;
    locNav === ''
      ? setPathName('/img/Trii.svg')
      : locNav === '/modulos/triichat'
        ? setPathName('/img/triiModules/TriiChat.svg')
        : locNav === '/modulos/triimarketing'
          ? setPathName('/img/triiModules/TriiMarketing.svg')
          : locNav === '/modulos/triiticket'
            ? setPathName('/img/triiModules/TriiTickets.svg')
            : locNav === '/modulos/triiservice'
              ? setPathName('/img/triiModules/TriiService.svg')
              : locNav === '/modulos/triicobranzas'
                ? setPathName('/img/triiModules/TriiCobranzas.svg')
                : locNav === '/modulos/triillamadas'
                  ? setPathName('/img/triiModules/TriiCall.svg')
                  : locNav === '/modulos/triicontactos'
                    ? setPathName('/img/triiModules/TriiContacts.svg')
                    : locNav === '/modulos/triiteam'
                      ? setPathName('/img/triiModules/TriiTeam.svg')
                      : setPathName('/img/Trii.svg');
  },[location.pathname]);

  useEffect(() => {
    iconoDesdeLocation();
    // iconNav.map((item) =>
    //   location.pathname === item.module
    //     ? setPathName(item.icon)
    //      : setPathName('/img/Trii.svg'),
    // );
  }, [pathName,location, iconoDesdeLocation]); 
  // useEffect(() => {
  //   let locationName = location.pathname;
  //   iconNav.map((item) =>
  //     locationName === item.module
  //       ? console.log('item', item)
  //       : console.log('item2', 'trii'),
  //   );
  // }, []);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        width={{ xs: 100, md: 120 }}
        sx={{
          textDecoration: 'none',
          alignItems: 'center',
        }}
      >
        <Box
          component={'img'}
          // src={
          //   pathName === ''
          //     ? '/img/Trii.svg'
          //     : pathName === '/modulos/triichat'
          //       ? '/img/triiModules/TriiChat.svg'
          //       : pathName === '/modulos/triimarketing'
          //         ? '/img/triiModules/TriiMarketing.svg'
          //         : pathName === '/modulos/triiticket'
          //           ? '/img/triiModules/TriiTickets.svg'
          //           : pathName === '/modulos/triiservice'
          //             ? '/img/triiModules/TriiService.svg'
          //             : pathName === '/modulos/triicobranzas'
          //               ? '/img/triiModules/TriiCobranzas.svg'
          //               : pathName === '/modulos/triillamadas'
          //                 ? '/img/triiModules/TriiCall.svg'
          //                 : pathName === '/modulos/triicontactos'
          //                   ? '/img/triiModules/TriiContacts.svg'
          //                   : pathName === '/modulos/triiteam'
          //                     ? '/img/triiModules/TriiTeam.svg'
          //                     : '/img/Trii.svg'
          // }
          src={pathName}
          height={64}
          width={64}
        />
        <Typography
          variant="h6"
          color="text.primary"
          gutterBottom
          sx={{
            fontWeight: 600,
            marginLeft: 1,
          }}
        ></Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box
          component="a"
          href="/"
          sx={{
            textDecoration: 'none',
          }}
        >
          <NavItem
            title={t('global.home')}
            id={'Home'}
            items={landingPages}
            colorInvert={colorInvert}
            sx={{
              textDecoration: 'none',
            }}
          />
        </Box>

        <Box marginLeft={4}>
          <NavItem
            title={t('global.modules')}
            id={'modules'}
            items={modulePages}
            colorInvert={colorInvert}
          />
        </Box>

        <Box
          component="a"
          display="none"
          href="/funciones"
          marginLeft={4}
          sx={{
            textDecoration: 'none',
          }}
        >
          <NavItem
            title={t('global.functions')}
            id={'functions'}
            items={functionsPages}
            colorInvert={colorInvert}
          />
        </Box>
        <Box
          component="a"
          href="/contacto"
          marginLeft={4}
          sx={{
            textDecoration: 'none',
          }}
        >
          <NavItem
            title={t('global.contact')}
            id={'Contact'}
            items={contactPages}
            colorInvert={colorInvert}
          />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
