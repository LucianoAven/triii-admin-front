import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import workspacesService from 'services/workspaces';
//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
//components/ui
import { EraseWorkspaceDialog } from './components';
import { StyleContext } from 'style/styleProvider';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Spinner from 'react-bootstrap/Spinner';
import EditWorkspacePanel from 'components/EditWorkspacePanel/EditWorkspacePanel';

const EraseWorkspacePanel = ({ workspace, setWorkspace }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { buttonSize, fontSize } = useContext(StyleContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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

  const buttonText =
    workspace.status !== 4
      ? t('workSpaces.deleteWorkspace')
      : t('delete.workspaceCancelDeletion');

  const deletionWarning = workspace.status === 4 && t('delete.deletionWarning');

  const cancelDeletion = async () => {
    setIsLoading(true);

    const dataJSON = JSON.stringify({ id: workspace.id, status: 3 });
    const updatedWorkspace = await workspacesService.updateWorkspace(dataJSON);

    dispatch(upsertWorkspace(updatedWorkspace));
    setWorkspace(updatedWorkspace);

    setIsLoading(false);
  };

  const onButtonClick = () => {
    workspace.status !== 4 ? setOpenDeleteDialog(true) : cancelDeletion();
  };

  return (
    <>
      <EraseWorkspaceDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        id={workspace.id}
        setWorkspace={setWorkspace}
      />
      <EditWorkspacePanel title={t('workSpaces.workspaceDeletion')}>
        <form className="form-group">
          <Box
            className="panel-content"
            display="flex"
            justifyContent="space-between"
          >
            <Typography fontSize={fontSize.sm} maxWidth="45%">
              {deletionWarning}
            </Typography>
            <Box alignSelf={'center'}>
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
          </Box>
        </form>
      </EditWorkspacePanel>
    </>
  );
};

export default EraseWorkspacePanel;
