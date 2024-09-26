import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spaceSubdomainNameControl, spaceNameControl } from 'helpers/authControl';
import { useTranslation } from 'react-i18next';
import useField from 'hooks/useField';

//redux
import {
  addWorkspace,
  getWorkspacePostStatus,
  getWorkspaces,
  setWorkspacePostStatus,
} from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
import {
  selectSubdomainAvailability,
  selectSubdomainStatus,
} from 'ReduxToolkit/features/subdomainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from 'ReduxToolkit/features/sessionSlice';

// components/ui
import { Link } from 'react-router-dom';
import { StyleContext } from 'style/styleProvider';
import { FormNotificationError } from 'components';
import { DataCenterSelect, NameField, SubdomainField } from './components';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SpinnerIcon from 'components/SpinnerIcon/SpinnerIcon';

export default function CreateSpaceForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { buttonSize } = useContext(StyleContext);
  const [regionSelect, setRegionSelect] = useState('US');
  const workspaceNameInput = useField('text');
  const subdomainNameInput = useField('text');
  const workspaces = useSelector(getWorkspaces);
  const workspacePostStatus = useSelector(getWorkspacePostStatus);
  const subdomainAvailability = useSelector(selectSubdomainAvailability);
  const subdomainStatus = useSelector(selectSubdomainStatus);
  const dispatch = useDispatch();

  const handleSpaceSubdomainNameControl = (subdomainName) => {
    !spaceSubdomainNameControl(subdomainName)
      ? subdomainNameInput.actions.onError(
          <FormNotificationError errorMsg={t('add.error.invalidSubdomain')} />
        )
      : !subdomainAvailability
      ? subdomainNameInput.actions.onError(
          <FormNotificationError errorMsg={t('add.error.nonAvailableSubdomain')} />
        )
      : subdomainNameInput.actions.onSuccess();
  };

  const handleSpaceNameControl = (spaceName) => {
    spaceNameControl(spaceName)
      ? workspaceNameInput.actions.onSuccess()
      : workspaceNameInput.actions.onError(
          <FormNotificationError errorMsg={t('add.error.invalidSpaceName')} />
        );
  };

  const formControl = (name, subdomain) => {
    handleSpaceNameControl(name);
    handleSpaceSubdomainNameControl(subdomain);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subdomainName = subdomainNameInput.atributes.value;
    const name = workspaceNameInput.atributes.value;
    const subdomain = `${subdomainName}.mytrii.app`;
    const region = regionSelect;
    const workspace = { name, region, subdomain };
    const workspaceJson = JSON.stringify(workspace);

    formControl(name, subdomainName);

    if (spaceNameControl(name) && spaceSubdomainNameControl(subdomainName)) {
      await dispatch(setSession());
      await dispatch(addWorkspace(workspaceJson));
    }
  };

  useEffect(() => {
    if (subdomainStatus === 'succeeded' && workspacePostStatus === 'succeeded') {
      dispatch(setWorkspacePostStatus('idle'));
      navigate('/workspaces');
    }
  }, [workspaces, navigate, subdomainStatus, workspacePostStatus, dispatch]);

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <Grid item container xs={12}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          justifyContent={'flex-'}
          width={1}
          margin={'0 auto'}
        >
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
            className={'marginLeftImgProfile'}
            width={1}
            margin={'0 auto'}
          >
            <NameField workspaceNameInput={workspaceNameInput} />
            <SubdomainField
              subdomainNameInput={subdomainNameInput}
              handleSpaceSubdomainNameControl={handleSpaceSubdomainNameControl}
            />
            <DataCenterSelect
              regionSelect={regionSelect}
              setRegionSelect={setRegionSelect}
            />
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'flex-end'}
                width={1}
                margin={'0 auto'}
                gap={2}
              >
                <Button
                  size={buttonSize.responsive}
                  variant="contained"
                  type="submit"
                  disabled={workspacePostStatus === 'loading'}
                  startIcon={
                    <SpinnerIcon isLoading={workspacePostStatus === 'loading'} />
                  }
                >
                  {workspacePostStatus === 'loading'
                    ? t('global.creating')
                    : t('global.create')}
                </Button>
                <Button
                  size={buttonSize.responsive}
                  variant="contained"
                  type="button"
                  disabled={workspacePostStatus === 'loading' ? true : false}
                >
                  <Link
                    to={'/workspaces'}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {t('global.cancel')}
                  </Link>
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </form>
  );
}
