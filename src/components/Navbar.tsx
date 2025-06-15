import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/ContextsAuth';
import { COLORS } from '../constants/appConfig';
import logo from '../assets/logo.jpg'; // adjust path as needed

const Navbar: React.FC = () => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav
            className="flex justify-between items-center px-6 py-4 text-white"
            style={{ backgroundColor: COLORS.primary }}
        >
            <img src={logo} alt="Logo" className="h-8" />
            <div className="flex items-center gap-6 text-sm font-medium">
                <button className="bg-white text-blue-700 px-3 py-1 rounded-full transform transition-transform duration-300 hover:scale-105 will-change-transform"
                style={{ color: COLORS.primary }}>
                    {t('provider')}
                </button>
                <a href="#" className="hover:underline">
                    {t('help')}
                </a>
                <button onClick={toggleLang} className="hover:underline">
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
                {user ? (
                    <>
                        <a href="/appointments" className="hover:underline">
                            {t('appointments')}
                        </a>
                        <a href="/profile" className="hover:underline">
                            {t('profile')}
                        </a>
                    </>
                ) : (
                    <a href="/login" className="hover:underline">
                        {t('login')}
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
