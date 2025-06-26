import React from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants/theme';

interface Props {
    selected: string;
    onSelect: (section: string) => void;
}

const DoctorSidebar: React.FC<Props> = ({ selected, onSelect }) => {
    const { t } = useTranslation();

    const navItems = [
        { key: 'overview', label: t('overview'), icon: (
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                </svg>
            ) },
        { key: 'today', label: t("todayVisit"), icon: (
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-12 4h14m-9 4h4" />
                </svg>
            ) },
        { key: 'appointments', label: t('appointments'), icon: (
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-6 4v4m2-4v4m5-20H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z" />
                </svg>
            ) },
        { key: 'patients', label: t('patients'), icon: (
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) },
        { key: 'schedules', label: t('schedules'), icon: (
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
            ) },
    ];

    return (
        <aside
            className="w-64 min-h-screen pt-6"
            style={{ backgroundColor: COLORS.primary, color: COLORS.textLight }}
        >
            <nav>
                <ul className="space-y-2 px-2">
                    {navItems.map(({ key, label, icon }) => (
                        <li key={key}>
                            <button
                                onClick={() => onSelect(key)}
                                className={`w-full text-left flex items-center px-4 py-2 rounded transition ${
                                    selected === key
                                        ? 'text-white'
                                        : 'hover:text-white'
                                }`}
                                style={{
                                    backgroundColor: selected === key ? COLORS.accent : 'transparent'
                                }}
                            >
                                {icon}
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default DoctorSidebar;
