import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../style/styleProvider';

//redux
import {
  cancelDeletionStatus,
  selectUser,
} from '../../../../ReduxToolkit/features/user/userSlice.ts';
import { setSession } from '../../../../ReduxToolkit/features/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';

//components/ui
import { DeleteAccountDialog } from './components';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from 'react-bootstrap/Spinner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EraseAccountPanel = () => {
  const { buttonSize, fontSize, color } = useContext(StyleContext);
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [openPopupDeleteAcc, setOpenPopupDeleteAcc] = useState(false);
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
  ) : (
    <DeleteIcon />
  );

  const deletionWarning =
    user.status === 2 &&
    t('deletePrincipalAccount.deletePending');

  const buttonText =
    user.status === 1
      ? t('global.deleteAccount')
      : t('deletePrincipalAccount.cancelDeletion');

  const cancelDeletion = async () => {
    setIsLoading(true);

    await dispatch(setSession());
    await dispatch(cancelDeletionStatus(JSON.stringify({ status: 1 })));

    setIsLoading(false);
  };

  const onButtonClick = () => {
    user.status === 1 ? setOpenPopupDeleteAcc(true) : cancelDeletion();
  };

  return (
    <>
      <DeleteAccountDialog
        openPopupDeleteAcc={openPopupDeleteAcc}
        setOpenPopupDeleteAcc={setOpenPopupDeleteAcc}
      />
      <div id="DeleteAccountPanel" className="panel">
        <div className="panel-hdr">
          <Typography color={color.slate[700]} fontSize={fontSize.sm}>
            {t('global.deleteAccount')}
          </Typography>
        </div>
        <div className="panel-container show">
          <Box
            className="panel-content"
            display="flex"
            justifyContent={'space-between'}
            ml="25px"
          >
            <Typography fontSize={fontSize.sm}>{deletionWarning}</Typography>
            <Button
              size={buttonSize.responsive}
              variant="contained"
              type="button"
              color="error"
              disabled={isLoading}
              startIcon={startIcon}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EraseAccountPanel;
