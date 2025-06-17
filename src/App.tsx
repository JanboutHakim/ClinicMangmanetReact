import React, { useEffect } from 'react';
import { useAuth } from './contexts/ContextsAuth';
import { setupInterceptors } from './services/api';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useTranslation } from 'react-i18next';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import BookingPage from './pages/BookingPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
    const { accessToken, refreshToken, login, logout } = useAuth();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (accessToken && refreshToken) {
            setupInterceptors(accessToken, refreshToken, login, logout);
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    }, [i18n.language]);

    return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/book" element={<DoctorsPage />} />
            <Route path="/book/:doctorId" element={<AppointmentBookingPage />} />
            <Route path="/book/:doctorId/confirm" element={<BookingPage />} />
            <Route path="/my-appointments" element={<AppointmentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </Router>
    );
};

export default App;
