import React, { useContext, useEffect } from "react";
import NavMenu from "./NavMenu";
import EnlacesLogin from "./EnlacesLogin";
import "./MainLayout.css";
import { DataContext } from "../context/contextApi";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from 'react-redux';
import { getSessionStatus } from '../ReduxToolkit/features/sessionSlice';
import Spinner from "./Spinner";

const MainLayout = (props) => {
  // function MainLayout(props) {
  const sessionStatus = useSelector(getSessionStatus);

  useEffect(() => {
    console.log('sessionStatus', sessionStatus)
  }, [sessionStatus]);

  const { openDialogEmpresa, setOpenDialogEmpresa, isMobile, showPageSideBar } = useContext(DataContext)
  const closeDialog = async () => {
    setOpenDialogEmpresa(false);
  };



  return (
    <>
      {sessionStatus === 'succeeded' && (
        <div className="page-wrapper">
          <div className="page-inner">
            {showPageSideBar && (

              <div className={!isMobile ? "page-sidebar sidebar-sticky" : "page-sidebar sidebar-sticky page-sidebar-mobile"}>
                <NavMenu />
              </div>
            )}
            <div className="page-content-wrapper">
              <div className="page-header header-sticky" style={{ padding: "0px !important" }}>
                <EnlacesLogin authenticated={true} />
              </div>
              <div id="js-page-content" className="page-content">
                {props.children}
                <Dialog
                  open={openDialogEmpresa}
                  onClose={() => setOpenDialogEmpresa(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    title
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      subtitle
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialogEmpresa(false)}>
                      {/* {t("global.cancel")} */}
                      cancel
                    </Button>
                    <Button color="error" onClick={closeDialog}>
                      {/* {t("global.delete")} */}
                      delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}

      {sessionStatus === 'loading' && (
        <Spinner></Spinner>
      )}
      {sessionStatus === 'failed' && (
        <div>{props.children}</div>
      )}
    </>
  );
}

export default MainLayout;