import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Asegúrate de que esta URI coincida con tu servidor GraphQL
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Aquí añadimos ApolloProvider */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
