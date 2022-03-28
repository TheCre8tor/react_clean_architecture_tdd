import React from 'react';
import { render as RenderDom } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

RenderDom(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
