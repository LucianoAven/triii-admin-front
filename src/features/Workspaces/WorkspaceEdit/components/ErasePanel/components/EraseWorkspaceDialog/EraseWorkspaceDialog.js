import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import workspacesService from 'services/workspaces';

//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';

//components/ui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Spinner from 'react-bootstrap/Spinner';

const EraseWorkspaceDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  id,
  setWorkspace,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteWorkspace = async () => {
    setIsLoading(true);

    const updatedWorkspace = await workspacesService.deleteWorkspace(id);

    await dispatch(upsertWorkspace(updatedWorkspace));
    setWorkspace(updatedWorkspace);

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
        {t('delete.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('delete.dialog.subtitle')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)}>
          {t('global.cancel')}
        </Button>
        <Button
          onClick={deleteWorkspace}
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

export default EraseWorkspaceDialog;
