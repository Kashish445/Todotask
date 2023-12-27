// src/components/ExampleComponent.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ExampleComponent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (keycloak.authenticated) {
    return (
      <div>
        <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
        <button onClick={() => keycloak.logout()}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not authenticated. Please log in.</p>
        <button onClick={() => keycloak.login()}>Login</button>
      </div>
    );
  }
};

export default ExampleComponent;
