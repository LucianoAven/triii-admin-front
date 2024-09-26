import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getDeleteUserStatus,
} from '../../../../../../ReduxToolkit/features/user/userSlice.ts';
import { setSession } from '../../../../../../ReduxToolkit/features/sessionSlice';
//components/ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Spinner from 'react-bootstrap/Spinner';

const DeleteAccountDialog = ({ setOpenPopupDeleteAcc, openPopupDeleteAcc }) => {
  const dispatch = useDispatch();
  const deleteUserStatus = useSelector(getDeleteUserStatus);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const startIcon = isLoading ? (
    <Spinner
      style={{
        height: '1rem',
        width: '1rem',
        fontSize: '12px',
      }}
      animation="border"
    />
  ) : null;

  const deleteAccount = async () => {
    setIsLoading(true);

    await dispatch(setSession());
    await dispatch(deleteUser());

    setIsLoading(false);
  };

  useEffect(() => {
    if (deleteUserStatus === 'succeeded') setOpenPopupDeleteAcc(false);
  }, [deleteUserStatus, setOpenPopupDeleteAcc]);

  return (
    <Dialog
      open={openPopupDeleteAcc}
      onClose={() => setOpenPopupDeleteAcc(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('deletePrincipalAccount.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('deletePrincipalAccount.dialog.subtitle')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpenPopupDeleteAcc(false)}>
          {t('global.cancel')}
        </Button>
        <Button
          onClick={deleteAccount}
          disabled={isLoading}
          variant="outlined"
          color="error"
          startIcon={startIcon}
        >
          {t('global.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
