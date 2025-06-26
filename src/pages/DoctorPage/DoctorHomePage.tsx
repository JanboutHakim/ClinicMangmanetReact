import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import { getAppointmentsByDoctor, confirmAppointment } from '../../services/appointmentService';
import { useAuth } from '../../contexts/ContextsAuth';
import AppointmentTable, {Appointment} from "../../components/Doctor/DoctorAppointments";

const DoctorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState('appointments');
    const { user, accessToken } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        getAppointmentsByDoctor(user.id, accessToken!)
            .then(setAppointments)
            .catch((err) => console.error('Appointments fetch error:', err));
    }, [user, accessToken]);

    const handleConformation = async (appointmentId: number) => {
        if (!user || !accessToken) return;
        try {
            const updated = await confirmAppointment(user.id, appointmentId, accessToken!);
            setAppointments((prev) =>
                prev.map((appt) => (appt.id === updated.id ? updated : appt))
            );
        } catch (error) {
            console.error('❌ Failed to confirm:', error);
        }
    };

    const renderSection = () => {
        switch (section) {
            case 'appointments':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('appointments')}</h1>
                        <AppointmentTable data={appointments} onConfirm={handleConformation} />
                    </>
                );
            case 'patients':
                return <h1 className="text-2xl font-bold">{t('patients')}</h1>;
            case 'visits':
                return <h1 className="text-2xl font-bold">{t('visits')}</h1>;
            default:
                return <h1 className="text-2xl font-bold">{t('overview')}</h1>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <DoctorNavbar selected={section} onSelect={setSection} />
            <main className="flex-1 p-6">{renderSection()}</main>
        </div>
    );
};

export default DoctorDashboard;
