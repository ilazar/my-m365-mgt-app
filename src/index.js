import React from 'react';
import ReactDOM from 'react-dom';
import { Providers } from '@microsoft/mgt-element';
import { MsalProvider } from '@microsoft/mgt-msal-provider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Providers.globalProvider = new MsalProvider({
  clientId: 'c8fdf039-6c7f-4e4c-a78d-1ed55d62b8e3',
  scopes: ['contacts.read', 'user.read']
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
