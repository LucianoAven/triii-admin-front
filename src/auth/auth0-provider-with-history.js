import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || "trii-admin.us.auth0.com";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "x05Qkk3OAiAuCyjurbBGUQR1j4GBtjI32";
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE || "https://api.triiadmin.com";


  //get clientId,audience from API
  const getAuth0Params = async () => {
    try {
      const response = await fetch(`https://api.triiadmin.com/api/messages/public-message`);

      // const responseData = await response.json();

      // domain='123'
      // clientId='123'
      // audience='123'
      console.log('getAuth0Params')
    } catch (error) {
      console.log('getAuth0Params error')
      // setMessage(error.message);
    }
  };

  getAuth0Params();
  

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
