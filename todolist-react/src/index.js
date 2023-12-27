// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// src/index.js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const initOptions = {
  onLoad: 'login-required',
};

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <App />
  </ReactKeycloakProvider>,
  document.getElementById('root')
);
// import React from 'react';
// import ReactDOM from 'react-dom';
// import AppWrapper from './App';
// import { ApolloProvider } from '@apollo/client';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51ORgtSSCCAPHVW4G3wOr5vYTTyhQNFtp5Za20W2xyR3DJT6FQaPqY1E6ymNUNUFGjNmjhOCH7ZFc1tyO5P4KxMRu0003jPGqgX');

// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
//   cache: new InMemoryCache(),
// });

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <Elements stripe={stripePromise}>
//         <AppWrapper />
//       </Elements>
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
