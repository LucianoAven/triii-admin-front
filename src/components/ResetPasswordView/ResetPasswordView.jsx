import React, { useState, useEffect } from 'react';
import ResetPasswordForm from './components';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Container from 'components/Container';
import { Main } from 'components/layouts';

const ResetPasswordView = () => {
  const { t } = useTranslation();
  const [fadeIn, setFadeIn] = useState(false);
  const [stage, setStage] = useState(1); //1 = email stage, 2 = password reset stage

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Main>
      <Fade in={fadeIn} unmountOnExit>
        <Box bgcolor={'alternate.main'}>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: 600,
            }}
          >
            <Box marginBottom={4}>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                }}
                gutterBottom
                color={'text.secondary'}
                fontWeight={700}
              >
                {t('global.recoverAccount')}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                {t('global.forgotYourPassword')}
              </Typography>
              <Typography color="text.secondary">
                {stage === 1 && t('emailForm.enterYourEmailBelow')}
                {stage === 2 && t('resetPasswordForm.enterDataToResetPassword')}
                {stage === 3 && t('resetPasswordForm.passwordResetSuccess')}
              </Typography>
            </Box>
            <ResetPasswordForm stage={stage} setStage={setStage} />
          </Container>
        </Box>
      </Fade>
    </Main>
  );
};

export default ResetPasswordView;
