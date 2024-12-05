import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

//router
import { BrowserRouter, RouterProvider } from 'react-router-dom'
//store

import { Provider } from 'react-redux';
//reducer
import { store } from './store'
import router from './router/router';
import { ContextProvider } from './context/ContextProvider';
import Store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={Store}>
        <App />
      </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
