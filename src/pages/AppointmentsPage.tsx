import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/ContextsAuth';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useTranslation } from 'react-i18next';

interface Appointment {
    id: number | string;
    dateTime: string;
    doctorName?: string;
}

const AppointmentsPage: React.FC = () => {
    const { accessToken, user } = useAuth();
    const { t } = useTranslation();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.patientAppointments(user.id, user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error(err));
    }, [accessToken, user]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t('appointments')}</h2>
                {appointments.length === 0 ? (
                    <p>{t('noAppointments')}</p>
                ) : (
                    <ul className="space-y-2">
                        {appointments.map((appt) => (
                            <li key={appt.id} className="bg-gray-100 p-4 rounded">
                                <p>{appt.doctorName}</p>
                                <p>{appt.dateTime}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
