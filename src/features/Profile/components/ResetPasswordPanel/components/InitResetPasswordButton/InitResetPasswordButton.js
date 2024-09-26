import React, { useContext } from 'react';
// import Pool from '../../../../../../authentication/authenticationConfig';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../../../../../style/styleProvider';
import Button from '@mui/material/Button';
import Pool from '../../../../../../auth/UserPool';

const InitResetPasswordButton = ({ setStage }) => {
  const { t } = useTranslation();
  const { buttonSize } = useContext(StyleContext);

  const initFlow = (event) => {
    event.preventDefault();
    sendConfirmationEmail();
    setStage('reset');
  };

  const sendConfirmationEmail = () => {
    const cognitoUser = Pool.getCurrentUser();

    cognitoUser.forgotPassword({
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

  return (
    <Button type="button" variant="outlined" size={buttonSize.sm} onClick={initFlow}>
      {t('resetPassword.changePassword')}
    </Button>
  );
};

InitResetPasswordButton.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default InitResetPasswordButton;
