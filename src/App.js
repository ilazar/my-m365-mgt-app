import { Providers, ProviderState } from '@microsoft/mgt';
import { Get, Login } from '@microsoft/mgt-react';
import React, { useState, useEffect } from 'react';
import './App.css';

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };
    Providers.onProviderUpdated(updateState);
    updateState();
    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    }
  }, []);
  return { isSignedIn };
}

function App() {
  const [isImporting, setImporting] = useState(false);
  const { isSignedIn } = useIsSignedIn();
  useEffect(() => setImporting(true), [isSignedIn]);
  const log = event => () => console.log(event);
  const handleDataChange = e => {
    setImporting(false);
    if (e.detail.error) {
      console.warn('Failed to fetch contacts', e.detail.error);
    } else {
      const contacts = e.detail.response.value;
      console.log('Fetched contacts');
      contacts.forEach(console.log);
    }
  };

  return (
    <div className="App">
      <div>Outlook Contacts</div>
      <Login
        loginInitiated={log('loginInitiated')}
        loginCompleted={log('loginCompleted')}
        loginFailed={log('loginFailed')}
        logoutCompleted={log('logoutCompleted')}
      />
      {isSignedIn && (
        <>
          <Get
            resource="me/contacts"
            maxPages={10}
            dataChange={handleDataChange}
          />
          {isImporting && <div>Importing...</div>}
        </>
      )}
    </div>
  );
}

export default App;
