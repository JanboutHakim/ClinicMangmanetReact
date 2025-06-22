// src/components/DoctorNavbar.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    onSelect: (section: string) => void;
    selected: string;
}

const DoctorNavbar: React.FC<Props> = ({ onSelect, selected }) => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    const links = [
        { key: 'overview', label: t('overview') },
        { key: 'visits', label: t('visits') },
        { key: 'patients', label: t('patients') },
        { key: 'appointments', label: t('appointments') },
    ];

    return (
        <aside className="w-64 bg-white shadow p-4 space-y-6">
            <h2 className="text-xl font-bold text-blue-700">{t('menu')}</h2>
            <nav className="space-y-2">
                {links.map(link => (
                    <button
                        key={link.key}
                        onClick={() => onSelect(link.key)}
                        className={`block w-full text-left ${
                            selected === link.key ? 'text-blue-600 font-bold' : 'text-gray-700'
                        } hover:text-blue-600`}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <button
                onClick={toggleLang}
                className="text-sm text-blue-600 underline mt-10"
            >
                {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>
        </aside>
    );
};

export default DoctorNavbar;
