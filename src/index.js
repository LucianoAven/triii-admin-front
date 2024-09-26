import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n'; //Traduccion
import { I18nextProvider } from 'react-i18next';
import DataProvider from './context/contextApi';
import StyleProvider from './style/styleProvider';
import i18next from 'i18next';
import { store } from './ReduxToolkit/store.ts';
import { Provider } from 'react-redux';
import AccountProvider from 'context/Account';

ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={null}>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <AccountProvider>
          <DataProvider>
            <StyleProvider>
              <Router>
                <App />
              </Router>
            </StyleProvider>
          </DataProvider>
        </AccountProvider>
      </Provider>
    </I18nextProvider>
  </Suspense>,
  // </React.StrictMode>
  document.getElementById('root')
);
