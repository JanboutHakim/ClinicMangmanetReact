import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import DoctorAppointmentCard from './DoctorAppointmentCard';

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

const DoctorAppointments: React.FC = () => {
    const { t } = useTranslation();
    const { user, accessToken } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        if (!user) return;
        api
            .get(`/appointments/doctor/${user.id}`, {
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
            console.log('✅ Confirmed:', response.data);
        } catch (error) {
            console.error('❌ Failed to confirm:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow divide-y">
            {appointments.map((appt) => (
                <DoctorAppointmentCard
                    key={appt.id}
                    appointment={appt}
                    onConfirm={handleConformation}
                />
            ))}
        </div>
    );
};

export default DoctorAppointments;
