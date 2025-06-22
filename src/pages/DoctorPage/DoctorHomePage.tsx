import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import {useAuth} from "../../contexts/ContextsAuth";
import {API_ENDPOINTS} from "../../constants/apiConfig";
import api from "../../services/api";

interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    startTime: string;
    endTime: string;
    reason: string;
    notes: string;
    status: string;
    cancellationReason: string | null;
    createdAt: string;
    updatedAt: string;
}

const DoctorDashboard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { user, accessToken } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        api.get(API_ENDPOINTS.appointmentsByDoctor(user.id), {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).then((res) => setAppointments(res.data));
    }, [user, accessToken]);

    const handleConfirm = async (id: number) => {
        if(!user)
            return
        try {
            await api.put(`/appointments/${user.id}/confirm/${id}`, null, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt.id === id ? { ...appt, status: 'CONFIRMED' } : appt
                )
            );
        } catch (err) {
            console.error('Confirm error:', err);
        }
    };

    const formatDate = (iso: string) => dayjs(iso).format('DD MMM YY');
    const formatTime = (iso: string) => dayjs(iso).format('h:mm A');

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-60 bg-white shadow p-6 space-y-4">
                <h2 className="text-xl font-bold text-blue-600">{t('menu')}</h2>
                <nav className="space-y-2 text-sm">
                    <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
                        {t('overview')}
                    </a>
                    <a href="#" className="block text-gray-700 hover:text-blue-600">{t('todayAppointments')}</a>
                    <a href="#" className="block text-blue-700 font-bold">{t('patients')}</a>
                </nav>
                <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                        className="text-sm text-blue-600 underline mt-6">
                    {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">{t('managePatients')}</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">{t('addNewPatient')}</button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <input className="border px-3 py-2 rounded text-sm" placeholder={t('search')} />
                    <select className="border px-3 py-2 rounded text-sm">
                        <option>{t('allStatuses')}</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                    </select>
                </div>

                {/* Appointment Cards */}
                <div className="bg-white rounded-lg shadow overflow-hidden divide-y">
                    {appointments.map((appt) => (
                        <div
                            key={appt.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <span className="w-24">{formatDate(appt.startTime)}</span>
                                <span className="w-20">{formatTime(appt.startTime)}</span>
                                <span className="w-24">{appt.reason || 'FUP'}</span>
                                <span className="w-36">{appt.patientId}</span>
                                <span className="w-24 text-gray-500">{appt.status}</span>
                            </div>

                            <div className="mt-4 md:mt-0 flex gap-2">
                                <button
                                    onClick={() => handleConfirm(appt.id)}
                                    className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                    {t('confirm')}
                                </button>
                                <button className="bg-gray-600 text-white px-4 py-1 rounded text-sm hover:bg-gray-700">
                                    {t('checkIn')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DoctorDashboard;
