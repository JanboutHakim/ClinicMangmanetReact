import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

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
    appointment: Appointment;
    onConfirm: (appointmentId: number) => void;
    onReschedule?: (appointmentId: number) => void;
}

const DoctorAppointmentCard: React.FC<Props> = ({ appointment, onConfirm, onReschedule }) => {
    const { t } = useTranslation();

    const date = dayjs(appointment.startTime).format('YYYY-MM-DD');
    const time = dayjs(appointment.startTime).format('HH:mm');

    return (
        <div className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
            <h3 className="text-lg font-bold text-blue-700 mb-2">{t('appointment')}</h3>

            <p className="text-sm"><strong>{t('date')}:</strong> {date}</p>
            <p className="text-sm"><strong>{t('time')}:</strong> {time}</p>
            <p className="text-sm"><strong>{t('reason')}:</strong> {appointment.reason || '—'}</p>
            <p className="text-sm"><strong>{t('notes')}:</strong> {appointment.notes || '—'}</p>
            <p className="text-sm"><strong>{t('status')}:</strong> {t(appointment.status.toLowerCase())}</p>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => onConfirm(appointment.id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                >
                    {t('confirm')}
                </button>
                <button
                    onClick={() => onReschedule?.(appointment.id)}
                    className="bg-gray-600 text-white px-4 py-1 rounded text-sm hover:bg-gray-700"
                >
                    {t('reschedule')}
                </button>
            </div>
        </div>
    );
};

export default DoctorAppointmentCard;
