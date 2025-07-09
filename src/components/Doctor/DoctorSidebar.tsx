    import React from 'react';
    import { useTranslation } from 'react-i18next';
    import { getColors } from '../../constants/theme';
    import { useTheme } from "../../contexts/ThemeContext";

    interface Props {
        selected: string;
        onSelect: (section: string) => void;
    }

    const DoctorSidebar: React.FC<Props> = ({ selected, onSelect }) => {
        const { t } = useTranslation();
        const { mode } = useTheme();
        const COLORS = getColors(mode);

        const iconClass = "w-5 h-5 ms-3 flex-shrink-0"; // consistent icon styling

        const navItems = [
            {
                key: 'overview',
                label: t('overview'),
                icon: (
                    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m10-11v10a1 1 0 01-1 1h-5" />
                    </svg>
                ),
            },
            {
                key: 'today',
                label: t('todayVisit'),
                icon: (
                    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                    </svg>
                ),
            },
            {
                key: 'appointments',
                label: t('appointments'),
                icon: (
                    <svg
                        className={iconClass}
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M304.427,147.399H275.38v-29.046c0-10.706-8.68-19.386-19.386-19.386c-10.706,0-19.386,8.68-19.386,19.386V147.4h-29.047 c-10.706,0-19.386,8.68-19.386,19.386s8.68,19.386,19.386,19.386h29.047v29.046c0,10.706,8.68,19.386,19.386,19.386 c10.706,0,19.386-8.68,19.386-19.386v-29.046h29.047c10.706,0,19.386-8.68,19.386-19.386 C323.813,156.079,315.135,147.399,304.427,147.399z"></path>
                        <path d="M446.704,19.386C446.704,8.68,438.024,0,427.318,0H84.672C73.966,0,65.286,8.68,65.286,19.386 c0,19.634-0.004,395.991-0.004,415.78c0,10.706,8.68,19.386,19.386,19.386h56.06v38.045c0,17.236,20.909,25.888,33.091,13.71 l33.746-33.736l33.735,33.733c12.109,12.114,33.094,3.665,33.094-13.707v-38.045h152.938c10.706,0,19.386-8.68,19.386-19.386 C446.72,423.13,446.704,234.426,446.704,19.386z M104.059,38.773h303.873v256.026H104.059V38.773z M235.623,445.793 l-14.346-14.345c-7.568-7.571-19.842-7.571-27.413-0.003l-14.363,14.357c0-22.535,0-29.22,0-51.734h56.122 C235.623,416.595,235.623,423.285,235.623,445.793z M407.947,415.78H274.395v-21.714h94.993c10.706,0,19.386-8.68,19.386-19.386 c0-10.706-8.68-19.386-19.386-19.386H142.614c-10.706,0-19.386,8.68-19.386,19.386c0,10.071,7.68,18.342,17.501,19.291v21.81 h-36.674v-82.207h303.892V415.78z"></path>
                    </svg>
                ),

            },
            {
                key: 'patients',
                label: t('patients'),
                icon: (
                    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                ),
            },
            {
                key: 'services',
                label: t('servicesTab'),
                icon: (
                    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V8a2 2 0 00-2-2h-4V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2H2a2 2 0 00-2 2v5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M8 16h8M3 16h.01M3 12h.01" />
                    </svg>
                ),
            },
            {
                key: 'schedules',
                label: t('schedules'),
                icon: (
                    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-5 4h.01m-7-8h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                ),
            },
        ];

        return (
            <aside
                className="w-64 min-h-screen pt-6"
                style={{ backgroundColor: COLORS.secondary, color: COLORS.textLight }}
            >
                <nav>
                    <ul className="space-y-2 px-2">
                        {navItems.map(({ key, label, icon }) => (
                            <li key={key}>
                                <button
                                    onClick={() => onSelect(key)}
                                    className={`w-full text-left flex items-center px-4 py-2 rounded transition-transform duration-200 ${
                                        selected === key
                                            ? 'text-white scale-105'
                                            : 'hover:text-white hover:scale-[1.05]'
                                    } hover:bg-blue-50`}
                                    style={{
                                        backgroundColor: selected === key ? COLORS.primary : 'transparent',
                                    }}
                                >
                                    {icon}
                                    <span className="ms-3">{label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        );
    };

    export default DoctorSidebar;
