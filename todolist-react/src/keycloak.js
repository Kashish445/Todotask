// // src/keycloak.js
// import Keycloak from 'keycloak-js';

// const keycloakConfig = {
//   realm: 'Myrealm',
//   url: 'http://localhost:8080/auth',
//   clientId: 'Login',
// };

// const keycloak = Keycloak(keycloakConfig);

// export default keycloak;
// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  realm: 'Myrealm',
  url: 'http://localhost:8080/auth',
  clientId: 'Login',
};

const keycloak = new Keycloak(keycloakConfig);
console.log('Keycloak instance:', keycloak);

export default keycloak;
