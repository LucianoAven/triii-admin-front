import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { SignInForm } from './components';
import FormNotificationInfo from 'components/FormNotificationInfo/FormNotificationInfo';
import VerificationCodeForm from 'components/VerificationCodeForm/VerificationCodeForm';
import VerificationSuccessBox from 'components/VerificationSuccessBox/VerificationSuccessBox';


export default function SignInFlow({ stage, setStage, emailField }) {
  const { t } = useTranslation();

  return (
    <>
      {stage === 'signIn' && (
        <SignInForm setStage={setStage} emailField={emailField} />
      )}
      {stage === 'emailVerification' && (
        <FormNotificationInfo
          infoMsg={t('verify.checkYourInbox')}
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
          redirectLink={false}
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
