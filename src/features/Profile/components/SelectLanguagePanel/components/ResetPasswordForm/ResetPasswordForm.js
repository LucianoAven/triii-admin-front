/* eslint-disable default-case */
import React, { useState, useContext } from 'react';
import { StyleContext } from '../../../../../../style/styleProvider';
import PropTypes from 'prop-types';
// import Pool from '../../../../../../authentication/authenticationConfig';
import { useTranslation } from 'react-i18next';
import useField from '../../../../../../hooks/useField';
import Pool from '../../../../../../auth/UserPool';
import {
  Input,
  FormNotificationError,
  FormNotificationInfo,
} from '../../../../../../components';
import {
  passwordInputControl,
  verificationCodeControl,
} from '../../../../../../helpers/authControl';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Spinner from 'react-bootstrap/Spinner';

const ResetPasswordForm = ({ setStage }) => {
  const { buttonSize } = useContext(StyleContext);
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const verCodeInput = useField('number');
  const newPasswordInput = useField('password');
  const repeatNewPasswordInput = useField('password');

  const error = showError ? (
    <Fade in={showError}>
      <Box display={'flex'} color="red" alignItems={'center'} mb={3}>
        <FormNotificationError errorMsg={t('resetPassword.error.limitExceeded')} />
      </Box>
    </Fade>
  ) : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    const cognitoUser = Pool.getCurrentUser();
    const newPassword = newPasswordInput.atributes.value;
    const repeatNewPassword = repeatNewPasswordInput.atributes.value;
    const verCode = verCodeInput.atributes.value;

    setIsLoading(true);
    inputFormControl();

    if (
      verificationCodeControl(verCode) &&
      passwordInputControl(newPassword) &&
      newPassword === repeatNewPassword
    ) {
      console.log('entre!');
      cognitoUser.confirmPassword(verCode, newPassword, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          verCodeInput.actions.resetValue();
          newPasswordInput.actions.resetValue();
          repeatNewPasswordInput.actions.resetValue();
          setStage('initial');
        },
        onFailure: (err) => {
          handleResetPasswordErr(err);
        },
      });
    }

    setIsLoading(false);
  };

  const inputFormControl = () => {
    const newPassword = newPasswordInput.atributes.value;
    const repeatNewPassword = repeatNewPasswordInput.atributes.value;
    const verCode = verCodeInput.atributes.value;

    verificationCodeControl(verCode)
      ? verCodeInput.actions.onSuccess()
      : verCodeInput.actions.onError(
          <FormNotificationError errorMsg={t('resetPassword.error.code')} />
        );

    passwordInputControl(newPassword)
      ? newPasswordInput.actions.onSuccess()
      : newPasswordInput.actions.onError(
          <FormNotificationError errorMsg={t('resetPassword.error.password')} />
        );

    if (newPassword === repeatNewPassword) {
      repeatNewPasswordInput.actions.onSuccess();
    } else {
      newPasswordInput.actions.onError(
        <FormNotificationError errorMsg={t('resetPassword.error.passwordMatch')} />
      );
      repeatNewPasswordInput.actions.onError(
        <FormNotificationError errorMsg={t('resetPassword.error.passwordMatch')} />
      );
    }
  };

  const handleResetPasswordErr = (err) => {
    const { name } = err;

    switch (name) {
      case 'CodeMismatchException':
        verCodeInput.actions.onError(
          <FormNotificationError
            errorMsg={t('resetPassword.error.verCodeMismatch')}
          />
        );
        break;
      case 'LimitExceededException':
        setShowError(true);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormNotificationInfo infoMsg={t('resetPassword.passwordResetEmailSent')} />
      {error}
      <Grid container spacing={3}>
        <Input
          label={t('resetPassword.form.verCode')}
          atributes={verCodeInput.atributes}
        />
        <Input
          label={t('resetPassword.form.newPassword')}
          atributes={newPasswordInput.atributes}
        />
        <Input
          label={t('resetPassword.form.confirmNewPassword')}
          atributes={repeatNewPasswordInput.atributes}
        />
        <Grid item container xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            justifyContent={'flex-end'}
            width={1}
            margin={'0 auto'}
          >
            <Box marginBottom={{ xs: 1, sm: 0 }}>
              <Button
                size={buttonSize.responsive}
                variant={'contained'}
                type={'submit'}
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <Spinner
                      style={{
                        height: '1rem',
                        width: '1rem',
                        fontSize: '12px',
                      }}
                      animation="border"
                    />
                  ) : null
                }
              >
                {isLoading
                  ? t('resetPassword.form.savingNewPassword')
                  : t('resetPassword.form.saveNewPassword')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
