import React, { useEffect } from 'react';
import { useAuth } from './contexts/ContextsAuth';
import { setupInterceptors } from './services/api';
import AuthPage from './pages/AuthPage';

const App = () => {
    const { accessToken, refreshToken, login, logout } = useAuth();

    useEffect(() => {
        if (accessToken && refreshToken) {
            setupInterceptors(accessToken, refreshToken, login, logout);
        }
    }, [accessToken, refreshToken]);

    return <AuthPage />;
};

export default App;
