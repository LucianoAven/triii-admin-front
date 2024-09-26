import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Snackbar from '@mui/material/Snackbar';

const CopyIcon = ({ textToCopy }) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setState({ ...state, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  return (
    <>
      <ContentCopyRoundedIcon
        onClick={handleClick}
        style={{ height: 25, width: 25, marginLeft: 10, cursor: 'pointer' }}
      ></ContentCopyRoundedIcon>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
        message={t('edit.stepper.secondStep.copied')}
      ></Snackbar>
    </>
  );
};

export default CopyIcon;
