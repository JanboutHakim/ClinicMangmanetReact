// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/ContextsAuth';
import App from './App';
import './index.css';
import HomePage from "./pages/HomePage";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <HomePage />
        </AuthProvider>
    </React.StrictMode>
);
