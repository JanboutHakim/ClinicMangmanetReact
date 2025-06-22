import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import DoctorAppointments from '../../components/Doctor/DoctorAppointments';

const DoctorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState('overview');

    const renderSection = () => {
        switch (section) {
            case 'appointments':
                return <DoctorAppointments />;
            case 'patients':
                return <div className="text-xl font-semibold">{t('patients')}</div>;
            case 'visits':
                return <div className="text-xl font-semibold">{t('visits')}</div>;
            default:
                return <div className="text-xl font-semibold">{t('overview')}</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <DoctorNavbar selected={section} onSelect={setSection} />
            <main className="flex-1 p-6">
                {renderSection()}
            </main>
        </div>
    );
};

export default DoctorDashboard;
