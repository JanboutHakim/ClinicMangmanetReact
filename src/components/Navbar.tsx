import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/ContextsAuth';
import { COLORS } from '../constants/theme';
import { logo } from '../constants/assets';

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
            <Link to="/">
                <img src={logo} alt="Logo" className="h-8" />
            </Link>
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
                        <Link to="/book" className="hover:underline">
                            {t('book')}
                        </Link>
                        <Link to="/my-appointments" className="hover:underline">
                            {t('appointments')}
                        </Link>
                        <Link to="/profile">
                            <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="hover:underline">
                        {t('login')}
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
