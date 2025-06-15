import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginPage from './LoginPage';

const HomePage: React.FC = () => {
  const [page, setPage] = useState<'home' | 'login'>('home');
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  if (page === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-4">
        <button
          onClick={toggleLang}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          {i18n.language === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
      <div className="flex flex-col items-center flex-grow justify-center gap-4">
        <h1 className="text-3xl">{t('welcome')}</h1>
        <button
          onClick={() => setPage('login')}
          className="text-white px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
        >
          {t('login')}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
