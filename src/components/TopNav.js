import React, { useState, useCallback, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from 'context/Account';
import NavButton from './NavButton';
import LenguageSelect from './LenguageSelect';
import ThemeModeToggler from 'components/ThemeModeToggler';
import { useTranslation } from 'react-i18next';
import { useTheme, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

//borrar "Nosotros", pasar al Home, poner el texto nosotros con su descripcion bajo de la presentacion
//en cada modulo copiar todo lo que hay en trii.com.ar, no perder texto

const TopNav = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { session, logout } = useContext(AccountContext);
  const { mode } = theme.palette;
  const select = JSON.parse(localStorage.getItem('select'));
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(select);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleDashboardButton = () => {
    // window.location.hostname === 'localhost'
    //   ? (window.location.href = 'http://localhost:3001/')
    //   : (window.location.href = (window.location.href, '/account'));
    window.location.href = `${window.location.protocol}//account.${window.location.host}`;
  };

  const navigateTo = (event, url) => {
    event.preventDefault();
    navigate(url);
  };

  const handleLogout = (event) => {
    logout();
    //navigateTo(event, '/');
  };
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);

    // i18n.on('languageChanged', (lng) => {document.documentElement.setAttribute('lang', lng);});

  };

  useMemo(() => {
    if (select === null) {
      // changeLanguage('ES');
      setValue('espanol');
    }
  }, []); //eslint-disable-line

  const handleChangeLenguaje = useCallback((e) => {
    if (e.target.value === 'espanol') {
      changeLanguage('ES');
      setValue('espanol');
    } else {
      setValue('ingles');
      changeLanguage('En');
    }
    localStorage.setItem('select', JSON.stringify(e.target.value));
  }, []); //eslint-disable-line

  return (
    <Box
      display={'flex'}
      justifyContent={isMd ? 'flex-end' : 'center'}
      alignItems={'center'}
    >
      {session && (
        <NavButton
          onClick={handleDashboardButton}
          color={mode === 'light' ? 'primary' : 'secondary'}
        >
          {t('navBar.dashboard')}
        </NavButton>
      )}

      <NavButton
        onClick={
          session
            ? (event) => handleLogout(event)
            : (event) => navigateTo(event, '/signin')
        }
        color={mode === 'light' ? 'primary' : 'secondary'}
      >
        {session ? t('navBar.logout') : t('global.login')}
      </NavButton>

      {!session && (
        <NavButton
          onClick={(event) => navigateTo(event, '/signup')}
          color={mode === 'light' ? 'primary' : 'secondary'}
        >
          {t('global.signup')}
        </NavButton>
      )}

      <LenguageSelect value={value} onChange={handleChangeLenguaje} />
      <ThemeModeToggler />
    </Box>
  );
};

export default TopNav;
