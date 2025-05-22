import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Render the app directly without backend dependencies
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);