import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { UserProvider } from './contexts/user.context';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        {/* vado a specificare che tutti i component all'interno di questo tag,
        nel mio caso tutti, perchè ho wrappato App, avranno accesso alle due var esplicitate
        nel context(ovvero il context stesso e la funzione per settarlo) */}
        <App /> 
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
