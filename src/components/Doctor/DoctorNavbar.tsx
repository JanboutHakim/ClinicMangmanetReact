import React from 'react';
import { useTranslation } from 'react-i18next';
import { LOGO_URL } from '../../constants/appConfig';
import { useAuth } from '../../contexts/ContextsAuth';
import { profileIcon } from "../../constants/assets";
import { useNavigate } from "react-router-dom";
import {getColors} from "../../constants/theme";
import {useTheme} from "../../contexts/ThemeContext";
import ModeSwitch from "../ModeSwitch";

interface Props {
    onSelect: (section: string) => void;
    selected: string;
}

const DoctorNavbar: React.FC<Props> = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { mode, toggleTheme } = useTheme();
    const COLORS = getColors(mode)


    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 shadow-md bg-white text-gray-800"
        style={{backgroundColor:COLORS.primary}}>
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left: Logo + Language Switch */}
                <div className="flex items-center gap-4 justify-start px-0">
                    <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded-full" />
                    <span className="text-lg font-semibold">{t("salamtak")}</span>
                    <div className="relative group">
                        <button
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-haspopup="true"
                        >
                            <img
                                src={i18n.language === 'ar'
                                    ? "https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Syria_%282025-%29.svg"
                                    // Syrian flag for Arabic
                                    : 'https://flagcdn.com/w40/us.png'  // US flag for English
                                }
                                alt={i18n.language === 'ar' ? 'AR' : 'EN'}
                                className="w-8 h-5 rounded-sm object-cover" // rectangle aspect ratio (8:5)
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
      {i18n.language === 'ar' ? 'AR' : 'EN'}
    </span>
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 group-hover:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <div className={`absolute ${i18n.language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform scale-95 group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 z-50`}>
                            <button
                                onClick={toggleLang}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                            >
                                {i18n.language === 'en' ? 'العربية' : 'English'}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right: Theme Toggle + User Profile */}
                <div className="flex items-center gap-6">
                   <ModeSwitch mode={mode} setMode={toggleTheme}   />

                    {/* Profile Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 focus:outline-none">
                            <img
                                src={user?.imageUrl || profileIcon}
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium">{user?.username || 'Doctor'}</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                👤 {t('profile') || 'Profile'}
                            </a>
                            <a href="#" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                                🚪 {t('logout') || 'Logout'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DoctorNavbar;
