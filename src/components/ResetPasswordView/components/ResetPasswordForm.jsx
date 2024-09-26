/* eslint-disable indent */
import React, { Fragment, useContext, useState } from 'react';
import { AccountContext } from 'context/Account';
import { useTranslation } from 'react-i18next';
import {
  emailInputControl,
  passwordInputControl,
  verificationCodeControl,
} from 'helpers/authControl';
import { Success, Error } from './components';
import { Input, FormNotificationError } from 'components';
import useField from 'hooks/useField';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function ResetPasswordForm({ stage, setStage }) {
  const { t } = useTranslation();
  const { setUser } = useContext(AccountContext);
  const [showError, setShowError] = useState(false);
  const email = useField('text');
  const verCode = useField('number');
  const newPassword = useField('password');
  const repeatNewPassword = useField('password');

  const firstStageSubmit = () => {
    emailInputControl(email.atributes.value)
      ? sendCode()
      : email.actions.onError(
          <FormNotificationError
            errorMsg={t('error.email')}
          />,
        );
  };

  const sendCode = async () => {
    const user = setUser(email.atributes.value);

    user.forgotPassword({
      onSuccess: (data) => {
        console.log('onSuccess: ', data);
      },
      onFailure: (err) => {
        console.log('onFailure: ', err);
      },
      inputVerificationCode: (data) => {
        console.log('Input code: ', data);
        setStage(2);
      },
    });
  };

  const handleResetPasswordErr = (err) => {
    const { name } = err;
    console.log(name);
    console.log(err);

    switch (name) {
      case 'CodeMismatchException':
        verCode.actions.onError(
          <FormNotificationError
            errorMsg={t('error.codeMismatch')}
          />,
        );
        break;

      case 'LimitExceededException':
        setShowError('LimitExceededException');
        break;

      default:
        setShowError('DefaultError');
        break;
    }
  };

  const inputFormControl = () => {
    const newPasswordInputValue = newPassword.atributes.value;
    const repeatNewPasswordInputValue = repeatNewPassword.atributes.value;
    const verCodeInputValue = verCode.atributes.value;

    verificationCodeControl(verCodeInputValue)
      ? verCode.actions.onSuccess()
      : verCode.actions.onError(
          <FormNotificationError
            errorMsg={t('error.code')}
          />,
        );

    passwordInputControl(newPasswordInputValue)
      ? newPassword.actions.onSuccess()
      : newPassword.actions.onError(
          <FormNotificationError
            errorMsg={t('error.password')}
          />,
        );

    if (newPasswordInputValue === repeatNewPasswordInputValue) {
      repeatNewPassword.actions.onSuccess();
    } else {
      newPassword.actions.onError(
        <FormNotificationError
          errorMsg={t('error.passwordMatch')}
        />,
      );
      repeatNewPassword.actions.onError(
        <FormNotificationError
          errorMsg={t('error.passwordMatch')}
        />,
      );
    }
  };

  const secondStageSubmit = async () => {
    const user = setUser(email.atributes.value);
    const newPasswordInputValue = newPassword.atributes.value;
    const repeatNewPasswordInputValue = repeatNewPassword.atributes.value;
    const verCodeInputValue = verCode.atributes.value;

    inputFormControl();

    if (
      verificationCodeControl(verCodeInputValue) &&
      passwordInputControl(newPasswordInputValue) &&
      newPasswordInputValue === repeatNewPasswordInputValue
    ) {
      user.confirmPassword(verCodeInputValue, newPasswordInputValue, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          setStage(3);
        },
        onFailure: (err) => {
          handleResetPasswordErr(err);
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    stage === 1 ? firstStageSubmit() : secondStageSubmit();
  };

  return (
    <Card sx={{ p: { xs: 4, md: 6 } }}>
      <form onSubmit={(event) => handleSubmit(event)}>
        {showError && <Error showError={showError} />}
        <Grid container spacing={4}>
          {stage === 1 && (
            <Input
              label={t('global.enterEmail')}
              atributes={email.atributes}
            />
          )}
          {stage === 2 && (
            <Fragment>
              <Input
                label={t('global.verificationCode')}
                atributes={verCode.atributes}
              />
              <Input
                label={t('resetPasswordForm.newPassword')}
                atributes={newPassword.atributes}
              />
              <Input
                label={t('resetPasswordForm.confirmNewPassword')}
                atributes={repeatNewPassword.atributes}
              />
            </Fragment>
          )}
          {stage === 3 && <Success />}
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={stage === 3 ? 'center' : 'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Button
                  size={'medium'}
                  variant={'outlined'}
                  component={Link}
                  href={'/signin'}
                  fullWidth
                >
                  {t('global.backToLogin')}
                </Button>
              </Box>
              {stage !== 3 && (
                <Button size={'medium'} variant={'contained'} type={'submit'}>
                  {stage === 1 &&
                    t('emailForm.sendResetLink')}
                  {stage === 2 &&
                    t('resetPasswordForm.resetYourPassword')}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

ResetPasswordForm.propTypes = {
  stage: PropTypes.number.isRequired,
  setStage: PropTypes.func.isRequired,
};
