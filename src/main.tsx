// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/ContextsAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';
import './i18n/i18n';
import {MantineProvider} from "@mantine/core";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <MantineProvider >
            <AuthProvider>
                <App />
            </AuthProvider>
            </MantineProvider>
        </ThemeProvider>
    </React.StrictMode>
);
