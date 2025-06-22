import React from 'react';
import { useAuth } from '../../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import DoctorAppointmentCard from "./DoctorAppointementCard";

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

interface Props {
    appointments: Appointment[];
}

const DoctorAppointment: React.FC<Props> = ({ appointments }) => {
    const { t } = useTranslation();
    const { user, accessToken } = useAuth();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default DoctorAppointment;
