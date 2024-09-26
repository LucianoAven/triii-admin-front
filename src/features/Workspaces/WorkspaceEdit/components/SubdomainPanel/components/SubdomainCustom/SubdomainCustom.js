/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useField from 'hooks/useField';
import workspacesService from 'services/workspaces';
import { useTranslation } from 'react-i18next';
import { spaceSubdomainNameControl } from 'helpers/authControl';
//redux
import { useDispatch } from 'react-redux';
import { upsertWorkspace } from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
// components/ui
import { StyleContext } from 'style/styleProvider';
import { WarningCard } from './components';
import Spinner from 'react-bootstrap/Spinner';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SubdomainInput from 'components/SubdomainInput/SubdomainInput';

const SubdomainCustom = ({ workspace, fetchWorkspace }) => {
  const { t } = useTranslation();
  const { fontSize, fontWeight } = useContext(StyleContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const existingSubdomainName = workspace.domain_subdomain.split('.')[0];
  const subdomainNameInput = useField('text', existingSubdomainName);

  const handleSaveButton = async () => {
    const subdomain = subdomainNameInput.atributes.value;

    setIsLoading(true);

    if (spaceSubdomainNameControl(subdomain)) {
      const subdomainNameJSON = JSON.stringify({
        id: workspace.id,
        subdomain: `${subdomain}.mytrii.app`,
      });

      try {
        const response = await workspacesService.updateWorkspace(subdomainNameJSON);

        fetchWorkspace();
        dispatch(upsertWorkspace(response));
        setEditName(false);
      } catch (err) {
        console.log(err);
      }
    }

    setIsLoading(false);
  };

  const openEditCompanyName = useCallback(() => {
    setEditName(true);
  }, [editName]);
  const closeEditCompanyName = useCallback(() => {
    setEditName(false);
  }, [editName]);

  return (
    <Box className="panel-inner grayInner p-2 mb-2">
      <Box className="d-flex justify-content-between align-items-center">
        <div
          style={{
            width: '65%',
            display: 'inline-flex',
            alignItems: 'baseline',
          }}
        >
          <Typography fontSize={fontSize.xs} fontWeight={fontWeight.semibold}>
            {workspace?.domain_subdomain}
          </Typography>
        </div>
        <Box>
          <Button
            startIcon={<EditIcon />}
            size="small"
            variant="contained"
            color="inherit"
            onClick={openEditCompanyName}
          >
            {t('workSpaces.editSubdomain')}
          </Button>
        </Box>
      </Box>
      {editName === true && (
        <Box mt={3} mb={1} display="flex" flexDirection="column" gap={2}>
          <WarningCard />
          <SubdomainInput
            subdomainNameInput={subdomainNameInput}
            existingSubdomainName={existingSubdomainName}
          />
          <Box mt={2} textAlign={'end'}>
            <Button
              sx={{ width: 'fit-content', marginRight: 2 }}
              size={'small'}
              variant="contained"
              color="inherit"
              onClick={closeEditCompanyName}
              disabled={isLoading ? true : false}
            >
              {t('global.cancel')}
            </Button>
            <Button
              sx={{ width: 'fit-content', alignSelf: 'end' }}
              size={'small'}
              variant="contained"
              onClick={handleSaveButton}
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
        </Box>
      )}
    </Box>
  );
};

SubdomainCustom.propTypes = {
  workspace: PropTypes.object,
  setWorkspace: PropTypes.func,
};

export default SubdomainCustom;
