import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/ContextsAuth';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from "../components/Appointments/AppointmentCard";
import {COLORS} from "../constants/theme";

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

    const handleCancel = async (appointmentId: number | string, reason: string) => {
        if (!user) return;
        try {
            await api.put(
                `/appointments/${user.id}/${appointmentId}/cancel-by-patient`,
                { reason },
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
                                <AppointmentCard
                                    key={appt.id}
                                    id={appt.id}
                                    doctorId={appt.doctorId}
                                    doctorName={appt.doctorName}
                                    startTime={appt.startTime}
                                    status={appt.status}
                                    onCancel={handleCancel}
                                    onReschedule={handleReschedule}
                                    t={t}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            {/* Floating Add Button */}
            <button
                onClick={() => navigate('/doctors')}
                className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-medium text-sm hover:opacity-90 transition"
                style={{ backgroundColor: COLORS.secondary }} // COLORS.secondary
            >
                <span className="text-xl">+</span> {t('bookAppointment')}
            </button>

        </div>

            );
};

export default AppointmentsPage;