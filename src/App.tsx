import React, { useEffect } from 'react';
import { useAuth } from './contexts/ContextsAuth';
import { setupInterceptors } from './services/api';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useTranslation } from 'react-i18next';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentBookingPage from './pages/PatientPage/AppointmentBookingPage';
import BookingPage from './pages/PatientPage/BookingPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorPatientPage from "./pages/DoctorPage/DoctorPatientPage";
import DoctorAppointmentPage from "./pages/DoctorPage/DoctorAppointmentPage";
import ProfilePage from './pages/PatientPage/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DrugPage from "./pages/DrugPage";
import AddDrugPage from './pages/PatientPage/AddDrugPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import MyDrugPage from "./pages/PatientPage/MyDrugPage";
import DoctorHomePage from "./pages/DoctorPage/DoctorHomePage";
import HelpCenterPage from "./pages/HelpCenterPage";

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
            <Route path="/drugs" element={<DrugPage />} />
            <Route path="/add-drug" element={<AddDrugPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/my-drug" element={<MyDrugPage />}/>
            <Route path="/doctor-home" element={<DoctorHomePage/>}/>
            <Route path="/doctor-home/patient/:id" element={<DoctorPatientPage />} />
            <Route path="/doctor-home/appointment/:id" element={<DoctorAppointmentPage />} />
            <Route path="/help-center" element={<HelpCenterPage />}/>
        </Routes>
    </Router>
    );
};

export default App;
