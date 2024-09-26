/* eslint-disable indent */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { emailInputControl, passwordInputControl } from 'helpers/authControl';
import { Input, FormNotificationError } from 'components';
import useField from 'hooks/useField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import { green } from '@mui/material/colors';
import { AccountContext } from 'context/Account';
import { useDispatch } from 'react-redux';
import { setSession } from 'ReduxToolkit/features/sessionSlice';
export default function SignInForm({ setStage, emailField }) {
  const { t } = useTranslation();
  const { authenticate, resendVerificationCode } =
    useContext(AccountContext);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const passwordField = useField('password');
  const dispatch = useDispatch()

  const inputFormControl = () => {
    const email = emailField.atributes.value;
    const password = passwordField.atributes.value;
    let areValid = true;
    if (emailInputControl(email)) {
      emailField.actions.onSuccess();
    } else {
      emailField.actions.onError(
        <FormNotificationError
          errorMsg={t('error.errorEmail')}
        />,
      );

      areValid = false;
    }

    if (passwordInputControl(password)) {
      passwordField.actions.onSuccess();
    } else {
      passwordField.actions.onError(
        <FormNotificationError
          errorMsg={t('error.errorPassword')}
        />,
      );

      areValid = false;
    }

    return areValid;
  };

  const handleSuccessfullLogin = (logInData) => {
    setSession(logInData);
    dispatch(setSession());

    navigate('/');
  };

  const handleNotVerifiedAccount = () => {
    const email = emailField.atributes.value;

    resendVerificationCode(email);
    setStage('emailVerification');
  };

  const signIn = async (email, password) => {
    await authenticate(email, password)
      .then((data) => {
        handleSuccessfullLogin(data);
      })
      .catch((err) => {
        const errName = err.name;

        console.error('Failed to log in :(');
        console.error('Error: ', err);
        console.error('Nombre de Error: ', errName);
        console.error('Mensaje de Error: ', err.message);

        switch (errName) {
          case 'NotAuthorizedException':
            setShowError(true);
            break;
          case 'UserNotConfirmedException':
            handleNotVerifiedAccount();
            setStage('emailVerification');
            break;
            default: 
            break
        }
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailField.atributes.value;
    const password = passwordField.atributes.value;

    setShowError(false);
    setLoading(true);

    if (inputFormControl()) {
      signIn(email, password);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      {showError && (
        <Fade in={showError}>
          <Box display={'flex'} color="red" alignItems={'center'} mb={3}>
            <FormNotificationError
              errorMsg={t('error.errorEmailPassword')}
            />
          </Box>
        </Fade>
      )}
      <Grid container spacing={4}>
        <Input
          label={t('global.enterEmail')}
          atributes={emailField.atributes}
        />
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            justifyContent={'flex-end'}
            width={1}
            marginBottom={2}
          >
            <Typography variant={'subtitle2'}>
              <Link
                component={'a'}
                color={'primary'}
                href={'/forgotpassword'}
                underline={'none'}
              >
                {t('login.forgotPassword')}
              </Link>
            </Typography>
          </Box>
          <Input
            label={t('global.enterPassword')}
            atributes={passwordField.atributes}
          />
        </Grid>
        <Grid item container xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            justifyContent={'space-between'}
            width={1}
            maxWidth={600}
            margin={'0 auto'}
          >
            <Box marginBottom={{ xs: 1, sm: 0 }}>
              <Typography
                style={{ display: 'flex', gap: 4 }}
                variant={'subtitle2'}
              >
                {t('login.dontHaveAccountYet')}
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/signup'}
                  underline={'none'}
                >
                  {t('login.signUpHere')}
                </Link>
              </Typography>
            </Box>
            <Button
              style={{ minWidth: 140 }}
              size={'large'}
              variant={'contained'}
              type={'submit'}
            >
              {loading ? (
                <CircularProgress size={26} sx={{ color: green[300] }} />
              ) : (
                t('global.login')
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

SignInForm.propTypes = {
  setStage: PropTypes.func.isRequired,
  emailField: PropTypes.object.isRequired,
};
