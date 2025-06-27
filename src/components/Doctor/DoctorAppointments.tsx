import React from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    doctorName?: string;
    patientName?: string;
    startTime: string;
    endTime: string;
    reason: string;
    notes: string;
    status: string;
    cancellationReason: string | null;
    createdAt: string;
    updatedAt: string;
}
const statusStyles: Record<string, { label: string; colorClass: string }> = {
    REQUESTED: {
        label: 'requested',
        colorClass: 'text-blue-800 bg-blue-100',
    },
    CONFIRMED: {
        label: 'confirmed',
        colorClass: 'text-green-700 bg-green-100',
    },
    CHECKED_IN: {
        label: 'checkedIn',
        colorClass: 'text-indigo-700 bg-indigo-100',
    },
    IN_PROGRESS: {
        label: 'inProgress',
        colorClass: 'text-orange-700 bg-orange-100',
    },
    COMPLETED: {
        label: 'completed',
        colorClass: 'text-green-800 bg-green-200',
    },
    NO_SHOW: {
        label: 'noShow',
        colorClass: 'text-red-800 bg-red-100',
    },
    CANCELLED_BY_PATIENT: {
        label: 'cancelledByPatient',
        colorClass: 'text-red-600 bg-red-100',
    },
    CANCELLED_BY_CLINIC: {
        label: 'cancelledByClinic',
        colorClass: 'text-red-600 bg-red-200',
    },
    RESCHEDULED: {
        label: 'rescheduled',
        colorClass: 'text-yellow-800 bg-yellow-100',
    },
    PAYMENT_PENDING: {
        label: 'paymentPending',
        colorClass: 'text-pink-700 bg-pink-100',
    },
    ON_HOLD: {
        label: 'onHold',
        colorClass: 'text-gray-800 bg-gray-100',
    },
    VIRTUAL: {
        label: 'virtual',
        colorClass: 'text-blue-500 bg-blue-100',
    },
    IN_PERSON: {
        label: 'inPerson',
        colorClass: 'text-purple-700 bg-purple-100',
    },
};


interface Props {
    data: Appointment[];
    onConfirm?: (appointmentId: number) => void;
    onCancel?: (appointmentId: number) => void;
}

const AppointmentTable: React.FC<Props> = ({ data, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    if (data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                {t('noAppointments') || 'No appointments found.'}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left text-gray-800">
                <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">{t('patient')}</th>
                    <th className="px-6 py-3">{t('doctor')}</th>
                    <th className="px-6 py-3">{t('date')}</th>
                    <th className="px-6 py-3">{t('time')}</th>
                    <th className="px-6 py-3">{t('status')}</th>
                    <th className="px-6 py-3">{t('actions')}</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {data.map((appt, index) => {
                    const date = dayjs(appt.startTime).format('YYYY-MM-DD');
                    const time = dayjs(appt.startTime).format('h:mm A');

                    return (
                        <tr key={appt.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{index + 1}</td>
                            <td className="px-6 py-4">{appt.patientName || `#${appt.patientId}`}</td>
                            <td className="px-6 py-4">{appt.doctorName || `#${appt.doctorId}`}</td>
                            <td className="px-6 py-4">{date}</td>
                            <td className="px-6 py-4">{time}</td>
                            <td className="px-6 py-4">
                                {(() => {
                                    const info = statusStyles[appt.status];
                                    if (!info) return <span className="text-gray-500">{appt.status}</span>;
                                    return (
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${info.colorClass}`}>
                                          {t(info.label)}
                                        </span>
                                    );
                                })()}

                            </td>
                            <td className="px-6 py-4 space-x-2">
                                {(appt.status === 'ON_HOLD'|| appt.status==='RESCHEDULED' ) && (
                                    <button
                                        onClick={() => onConfirm?.(appt.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {t('confirm')}
                                    </button>
                                )}

                                {(appt.status === 'CONFIRMED' || appt.status==='RESCHEDULED' || appt.status === 'ON_HOLD') && (
                                    <button
                                        onClick={() => onCancel?.(appt.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        {t('cancel')}
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    );
};

export default AppointmentTable;
