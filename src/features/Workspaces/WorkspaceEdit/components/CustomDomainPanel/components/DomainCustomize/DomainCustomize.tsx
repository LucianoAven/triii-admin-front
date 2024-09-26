import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Spaces } from '@trii/types';
import workspaceService from 'services/workspaces';
//components/ui
import {
  DomainStepper,
  DomainInfo,
  DomainDeleteButton,
  DeleteDialog,
} from './components';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClearIcon from '@mui/icons-material/Clear';

const DomainCustomize = ({ workspace, fetchWorkspace }: DomainCustomizeProps) => {
  const [configDomain, setConfigDomain] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { t } = useTranslation();

  const openConfigDomain = useCallback(() => {
    setConfigDomain(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configDomain]);
  const closeConfigDomain = useCallback(() => {
    setConfigDomain(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configDomain]);

  const deleteDomain = async () => {
    try {
      await workspaceService.deleteCustomDomain(workspace.id);
      fetchWorkspace();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {openDeleteDialog && (
        <DeleteDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          deleteDomain={deleteDomain}
        />
      )}
      <Box className="panel-inner grayInner p-2 mt-0">
        <Box
          flexDirection="column"
          gap={2}
          className="d-flex justify-content-between"
        >
          {workspace.domain_custom && workspace.domain_custom.host !== '' && (
            <Box
              display={'flex'}
              flexDirection="row"
              justifyContent={'space-between'}
            >
              <DomainInfo
                domainHost={workspace.domain_custom.host}
                workspaceStatus={Spaces.Status[workspace.status]}
              />
              <DomainDeleteButton setOpenDeleteDialog={setOpenDeleteDialog} />
            </Box>
          )}
          <Box alignSelf="end">
            <Button
              startIcon={<BorderColorIcon />}
              size="small"
              variant="contained"
              color="inherit"
              sx={{ marginRight: 1 }}
              onClick={openConfigDomain}
            >
              {t('workSpaces.editDomain')}
            </Button>
            <IconButton color="error" component="button" onClick={closeConfigDomain}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
        {configDomain && (
          <DomainStepper
            setConfigDomain={setConfigDomain}
            domainHost={workspace.domain_custom?.host}
            workspaceId={workspace.id}
            fetchWorkspace={fetchWorkspace}
          />
        )}
      </Box>
    </>
  );
};

interface DomainCustomizeProps {
  workspace: Spaces.Space;
  setWorkspace: any;
  fetchWorkspace: any;
}

export default DomainCustomize;
