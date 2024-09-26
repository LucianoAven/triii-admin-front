import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useField from 'hooks/useField';
import workspacesService from 'services/workspaces';
//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
//components/ui
import { StyleContext } from 'style/styleProvider';
import { ImageInput } from './components';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Spinner from 'react-bootstrap/Spinner';
import EditWorkspacePanel from 'components/EditWorkspacePanel/EditWorkspacePanel';
import { Input } from 'components';

const WorkspaceProfilePanel = ({ workspace, fetchWorkspace }) => {
  const { t } = useTranslation();
  const { buttonSize } = useContext(StyleContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nameInput = useField('name', workspace?.name);

  const handleSave = async () => {
    const name = nameInput.atributes.value;
    const nameJSON = JSON.stringify({ id: workspace.id, name });

    setIsLoading(true);

    try {
      const response = await workspacesService.updateWorkspace(nameJSON);

      await fetchWorkspace();

      dispatch(upsertWorkspace(response));
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <EditWorkspacePanel title={t('workSpaces.profile')}>
      <form className="form-group">
        <Grid item container xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
            width={1}
            margin={'0 auto'}
          >
            <ImageInput
              workspaceId={workspace?.id}
              imageUrl={workspace?.image_url}
              fetchWorkspace={fetchWorkspace}
            />
            <Box
              display="flex"
              flexDirection={{
                xs: 'column',
                sm: 'column',
                md: 'column',
              }}
              alignItems={{
                xs: 'stretched',
                sm: 'center',
                md: 'start',
              }}
              justifyContent={'flex-start'}
              width={1}
              margin={'0 auto'}
              gap={2.5}
              ml={2}
              mt={0.5}
            >
              <Input
                label={t('global.name')}
                {...nameInput}
              />
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'flex-end'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Button
                    size={buttonSize.responsive}
                    variant="contained"
                    onClick={handleSave}
                    disabled={isLoading ? true : false}
                    startIcon={
                      isLoading ? (
                        <Spinner
                          style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            fontSize: '12px',
                          }}
                          animation="border"
                        />
                      ) : null
                    }
                  >
                    {isLoading ? t('global.saving') : t('global.save')}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </form>
    </EditWorkspacePanel>
  );
};

export default WorkspaceProfilePanel;
