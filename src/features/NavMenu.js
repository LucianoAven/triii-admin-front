import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../ReduxToolkit/features/sessionSlice';


const NavMenu = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
 
  return (
    <>
      <div className="page-logo justify-content-center">
        <a href="https://trii.app">
          <img
            src="/img/Icons/PNG/TriiAdmin.png"
            alt=""
            style={{ width: 48, height: 48 }}
          />
        </a>
      </div>

      <ul className="nav flex-column">
        {/* <li className="nav-item d-block d-inline-flex align-items-center justify-content-center position-relative">
          <NavLink to="/profile" className="nav-link">
            <PersonIcon />
            <Typography ml={1}>{t('global.profile')}</Typography>
          </NavLink>

        </li> */}
        <li className="nav-item d-block d-inline-flex align-items-center justify-content-center position-relative">
          <NavLink to="/workspaces" className="nav-link">
            <BusinessIcon />
            <Typography ml={1}>home</Typography>
          </NavLink>

        </li>

        {/* <li className="nav-item d-block d-inline-flex align-items-center justify-content-center position-relative">
        
            <NavLink to="/subscribe" className="nav-link">
              <CreditCardIcon />
              <Typography ml={1}>{t('navBar.subscriptions')}</Typography>
            </NavLink>
        </li>
        <li className="nav-item d-block d-inline-flex align-items-center justify-content-center position-relative">
       
            <NavLink to="/invoices" className="nav-link">
              <DescriptionIcon />
              <Typography ml={1}>{t('subscription.invoices')}</Typography>

          </NavLink>
        </li> */}
        <li className="nav-item d-block d-inline-flex align-items-center justify-content-center position-relative">
       
            <NavLink to="/auditlog" className="nav-link">
              <WorkHistoryIcon />
              <Typography ml={1}>{t('navBar.auditLogs')}</Typography>

          </NavLink>
        </li>   
      </ul>
          <Box  className="nav-link nav-item-box nav-item-logOut"  onClick={() => dispatch(logout)}>
            <LogoutIcon />
            <Typography ml={1}>{t('global.logout')}</Typography>
          </Box>
    </>
  );
};

export default NavMenu;
