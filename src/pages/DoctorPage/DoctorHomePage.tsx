import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DoctorNavbar from '../../components/Doctor/DoctorNavbar';
import DoctorSidebar from '../../components/Doctor/DoctorSidebar';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import api from '../../services/api';
import { useAuth } from '../../contexts/ContextsAuth';
import AppointmentTable, { Appointment } from '../../components/Doctor/DoctorAppointments';
import AppointmentFilterBar from "../../components/Doctor/AppointmentFilterBar";
import DoctorPatientTable, {Patient} from "../../components/Doctor/DoctorPatientTable";

const DoctorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [section, setSection] = useState('appointments');
    const { user, accessToken,refreshToken } = useAuth();
    console.log(refreshToken)
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [todayAppointments,setTodayAppointments] = useState<Appointment[]>([]);
    const [patients,setPatients] = useState<Patient[]>([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [selectedApptId, setSelectedApptId] = useState<number | null>(null);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.appointmentsByDoctor(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error('Appointments fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.todayAppointmentsByDoctor(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setTodayAppointments(res.data))
            .catch((err) => console.error('Today visits fetch error:', err));
    }, [user, accessToken]);

    useEffect(() => {
        if (!user) return;
        api
            .get(API_ENDPOINTS.doctorPatients(user.id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setPatients(res.data))
            .catch((err) => console.error('Today visits fetch error:', err));
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

    const handleCancelClick = (appointmentId: number) => {
        setSelectedApptId(appointmentId);
        setCancelReason('');
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        if (!user || !accessToken || !selectedApptId || !cancelReason.trim()) return;

        try {
            const response = await api.put(
                `/appointments/${user.id}/${selectedApptId}/cancel-by-doctor`,
                { name: cancelReason },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const updated = response.data;
            setAppointments((prev) =>
                prev.map((appt) => (appt.id === updated.id ? updated : appt))
            );
            setShowCancelModal(false);
        } catch (error) {
            console.error('❌ Cancel failed:', error);
        }
    };
    const handleFilterChange = async (filters: {
        q: string;
        statuses: string[];
        start?: string;
        end?: string;
    }) => {
        if (!user || !accessToken) return;

        const params = new URLSearchParams();
        params.append('q', filters.q || '');
        filters.statuses.forEach((s) => params.append('statuses', s));
        if (filters.start) params.append('start', filters.start);
        if (filters.end) params.append('end', filters.end);

        try {
            const res = await api.get(`/appointments/${user.id}/search?${params.toString()}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setAppointments(res.data);
        } catch (err) {
            console.error('❌ Filtered fetch error:', err);
        }
    };


    const renderSection = () => {
        switch (section) {
            case 'appointments':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('appointments')}</h1>
                        <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                        <AppointmentTable data={appointments}
                                          onConfirm={handleConformation}
                                          onCancel={handleCancelClick} />
                    </>
                );
            case 'patients':
                return (<>
                    <h1 className="text-2xl font-bold">{t('patients')}</h1>
                    <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                    <DoctorPatientTable data={patients}/>
                </>);
            case 'today':
                return (
                    <>
                        <h1 className="text-2xl font-bold mb-4">{t('appointments')}</h1>
                        <AppointmentFilterBar  onFilterChange={handleFilterChange} />
                        <AppointmentTable data={todayAppointments}
                                          onConfirm={handleConformation}
                                          onCancel={handleCancelClick} />
                    </>
                );
            default:
                return <h1 className="text-2xl font-bold">{t('overview')}</h1>;
        }
    };

    return (<>
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            {/* Top Navbar */}
            <div className="w-full h-16">
                <DoctorNavbar selected={section} onSelect={setSection} />
            </div>

            {/* Sidebar + Content below navbar */}
            <div className="flex flex-1" > {/* 4rem = 64px = h-16 */}
                <DoctorSidebar selected={section} onSelect={setSection} />
                <main className="flex-1 p-6">{renderSection()}</main>
            </div>
        </div>
    {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">{t('cancelAppointment')}</h2>
                <textarea
                    placeholder={t('enterReason')}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                    rows={4}
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowCancelModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        {t('close')}
                    </button>
                    <button
                        onClick={handleConfirmCancel}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {t('confirm')}
                    </button>
                </div>
            </div>
        </div>
    )}

</>
);
};

export default DoctorDashboard;
