import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

interface AppointmentTime {
    date: string;         // e.g. "2025-06-17"
    times: string[];      // e.g. ["09:30", "09:45"]
}

interface DoctorData {
    clinicName: string;
    specialty: string;
    address: string;
    imageUrl?: string;
    schedule: AppointmentTime[];
}

const AppointmentCard: React.FC<{ doctorId: string }> = ({ doctorId }) => {
    const [doctor, setDoctor] = useState<DoctorData | null>(null);

    useEffect(() => {
        axios.get(`/api/doctors/${doctorId}`) // 🔁 Replace with your API endpoint
            .then(response => setDoctor(response.data))
            .catch(error => console.error('Error fetching doctor data:', error));
    }, [doctorId]);

    if (!doctor) return <div>Loading...</div>;

    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const getDayLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${weekdays[date.getDay()]}\n${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row p-4 gap-4 bg-white">
            {/* Left: Doctor Info */}
            <div className="flex-1 flex flex-col items-start gap-2">
                <img src={doctor.imageUrl || '/placeholder.png'} alt={doctor.name} className="h-12 w-12 rounded-full object-cover" />
                <p className="font-semibold text-blue-700">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-1" />
                    {doctor.address}
                </div>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">
                    Book Appointment
                </button>
            </div>

            {/* Right: Schedule Grid */}
            <div className="flex-[2] overflow-x-auto">
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {doctor.schedule.map((day, idx) => (
                        <div key={idx}>
                            <div className="font-semibold text-gray-700 whitespace-pre-line">{getDayLabel(day.date)}</div>
                            <div className="mt-2 flex flex-col gap-1">
                                {day.times.length === 0 ? (
                                    <span className="text-gray-400">–</span>
                                ) : (
                                    day.times.map((time, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium cursor-pointer hover:bg-blue-200">
                      {time}
                    </span>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-right mt-4">
                    <button className="text-blue-600 text-sm hover:underline">View More</button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;
