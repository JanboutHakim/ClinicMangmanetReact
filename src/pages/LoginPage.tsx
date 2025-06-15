import React from 'react';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl">{t('loginTitle')}</h1>
    </div>
  );
};

export default LoginPage;
