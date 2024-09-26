import { CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'sa-east-1_81dIzrFFU',
  ClientId: '12rg9i8fotah5dt9ms8mfmn2mq',
  Storage: new CookieStorage({
    secure: false,
    domain: window.location.host.replace('account.', '').replace('account.', '').replace(':3000', ''),
  }),
};

export default new CognitoUserPool(poolData);
