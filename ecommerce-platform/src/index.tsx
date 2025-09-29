import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="app-container">
      <h1 className="bubbly-text">Welcome to the Store!</h1>
      <App />
    </div>
  </React.StrictMode>
);



