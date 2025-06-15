// src/pages/HomePage.tsx
import React from 'react';
import { COLORS } from '../constants/appConfig';
import { useAuth } from '../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.jpg'; // adjust path if needed
import heroImage from '../assets/doctor2.png'; // right-side doctor image

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 text-white" style={{ backgroundColor: COLORS.primary }}>
                <img src={logo} alt="Logo" className="h-8" />
                <div className="flex items-center space-x-6 text-sm font-medium">
                    <button className="bg-white text-blue-700 px-3 py-1 rounded-full">Are you a provider?</button>
                    <a href="#" className="hover:underline">Help Center</a>
                    <button onClick={toggleLang} className="hover:underline">
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </button>
                    {user ? (
                        <>
                            <a href="/appointments" className="hover:underline">{t('appointments')}</a>
                            <a href="/profile" className="hover:underline">{t('profile')}</a>
                        </>
                    ) : (
                        <a href="#/login" className="hover:underline">{t('login')}</a>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-blue-600 text-white h-[500px] overflow-hidden">
                {/* Left Side Content */}
                <div className="relative z-10 flex flex-col justify-center px-10 py-16 max-w-xl space-y-8">
                    <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>

                    {/* Search bar */}
                    <div className="flex flex-col md:flex-row bg-white rounded-full overflow-hidden shadow-lg">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
                        />

                        <button className="bg-blue-900 text-white px-6 py-3 font-semibold hover:bg-blue-800 transition">
                            Search →
                        </button>
                    </div>
                </div>

                {/* Floating Image */}
                <img
                    src={heroImage}
                    alt="Doctor"
                    className="absolute bottom-0 right-0 h-[500px] object-contain z-0"
                />
            </div>


            {/* Below Section (optional) */}
            <section className="py-12 text-center text-gray-800">
                <h2 className="text-xl font-semibold">Your everyday partner in health</h2>
            </section>
        </div>
    );
};

export default HomePage;
