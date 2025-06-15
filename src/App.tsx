import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/ContextsAuth';
import { setupInterceptors } from './services/api';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useTranslation } from 'react-i18next';
import AppointmentBookingPage from "./pages/AppointmentBookingPage";
import appointmentsData from "./data/appointments.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    const { accessToken, refreshToken, login, logout } = useAuth();
    const { i18n } = useTranslation();
    const [page, setPage] = useState<'home' | 'login'>(() =>
        window.location.hash === '#/login' ? 'login' : 'home'
    );

    useEffect(() => {
        if (accessToken && refreshToken) {
            setupInterceptors(accessToken, refreshToken, login, logout);
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    }, [i18n.language]);

    useEffect(() => {
        const onHash = () => {
            setPage(window.location.hash === '#/login' ? 'login' : 'home');
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    if (page === 'login') return <AuthPage />;
    return (<Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
        </Routes>
    </Router>);
};

export default App;
