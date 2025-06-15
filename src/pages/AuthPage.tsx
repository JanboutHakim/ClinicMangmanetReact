// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '../constants/appConfig';
import { LOGO_URL, SIGNUP_BG } from '../constants/assets';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const { t } = useTranslation();

    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center px-10">
                <div className="w-full max-w-sm">
                    <img
                        src={LOGO_URL}
                        alt="Logo"
                        className="absolute top-4 left-4 h-10 w-auto z-50"
                    />
                    <h2 className="text-xl text-gray-500">{t('startJourney')}</h2>
                    <h1 className="text-3xl font-bold mb-6">
                        {mode === 'login' ? t('signInTo') : t('signUpTo')} {APP_NAME}
                    </h1>

                    {mode === 'login' ? (
                        <LoginForm onSwitch={() => setMode('signup')} />
                    ) : (
                        <SignupForm onSwitch={() => setMode('login')} />
                    )}

                </div>
            </div>

            <div className="hidden md:block">
                <img src={SIGNUP_BG} alt="Signup" className="object-cover w-full h-full" />
            </div>
        </div>
    );
};

export default AuthPage;
