import React, { useState, useEffect } from 'react';
import useField from 'hooks/useField';
import { useTranslation } from 'react-i18next';
import { SignUpFlow } from './components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import { Main } from 'components/layouts';

export default function SignUpView() {
  const emailField = useField('text');
  const [fadeIn, setFadeIn] = useState(false);
  const [stage, setStage] = useState('signUp');
  const { t } = useTranslation();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Main>
      <Box bgcolor={'alternate.main'}>
        <Fade in={fadeIn}>
          <Container
            style={{
              maxWidth: 800,
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box marginBottom={4} display={"flex"}>
              <Box component={'img'} src={'/img/Trii.svg'} sx={{ marginRight: "15px" }}
                height={100}
              ></Box>
              <Box>

                <Typography
                  sx={{
                    textTransform: 'uppercase',
                  }}
                  gutterBottom
                  color={'text.secondary'}
                  fontWeight={700}
                >
                  {t('global.signup')}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {t('signUp.createAnAccount')}
                </Typography>
                <Typography color="text.secondary">
                  {stage === 'signUp' &&
                    t('signUp.fillOutFormToGetStarted')}
                  {stage === 'emailVerification' &&
                    t('verify.verifyYourEmail')}
                  {stage === 'success' && t('signUp.success')}
                </Typography>
              </Box>
            </Box>
            <Card sx={{ p: { xs: 4, md: 6 } }}>
              <SignUpFlow
                emailField={emailField}
                stage={stage}
                setStage={setStage}
              />
            </Card>
          </Container>
        </Fade>
      </Box>
    </Main>
  );
}
