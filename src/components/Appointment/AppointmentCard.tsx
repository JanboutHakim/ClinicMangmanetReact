import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const AppointmentCard: React.FC<{ doctorId: string }> = ({ doctorId }) => {
    const [doctor, setDoctor] = useState<DoctorData | null>(null);
    const [slots, setSlots] = useState<GroupedSlots[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/doctors/${doctorId}`)
            .then((res) => setDoctor(res.data))
            .catch((err) => console.error('Doctor fetch error:', err));

        axios
            .get(`http://localhost:8080/appointments/doctor/${doctorId}/available-slots`)
            .then((res) => {
                const rawSlots: string[] = Array.isArray(res.data) ? res.data : [];
                const grouped: { [key: string]: string[] } = {};

                rawSlots.forEach((datetime) => {
                    const [date, time] = datetime.split('T');
                    if (!grouped[date]) grouped[date] = [];
                    grouped[date].push(time.slice(0, 5)); // "09:00:00" → "09:00"
                });

                const groupedArray: GroupedSlots[] = Object.entries(grouped).map(([date, times]) => ({
                    date,
                    times,
                }));

                setSlots(groupedArray);
            })
            .catch((err) => console.error('Slots fetch error:', err));
    }, [doctorId]);

    if (!doctor) return <div>Loading...</div>;

    const getDayLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const weekday = weekdays[date.getDay()];
        const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { weekday, formatted };
    };

    const visibleSlots = showAll ? slots : slots.slice(0, 7);

    return (
        <div className="border rounded-lg shadow-sm flex flex-col md:flex-row p-6 gap-6 bg-white">
            {/* Left: Doctor Info */}
            <div className="flex-1 flex flex-col items-start gap-2">
                <img
                    src={doctor.imageUrl || '/placeholder.png'}
                    alt={doctor.clinicName}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <p className="font-semibold text-blue-700">{doctor.clinicName}</p>
                <p className="text-sm text-gray-600">
                    {doctor.specialization.length > 0 ? doctor.specialization.join(', ') : '—'}
                </p>
                <div className="text-sm text-gray-600">{doctor.address}</div>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">
                    Book Appointment
                </button>
            </div>

            {/* Right: Horizontal Days */}
            <div className="flex-[2] overflow-x-auto">
                <div className="flex gap-4 text-center text-sm">
                    {visibleSlots.map((slot, idx) => {
                        const { weekday, formatted } = getDayLabel(slot.date);
                        return (
                            <div key={idx} className="min-w-[100px]">
                                <div className="font-semibold text-gray-800">{weekday}</div>
                                <div className="text-xs text-gray-500 mb-2">{formatted}</div>
                                {(showAll ? slot.times : slot.times.slice(0, 5)).map((time, i) => (
                                    <div
                                        key={i}
                                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-1 cursor-pointer hover:bg-blue-200"
                                    >
                                        {time}
                                    </div>
                                ))}
                                {slot.times.length > 5 && !showAll && (
                                    <div className="text-gray-400 text-xs">+{slot.times.length - 5} more</div>
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
    );
};

export default AppointmentCard;
