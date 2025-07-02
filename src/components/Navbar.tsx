import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/ContextsAuth';
import { getColors } from '../constants/theme';
import { logo } from '../constants/assets';
import {useTheme} from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const [imageError, setImageError] = useState(false);
    const {mode} = useTheme();
    const COLORS = getColors(mode);


    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav
            className="flex justify-between items-center px-6 py-4 text-white"
            style={{ backgroundColor: COLORS.primary }}
        >
            <Link to="/">
                <img src={logo} alt="Logo" className="h-16" />
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
                <button className="bg-white text-blue-700 px-3 py-1 rounded-full transform transition-transform duration-300 hover:scale-105 will-change-transform"
                style={{ color: COLORS.primary }}>
                    {t('provider')}
                </button>
                <a href="/help-center" className="hover:underline">
                    {t('help')}
                </a>
                {!user && (
                    <a href="/drugs" className="hover:underline">
                        {t('drug')}
                    </a>
                )}

                <button onClick={toggleLang} className="hover:underline">
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
                {user ? (
                    <>
                        <a href="/my-drug" className="hover:underline">
                            {t('myDrug')}
                        </a>
                        <Link to="/drugs" className="hover:underline">
                            {t('addDrug')}
                        </Link>
                        <Link to="/my-appointments" className="hover:underline">
                            {t('appointments')}
                        </Link>
                        <Link to="/profile">
                            {user.imageUrl && !imageError ? (
                                <img
                                    src={`http://localhost:8080${user.imageUrl}`}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                    onError={() => setImageError(true)} // 👈 fallback if image fails
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            )}
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
