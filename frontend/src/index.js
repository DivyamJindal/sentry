import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './config/auth0-config';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);

reportWebVitals();
