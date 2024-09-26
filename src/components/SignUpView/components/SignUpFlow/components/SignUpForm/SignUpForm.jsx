/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import UserPool from 'auth/UserPool';
import useField from 'hooks/useField';
import { emailInputControl, passwordInputControl } from 'helpers/authControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import FormNotificationError from 'components/FormNotificationError/FormNotificationError';
import Input from 'components/Input/Input';

export default function SignUpForm({ setStage, emailField }) {
  const passwordField = useField('password');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const inputFormControl = () => {
    const email = emailField.atributes.value;
    const password = passwordField.atributes.value;

    emailInputControl(email)
      ? emailField.actions.onSuccess()
      : emailField.actions.onError(
          <FormNotificationError
            errorMsg={t('error.emailError')}
          />,
        );

    passwordInputControl(password)
      ? passwordField.actions.onSuccess()
      : passwordField.actions.onError(
          <FormNotificationError
            errorMsg={t('error.passwordLenghtError')}
          />,
        );
  };

  const handleSignUpErr = (err) => {
    const { name } = err;

    if (name === 'UsernameExistsException') {
      emailField.actions.onError(
        <FormNotificationError
          errorMsg={t('error.emailExists')}
        />,
      );
    }
    if (name === 'InvalidPasswordException') {
      const mesagge = err.message.split(':')[1].trim();
      switch (mesagge) {
        case 'Password must have lowercase characters':
          passwordField.actions.onError(
            <FormNotificationError
              errorMsg={t('error.passwordLowerCaseError')}
            />,
          );
          break;
        case 'Password must have uppercase characters':
          passwordField.actions.onError(
            <FormNotificationError
              errorMsg={t('error.passwordUpperCaseError')}
            />,
          );
          break;
        case 'Password must have symbol characters':
          passwordField.actions.onError(
            <FormNotificationError
              errorMsg={t('error.passwordSymbolError')}
            />,
          );
          break;
          default:
            break;
      }
    }
  };

  const signUp = async () => {
    UserPool.signUp(
      emailField.atributes.value,
      passwordField.atributes.value,
      [],
      null,
      (err, success) => {
        if (err) {
          console.error('Error: ', err);
          console.error('Nombre de Error: ', err.name);
          console.error('Mensaje de Error: ', err.message);
          console.error('Mensaje de Error sliced: ', err.message.split(':')[1]);
          handleSignUpErr(err);
        } else {
          console.log(success);
          setStage('emailVerification');
        }
      },
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const email = emailField.atributes.value;
    const password = passwordField.atributes.value;

    setLoading(true);

    inputFormControl();

    if (emailInputControl(email) && passwordInputControl(password)) {
      await signUp();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Input
          label={t('global.enterEmail')}
          atributes={emailField.atributes}
        />
        <Input
          label={t('global.enterPassword')}
          atributes={passwordField.atributes}
        />
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
                {t('signUp.alreadyHaveAccount')}
                <Link
                  component={'a'}
                  color={'primary'}
                  to={'/signin'}
                  underline={'none'}
                  href={'/signin'}
                >
                  {t('global.login')}
                </Link>
              </Typography>
            </Box>
            <Button
              size={'large'}
              style={{ minWidth: 140 }}
              variant={'contained'}
              type={'submit'}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: green[300] }} />
              ) : (
                t('global.signup')
              )}
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography
            variant={'subtitle2'}
            color={'text.secondary'}
            align={'center'}
          >
            {t('signUp.byClicking')}
            <Link
              component={'a'}
              color={'primary'}
              href={'#'}
              underline={'none'}
              marginLeft={1}
            >
              {t('signUp.terms')}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

SignUpForm.propTypes = {
  setStage: PropTypes.func.isRequired,
  emailField: PropTypes.object.isRequired,
};
