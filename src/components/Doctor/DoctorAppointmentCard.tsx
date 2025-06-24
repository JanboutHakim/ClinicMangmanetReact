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
    const date = dayjs(appointment.startTime).format('DD MMM YY');
    const time = dayjs(appointment.startTime).format('h:mm A');

    const isConfirmed = appointment.status === 'CONFIRMED';

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-gray-50 transition border-b last:border-0">
            <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="w-24">{date}</span>
                <span className="w-20">{time}</span>
                <span className="w-24">{appointment.reason || '---'}</span>
                <span className="w-36">{appointment.cancellationReason}</span>
                <span className="w-24 text-gray-500">{t(appointment.status.toLowerCase())}</span>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">

                {isConfirmed ? (
                    <button
                        onClick={() => onReschedule?.(appointment.id)}
                        className="bg-yellow-600 text-white px-4 py-1 rounded text-sm hover:bg-yellow-700"
                    >
                        {t('reschedule')}
                    </button>
                ) : (
                    <button
                        onClick={() => onConfirm(appointment.id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                    >
                        {t('confirm')}
                    </button>
                )}
                <button
                    onClick={() => onReschedule?.(appointment.id)}
                    className="bg-gray-600 text-white px-4 py-1 rounded text-sm hover:bg-gray-700"
                >
                    {t('cancel')}
                </button>
            </div>
        </div>
    );
};

export default DoctorAppointmentCard;
