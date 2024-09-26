import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from 'context/contextApi';
import { useTranslation } from 'react-i18next';
//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWorkspacesList,
  getWorkspacesStatus,
  getWorkspaces,
} from 'ReduxToolkit/features/workspace/workspaceSlice.ts';
// import { setSession } from 'ReduxToolkit/features/sessionSlice';
//components/ui
import 'react-image-crop/dist/ReactCrop.css';
import './Workspaces.css';
import { Workspace, Skeletons } from './components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const Workspaces = () => {
  const { isMobile } = useContext(DataContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const workspacesList = useSelector(selectWorkspacesList);
  const workspacesStatus = useSelector(getWorkspacesStatus);

  const workspaces =
    workspacesStatus === 'succeeded' ? (
      workspacesList?.map((workspace, index) => (
        <Workspace workspace={workspace} key={index} isMobile={isMobile} />
      ))
    ) : (
      <Skeletons isMobile={isMobile} />
    );

  // useEffect(() => {
  //   dispatch(setSession()).then(() => dispatch(getWorkspaces()));
  // }, [dispatch]);
  useEffect(() => {
    dispatch(getWorkspaces());
  }, []); //eslint-disable-line
  return (
    <Container maxWidth="md">

      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'85vh'}
        width={'100%'}
        boxShadow={
          'rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 10%) 0px 1px 2px -1px;'
        }
        bgcolor={grey[100]}
        className={'fadeinup'}
        borderRadius={2}
      >
        <Box className="m-0" sx={{ bgcolor: '#ffffff' }}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            // px={2}
            sx={{ bgcolor: 'white', paddingRight: 2 }}
            // boxShadow={"0px 1px 2px rgba(0,0,0,0.2)"}
            borderRadius={'4px'}
          // height={"8%"}
          >
            {/* <Tab
            style={{
              paddingTop: 20,
              paddingBottom: 11,
             
            }}
            label={t("business.myBusiness")}
            selected
          /> */}
            <Typography
              borderBottom={2}
              borderColor={blue[700]}
              paddingX={3}
              paddingY={1}
              alignSelf={'end'}
              fontSize={'0.875rem'}
              fontWeight={500}
              sx={{
                paddingTop: 2.5,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                lineHeight: '1.75',
              }}
            >
              {t('workSpaces.myWorkspaces')}
            </Typography>
            <NavLink to="/workspaces/Add">
              <Button
                style={{ alignSelf: 'center' }}
                variant="contained"
                size="small"
              // startIcon={<PersonAddAltIcon />}
              >
                {t('global.create')}
              </Button>
            </NavLink>
          </Box>
        </Box>
        <Box sx={{ overflowY: 'auto', maxHeight: '90%' }}>{workspaces}</Box>
      </Box>
    </Container>
  );
};

export default Workspaces;
