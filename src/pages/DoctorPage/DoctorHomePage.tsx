import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import api from '../../services/api';
import { useAuth } from '../../contexts/ContextsAuth';
import AppointmentTable, {Appointment} from "../../components/Doctor/DoctorAppointments";

const DoctorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState('appointments');
    const { user, accessToken } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.appointmentsByDoctor(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error('Appointments fetch error:', err));
    }, [user, accessToken]);

    const handleConformation = async (appointmentId: number) => {
        if (!user || !accessToken) return;
        try {
            const response = await api.put(
                `/appointments/${user.id}/confirm/${appointmentId}`,
                null,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const updated = response.data;
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
