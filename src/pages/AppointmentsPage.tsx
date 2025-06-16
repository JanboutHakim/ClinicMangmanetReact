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
                <div className="p-6 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('appointments')}</h2>

                    {appointments.length === 0 ? (
                        <p className="text-gray-500 text-center">{t('noAppointments')}</p>
                    ) : (
                        <ul className="space-y-4">
                            {appointments.map((appt) => (
                                <li
                                    key={appt.id}
                                    className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <div className="mb-4 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-blue-700">
                                                {appt.doctorName}
                                            </h3>
                                            <h5 className="text-sm font-semibold text-blue-700">
                                                {appt.status}
                                            </h5>

                                            <p className="text-sm text-gray-500">
                                                {dayjs(appt.startTime).format('MMMM D, YYYY • HH:mm')}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleReschedule(appt.doctorId)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                                            >
                                                {t('reschedule')}
                                            </button>
                                            <button
                                                onClick={() => handleCancel(appt.id)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                                            >
                                                {t('cancel')}
                                            </button>
                                        </div>
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