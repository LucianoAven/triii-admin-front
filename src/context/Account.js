import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CognitoUser,
  AuthenticationDetails,
  CookieStorage,
} from 'amazon-cognito-identity-js';
import Pool from '../auth/UserPool';

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [session, setSessionContext] = useState(false);

  useEffect(() => {
    getSession()
      .then((session) => {
        setSessionContext(session);
      })
      .catch(() => null);
  }, []);

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    // user.getDe;
    
    if (user) {
      user.signOut();
    }
    setSessionContext(false);
  };

  const setUser = (Username) => {
    return new CognitoUser({
      Username,
      Pool,
      Storage: new CookieStorage({
        secure: false,
        domain: window.location.host.replace('account.', '').replace(':3000', '').replace(':3001', ''),
      }),
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = setUser(Username);

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('onSuccess: ', result);
          resolve(result);
        },
        onFailure: (err) => {
          console.error('onFailure: ', err);
          reject(err);
        },
        newPasswordRequired: (result) => {
          console.log('newPasswordRequired: ', result);
          resolve(result);
        },
      });
    });
  };

  const resendVerificationCode = (email) => {
    const user = setUser(email);

    user.resendConfirmationCode((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          'Resend verification code Success: ' + JSON.stringify(result),
        );
      }
    });
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        session,
        setSessionContext,
        setUser,
        resendVerificationCode,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountProvider;
