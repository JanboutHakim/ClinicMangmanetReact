import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export interface Appointment {
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
    patientName?: string;
    type?: string;
    ramq?: string;
}

interface Props {
    data: Appointment[];
    onConfirm?: (appointmentId: number) => void;
}

const AppointmentTable: React.FC<Props> = ({ data, onConfirm }) => {
    const { t } = useTranslation();

    if (data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                {t('noAppointments') || 'No appointments found.'}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-7 gap-4 px-4 py-3 font-semibold text-gray-700 border-b text-sm bg-gray-100">
                <div>{t('date')}</div>
                <div>{t('time')}</div>
                <div>{t('type')}</div>
                <div>{t('ramq')}</div>
                <div>{t('patientName')}</div>
                <div>{t('status')}</div>
                <div className="text-center">{t('actions')}</div>
            </div>

            {/* Rows */}
            {data.map((a) => {
                const date = dayjs(a.startTime).format('DD MMM YYYY');
                const time = dayjs(a.startTime).format('h:mm A');
                return (
                    <div
                        key={a.id}
                        className="grid grid-cols-7 gap-4 px-4 py-3 items-center text-sm border-b hover:bg-gray-50 transition"
                    >
                        <div>{date}</div>
                        <div>{time}</div>
                        <div>{a.type || 'FUP'}</div>
                        <div>{a.ramq || '—'}</div>
                        <div>{a.patientName || `#${a.patientId}`}</div>
                        <div className="capitalize">{t(a.status.toLowerCase())}</div>
                        <div className="flex justify-center gap-2">
                            {a.status === 'PENDING' && onConfirm && (
                                <button
                                    onClick={() => onConfirm(a.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                >
                                    {t('confirm')}
                                </button>
                            )}
                            {a.status === 'CONFIRMED' && (
                                <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700">
                                    {t('reschedule')}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AppointmentTable;
