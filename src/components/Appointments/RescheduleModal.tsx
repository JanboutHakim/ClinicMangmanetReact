import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import { useAuth } from '../../contexts/ContextsAuth';

interface RescheduleModalProps {
    appointmentId: string | number;
    doctorId: string | number;
    onClose: () => void;
    onSuccess: () => void;
    t: (key: string) => string;
}

interface DoctorData {
    id: number;
    clinicName: string;
    address: string;
    specialization: string[];
    imageUrl?: string;
}

interface GroupedSlots {
    date: string;
    times: string[];
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const RescheduleModal: React.FC<RescheduleModalProps> = ({
                                                             appointmentId,
                                                             doctorId,
                                                             onClose,
                                                             onSuccess,
                                                             t,
                                                         }) => {
    const { user, accessToken } = useAuth();
    const [doctor, setDoctor] = useState<DoctorData | null>(null);
    const [slots, setSlots] = useState<GroupedSlots[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (!user || !accessToken) return;

        // Fetch doctor info
        api
            .get(API_ENDPOINTS.doctor(doctorId), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setDoctor(res.data))
            .catch((err) => console.error('Doctor fetch error:', err));

        // Fetch available slots
        api
            .get(API_ENDPOINTS.availableSlots(doctorId), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
                const rawSlots: string[] = Array.isArray(res.data) ? res.data : [];
                const grouped: { [key: string]: string[] } = {};

                rawSlots.forEach((datetime) => {
                    const [date, time] = datetime.split('T');
                    if (!grouped[date]) grouped[date] = [];
                    grouped[date].push(time.slice(0, 5));
                });

                const groupedArray: GroupedSlots[] = Object.entries(grouped).map(([date, times]) => ({
                    date,
                    times,
                }));

                setSlots(groupedArray);
            })
            .catch((err) => console.error('Slots fetch error:', err));
    }, [doctorId, user, accessToken]);

    const getDayLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const weekday = weekdays[date.getDay()];
        const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { weekday, formatted };
    };

    const handleSubmit = async () => {
        if (!selected || !user || !accessToken) return;

        try {
            await api.put(
                `/appointments/${user.id}/reschedule/${appointmentId}`,
                {   id: appointmentId,
                    patientId: user.id,
                    doctorId,
                    startTime: selected,
                    reason: 'Regular checkup',
                    notes: 'Patient reports mild headache',
                    cancellationReason: null,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Reschedule failed', err);
        }
    };

    const visibleSlots = showAll ? slots : slots.slice(0, 7);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-4xl">
                <h3 className="text-xl font-bold mb-6 text-center">{t('chooseTime')}</h3>

                {doctor ? (
                    <div className="border rounded-lg shadow-sm flex flex-col md:flex-row p-6 gap-6 bg-gray-50 mb-6">
                        {/* Doctor Info */}
                        <div className="flex-1 flex flex-col items-start gap-2">
                            {doctor.imageUrl ? (
                                <img
                                    src={doctor.imageUrl}
                                    alt={doctor.clinicName}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                                    {"doctor.clinicName.charAt(0)"}
                                </div>
                            )}
                            <p className="font-semibold text-blue-700">{doctor.clinicName}</p>

                            <div className="text-sm text-gray-600">{doctor.address}</div>
                        </div>

                        {/* Time Slots */}
                        <div className="flex-[2] overflow-x-auto">
                            <div className="flex gap-4 text-center text-sm">
                                i{visibleSlots.map((slot, idx) => {
                                    const { weekday, formatted } = getDayLabel(slot.date);
                                    return (
                                        <div key={idx} className="min-w-[100px]">
                                            <div className="font-semibold text-gray-800">{weekday}</div>
                                            <div className="text-xs text-gray-500 mb-2">{formatted}</div>
                                            {(showAll ? slot.times : slot.times.slice(0, 5)).map((time, i) => {
                                                const dateTime = `${slot.date}T${time}`;
                                                return (
                                                    <div
                                                        key={i}
                                                        onClick={() => setSelected(dateTime)}
                                                        className={`${
                                                            selected === dateTime
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        } text-xs px-2 py-1 rounded mb-1 cursor-pointer`}
                                                    >
                                                        {time}
                                                    </div>
                                                );
                                            })}
                                            {slot.times.length > 5 && !showAll && (
                                                <div className="text-gray-400 text-xs">
                                                    +{slot.times.length - 5} more
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {!showAll && slots.length > 7 && (
                                <div className="text-right mt-4">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        View More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 text-center">Loading doctor...</p>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                    >
                        {t('cancelModalClose')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selected}
                        className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {t('confirmReschedule')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RescheduleModal;
