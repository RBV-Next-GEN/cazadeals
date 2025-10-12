import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/custom.css'; // <-- Añade esta línea para importar tu CSS personalizado
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
