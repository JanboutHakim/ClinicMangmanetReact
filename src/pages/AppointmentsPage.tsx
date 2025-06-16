import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/ContextsAuth';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Appointment {
    id: number | string;
    patientId: number | string;
    doctorId: number | string;
    startTime: string;
    endTime: string;
    reason: string;
    notes: string | null;
    status: string;
    cancellationReason: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    doctorName?: string;
}

const AppointmentsPage: React.FC = () => {
    const { accessToken, user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const { data } = await api.get(
                    API_ENDPOINTS.patientAppointments(user.id, user.id),
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                const withDoctors = await Promise.all(
                    data.map(async (appt: Appointment) => {
                        try {
                            const res = await api.get(
                                API_ENDPOINTS.doctor(appt.doctorId),
                                { headers: { Authorization: `Bearer ${accessToken}` } }
                            );
                            return {
                                ...appt,
                                doctorName: res.data.clinicName ?? res.data.fullName,
                            };
                        } catch {
                            return { ...appt };
                        }
                    })
                );

                setAppointments(withDoctors);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [accessToken, user]);

    const handleCancel = async (appointmentId: number | string) => {
        if (!user) return;
        try {
            await api.post(
                `/appointments/${user.id}/${appointmentId}/cancel-by-patient`,
                null,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setAppointments((prev) => prev.filter((a) => a.id !== appointmentId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleReschedule = (doctorId: number | string) => {
        navigate(`/book/${doctorId}`);
    };

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
                            <li
                                key={appt.id}
                                className="bg-gray-100 p-4 rounded space-y-1"
                            >
                                <p className="font-semibold">{appt.doctorName}</p>
                                <p>{dayjs(appt.startTime).format('MMMM D, YYYY HH:mm')}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleReschedule(appt.doctorId)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                    >
                                        {t('reschedule')}
                                    </button>
                                    <button
                                        onClick={() => handleCancel(appt.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                    >
                                        {t('cancel')}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
