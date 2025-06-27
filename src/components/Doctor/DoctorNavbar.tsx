import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {LOGO_URL} from '../../constants/appConfig';
import { useAuth } from '../../contexts/ContextsAuth';
import {profileIcon} from "../../constants/assets";
import {useNavigate} from "react-router-dom";

interface Props {
    onSelect: (section: string) => void;
    selected: string;
}

const DoctorNavbar: React.FC<Props> = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        const newTheme = !isDark;
        setIsDark(newTheme);
        root.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const dark = savedTheme === 'dark';
        setIsDark(dark);
        if (dark) {
            document.documentElement.classList.add('dark');
        }
    }, []);


    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className="fixed top-0 w-full z-50 shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left: Logo + Language Switch */}
                <div className="flex items-center gap-4">
                    <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded-full" />
                    <span className="text-lg font-semibold">Clinic Dashboard</span>
                    <div className="relative group">
                        <button className="flex items-center space-x-1">
                            <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-5 h-5 rounded-sm" />
                            <span className="text-sm">EN</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute mt-2 w-28 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            <button onClick={toggleLang} className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                                {i18n.language === 'en' ? 'العربية' : 'English'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Theme Toggle + User Profile */}
                <div className="flex items-center gap-6">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="hover:text-yellow-300 transition"
                        title="Toggle theme"
                    >
                        {isDark ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m8.66-11.66l-.7.7M4.34 4.34l.7.7M21 12h-1M4 12H3m15.66 4.34l-.7-.7M4.34 19.66l.7-.7M12 7a5 5 0 000 10a5 5 0 000-10z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                />
                            </svg>
                        )}
                    </button>

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
