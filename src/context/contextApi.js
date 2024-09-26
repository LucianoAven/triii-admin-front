import React, { createContext, useState } from 'react'; //eslint-disable-line
import PropTypes from 'prop-types';
import { UserAccount } from '../Models/UserAccount.tsx';

export const DataContext = createContext();

const DataProvider = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const dataUsuario = new UserAccount();
  const [usuario, setUsuario] = useState(dataUsuario);
  const [userProfile, setUserProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false); //eslint-disable-line
  const [showPageSideBar, setShowPageSideBar] = useState(true); //eslint-disable-next-line
  const [openDialogEmpresa, setOpenDialogEmpresa] = useState(false);

  React.useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setIsMobile(true);
      setShowPageSideBar(false);
      // console.log("isMobile",isMobile)
    } else {
      // false for not mobile device
      setIsMobile(false);
      setShowPageSideBar(true);
      // console.log("isMobile",isMobile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <DataContext.Provider
      value={{
        pageLoaded,
        isMobile,
        setIsMobile,
        usuario,
        setUsuario,
        userProfile,
        setUserProfile,
        isEdit,
        setIsEdit,
        editAccount,
        setEditAccount,
        openDialogEmpresa,
        setOpenDialogEmpresa,
        showPageSideBar,
        setShowPageSideBar,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node,
};
export default DataProvider;
