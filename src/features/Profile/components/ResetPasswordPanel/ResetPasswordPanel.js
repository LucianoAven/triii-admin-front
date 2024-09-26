import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../style/styleProvider';
import { InitResetPasswordButton, ResetPasswordForm } from './components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ResetPasswordPanel = () => {
  const { t } = useTranslation();
  const { fontSize, color } = useContext(StyleContext);
  const [stage, setStage] = useState('initial');

  const ResetPasswordFlow =
    stage === 'initial' ? (
      <InitResetPasswordButton setStage={setStage} />
    ) : (
      <ResetPasswordForm setStage={setStage} />
    );

  return (
    <div id="ResetPasswordPanel" className="panel">
      <div className="panel-hdr">
        <Typography fontSize={fontSize.sm} color={color.slate[700]}>
          {t('global.password')}
        </Typography>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'flex-start'}
              width={1}
              paddingLeft={3.2}
            >
              {ResetPasswordFlow}
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPanel;
