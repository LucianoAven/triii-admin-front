/* eslint-disable indent */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AccountContext } from 'context/Account';
import { verificationCodeControl } from 'helpers/authControl';
import { useTranslation } from 'react-i18next';
import useField from 'hooks/useField';
import { Input, FormNotificationError } from 'components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

export default function VerificationCodeForm({ setStage, email }) {
  const { t } = useTranslation();
  const { setUser, resendVerificationCode } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const verificationCodeField = useField('number');

  const inputFormControl = () => {
    const verificationCode = verificationCodeField.atributes.value;

    verificationCodeControl(verificationCode)
      ? verificationCodeField.actions.onSuccess()
      : verificationCodeField.actions.onError(
          <FormNotificationError
            errorMsg={t('error.incorrectCode')}
          />,
        );
  };

  const handleConfirmSignUpError = (err) => {
    const { name } = err;
    console.log('Error: ', err);
    console.log('Nombre del error: ', name);

    if (name === 'ExpiredCodeException') {
      verificationCodeField.actions.onError(
        <FormNotificationError
          errorMsg={t('error.expiredCode')}
        />,
      );
    }

    if (name === 'CodeMismatchException') {
      verificationCodeField.actions.onError(
        <FormNotificationError
          errorMsg={t('verifyError.incorrectCode')}
        />,
      );
    }
  };

  const confirmSignUp = () => {
    const verificationCode = verificationCodeField.atributes.value;
    const user = setUser(email);

    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        handleConfirmSignUpError(err);
      } else {
        console.log('Confirm sign up success: ' + JSON.stringify(result));
        setStage('success');
      }
    });
  };

  const onSubmit = (event) => {
    const verificationCode = verificationCodeField.atributes.value;

    event.preventDefault();
    setLoading(true);

    inputFormControl();

    if (verificationCodeControl(verificationCode)) {
      confirmSignUp();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Input
          label={t('global.verificationCode')}
          atributes={verificationCodeField.atributes}
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
                {t('verify.didNotReceiveCode')}
                <Link
                  component={'a'}
                  color={'primary'}
                  to={''}
                  underline={'none'}
                  onClick={() => resendVerificationCode(email)}
                >
                  {t('verify.resendCode')}
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
                t('verify.verifyAccount')
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

VerificationCodeForm.propTypes = {
  setStage: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
