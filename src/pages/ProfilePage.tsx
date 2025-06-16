import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="p-6 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                </div>
                <p className="text-lg font-semibold">{user?.username}</p>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    {t('logout')}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
