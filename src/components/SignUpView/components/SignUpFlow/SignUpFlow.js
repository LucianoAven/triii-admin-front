import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { SignUpForm } from './components';
import VerificationCodeForm from 'components/VerificationCodeForm/VerificationCodeForm';
import VerificationSuccessBox from 'components/VerificationSuccessBox/VerificationSuccessBox';
import FormNotificationSuccess from 'components/FormNotificationSuccess/FormNotificationSuccess';

export default function SignInFlow({ stage, setStage, emailField }) {
  const { t } = useTranslation();
  return (
    <>
      {stage === 'signUp' && (
        <SignUpForm setStage={setStage} emailField={emailField} />
      )}
      {stage === 'emailVerification' && (
        <FormNotificationSuccess
          successMsg={t('verify.signUpSuccess')}
        />
      )}
      {stage === 'emailVerification' && (
        <VerificationCodeForm
          setStage={setStage}
          email={emailField.atributes.value}
        />
      )}
      {stage === 'success' && (
        <VerificationSuccessBox
          successMsg={t('success.verifyAccount')}
          redirectLink={true}
        />
      )}
    </>
  );
}

SignInFlow.propTypes = {
  stage: PropTypes.string.isRequired,
  setStage: PropTypes.func.isRequired,
  emailField: PropTypes.object.isRequired,
};
