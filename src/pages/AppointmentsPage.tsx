import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/ContextsAuth';
import { getAppointmentsByPatient, cancelAppointment } from '../services/appointmentService';
import { getDoctor } from '../services/doctorService';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from "../components/Appointments/AppointmentCard";
import {getColors} from "../constants/theme";
import {useTheme} from "../contexts/ThemeContext";

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
    const {mode} = useTheme();
    const COLORS = getColors(mode);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const data = await getAppointmentsByPatient(user.id, accessToken!);

                const withDoctors = await Promise.all(
                    data.map(async (appt: Appointment) => {
                        try {
                            const res = await getDoctor(appt.doctorId, accessToken!);
                            return {
                                ...appt,
                                doctorName: res.clinicName ?? res.fullName,
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

    const handleCancel = async (appointmentId: number | string, name: string) => {
        if (!user) return;
        try {
            await cancelAppointment(user.id, appointmentId, name, accessToken!);
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
                onClick={() => navigate('/book')}
                className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-medium text-sm hover:opacity-90 transition"
                style={{ backgroundColor: COLORS.secondary }} // COLORS.secondary
            >
                <span className="text-xl">+</span> {t('bookAppointment')}
            </button>

        </div>

            );
};

export default AppointmentsPage;