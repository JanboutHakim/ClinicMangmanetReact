import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import HomePage from './pages/HomePage';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HomePage />
  </React.StrictMode>
);
