import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
//components/ui
import { StyleContext } from 'style/styleProvider';
import { DialogText } from './components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Spinner from 'react-bootstrap/Spinner';
import Button from '@mui/material/Button';

const DeleteDialog = ({ openDeleteDialog, setOpenDeleteDialog, deleteDomain }) => {
  const { buttonSize } = useContext(StyleContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDomain = async () => {
    setIsLoading(true);

    try {
      await deleteDomain();
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
    setOpenDeleteDialog(false);
  };

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

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('edit.subdomain.caution')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <DialogText />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size={buttonSize.responsive}
          variant="outlined"
          onClick={() => setOpenDeleteDialog(false)}
        >
          {t('global.cancel')}
        </Button>
        <Button
          size={buttonSize.responsive}
          onClick={handleDeleteDomain}
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

export default DeleteDialog;
