import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useField from 'hooks/useField';
import { SignInFlow } from './components';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import { Main } from 'components/layouts';

export default function SignIn() {
  const emailField = useField('text');

  const [fadeIn, setFadeIn] = useState(false);
  const { t } = useTranslation();
  const [stage, setStage] = useState('signIn');

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
            <Box marginBottom={4} display={"flex"} >
              <Box component={'img'} src={'/img/Trii.svg'} sx={{marginRight: "15px"}}
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
                  {t('global.login')}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {t('login.welcomeBack')}
                </Typography>
                <Typography color="text.secondary">
                  {stage === 'signIn' &&
                    t('login.logInToManageAccount')}
                  {stage === 'emailVerification' &&
                    t('verify.verifyYourEmail')}
                </Typography>
              </Box>
            </Box>
            <Card sx={{ p: { xs: 4, md: 6 } }}>
              <SignInFlow
                setStage={setStage}
                stage={stage}
                emailField={emailField}
              />
            </Card>
          </Container>
        </Fade>
      </Box>
    </Main>
  );
}
