import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { DataContext } from '../context/contextApi';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';

// components/ui
import './EnlacesLogin.css';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure();

const EnlacesLogin = ({ authenticated }) => {
  let select = JSON.parse(localStorage.getItem('select'));
  const dispatch = useDispatch(); //eslint-disable-line
  const {  isMobile } =
    useContext(DataContext);
  const [windowPath, setWindowPath] = useState(
    window.location.pathname.replace(/\//, '')
  );
  const location = useLocation();
  let newLocation = location.pathname.replace(/\//, '');
  const str = location.pathname;
  const workSpacesStr = str.includes('workspaces');
  const [value, setValue] = useState(select ? select : ''); //eslint-disable-line
  const userProfileInfo = null; //eslint-disable-line
  //Traduccion
  const { t } = useTranslation();
  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language);
  // };
  //eslint-disable-next-line
  // const [user, setUser] = useState({
  //   id: '19',
  //   name: 'user test',
  //   email: 'userTest@gmail.com',
  //   phone: '3584654987',
  // });

  // const users = useSelector(selectUser);

  //eslint-disable-next-line
  // const openDialog = () => {
  //   setOpenDialogEmpresa(true);
  // };

  useEffect(() => {
    // if(newLocation === "auditlog") setWindowPath()
    // if(newLocation === "security") setWindowPath(t("global.security"))
    // if(newLocation === "subscribe") setWindowPath(t("navBar.subscriptions"))
    // if(newLocation === "business") setWindowPath(t("navBar.business"))
    // if(newLocation === "users") setWindowPath(t("global.users"))
    // if(newLocation === "") setWindowPath("Dashboard")
    setWindowPath(newLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useMemo(() => {
    if (select === null) {
      // changeLanguage('ES');
      setValue('espanol');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleChangeLenguaje = useCallback(
  //   (e) => {
  //     if (e.target.value === 'espanol') {
  //       changeLanguage('ES');
  //       setValue('espanol');
  //     } else {
  //       setValue('ingles');
  //       changeLanguage('En');
  //     }
  //     localStorage.setItem('select', JSON.stringify(e.target.value));
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  // useEffect(() => {
  //   var dropdownProfile = document.querySelector('.dropdown-menu');
  //   var dropdownSelectProfile = document.querySelector('.selectDropProfile');
  //   if (dropdownProfile == null) {
  //     return;
  //   } else {
  //     dropdownSelectProfile.addEventListener('click', function (event) {
  //       // alert("click outside");
  //       event.stopPropagation();
  //     });
  //     window.onclick = function (event) {
  //       if (!event.target.matches('.header-icon')) {
  //         var dropdowns = document.getElementsByClassName('dropdown-menu');

  //         var i;
  //         for (i = 0; i < dropdowns.length; i++) {
  //           var openDropdown = dropdowns[i];
  //           if (openDropdown.classList.contains('show')) {
  //             openDropdown.classList.remove('show');
  //             event.stopropagation();
  //           }
  //         }
  //       }
  //     };
  //   }
  // }, []);

  // const showSideBar = useCallback(() => {
  //   showPageSideBar && setShowPageSideBar(false);
  //   !showPageSideBar && setShowPageSideBar(true);
  // }, [showPageSideBar, setShowPageSideBar]);

  return (
    <Fragment>
      {authenticated ? (
        <>
          {!isMobile && (
            <span className="h4 m-0">
              {windowPath === 'auditlog'
                ? t('navBar.auditLogs')
                : windowPath === 'security'
                  ? t('global.security')
                  : windowPath === 'profile'
                    ? t('profile.myProfile')
                    : windowPath === 'subscribe'
                      ? t('navBar.subscriptions')
                      : windowPath && workSpacesStr
                        ? t('navBar.workspaces')
                        : windowPath === 'invoices'
                          ? t('subscription.invoices')
                          : windowPath === '' && t('navBar.workspaces')}
            </span>
          )}

        </>
      ) : (
        <div>
          <NavLink>
            <button color="inherit">{t('global.login')}</button>
          </NavLink>
        </div>
      )}
    </Fragment>
  );
};

export default EnlacesLogin;
