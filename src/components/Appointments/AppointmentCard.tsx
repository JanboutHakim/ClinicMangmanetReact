import React, { useState } from 'react';
import dayjs from 'dayjs';
import { COLORS } from '../../constants/theme';
import RescheduleModal from './RescheduleModal';
import { useAuth } from '../../contexts/ContextsAuth';

interface AppointmentCardProps {
    id: number | string;
    doctorId: number | string;
    doctorName?: string;
    startTime: string;
    status: string;
    onCancel: (id: number | string, reason: string) => void;
    onReschedule: (doctorId: number | string) => void;
    t: (key: string) => string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
                                                             id,
                                                             doctorId,
                                                             doctorName,
                                                             startTime,
                                                             status,
                                                             onCancel,
                                                             onReschedule,
                                                             t,
                                                         }) => {
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [showReschedule, setShowReschedule] = useState(false);
    const { accessToken, user } = useAuth();

    const confirmCancel = () => {
        onCancel(id, reason);
        setShowModal(false);
        setReason('');
    };

    const isCanceled =
        status === 'CANCELLED_BY_PATIENT' || status === 'CANCELLED_BY_CLINIC';

    return (
        <>
            <li
                className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition duration-300 ${
                    isCanceled ? 'bg-red-100' : 'bg-white'
                }`}
            >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold text-blue-700">{doctorName}</h3>
                        <h5 className="text-sm font-semibold text-blue-700">{status}</h5>
                        <p className="text-sm text-gray-500">
                            {dayjs(startTime).format('MMMM D, YYYY • HH:mm')}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {/* ✅ Reschedule Button (Always Visible) */}
                        <button
                            onClick={() => setShowReschedule(true)}
                            style={{ backgroundColor: COLORS.secondary }}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition"
                        >
                            {t('reschedule')}
                        </button>

                        {/* ❌ Cancel Button (Only if not already canceled) */}
                        {!isCanceled && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                {t('cancel')}
                            </button>
                        )}

                        {/* 🔁 Reschedule Modal */}
                        {showReschedule && (
                            <RescheduleModal
                                appointmentId={id}
                                doctorId={doctorId}
                                onClose={() => setShowReschedule(false)}
                                onSuccess={() => window.location.reload()}
                                t={t}
                            />
                        )}
                    </div>
                </div>
            </li>

            {/* ❗ Cancel Reason Modal */}
            {showModal && !isCanceled && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            {t('cancelConfirmation')}
                        </h3>
                        <label className="block text-sm text-gray-600 mb-2">
                            {t('cancelReason')}
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring"
                            rows={3}
                        />
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                {t('cancelModalClose')}
                            </button>
                            <button
                                onClick={confirmCancel}
                                disabled={!reason.trim()}
                                className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
                            >
                                {t('confirmCancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AppointmentCard;
