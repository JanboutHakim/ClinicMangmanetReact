import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // npm install dayjs

type Props = {
    allAppointments: string[]; // from the API
};

const AppointmentBookingPage: React.FC<Props> = ({ allAppointments }) => {
    const [visibleDays, setVisibleDays] = useState(7); // show 1 week initially

    // Group appointments by date
    const grouped = allAppointments.reduce((acc: Record<string, string[]>, iso) => {
        const date = dayjs(iso).format('dddd, D MMMM');
        const time = dayjs(iso).format('HH:mm');
        if (!acc[date]) acc[date] = [];
        acc[date].push(time);
        return acc;
    }, {});

    const dateKeys = Object.keys(grouped);

    const handleViewMore = () => {
        setVisibleDays((prev) => prev + 7);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8 bg-blue-50 min-h-screen">
            {/* Left column: appointment selection */}
            <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-6">Choose a date for your appointment</h2>

                <div className="space-y-4">
                    {dateKeys.slice(0, visibleDays).map((date, index) => (
                        <div key={index} className="bg-white border rounded-lg shadow">
                            <details>
                                <summary className="cursor-pointer px-4 py-3 font-medium text-blue-700">
                                    {date}
                                </summary>
                                <div className="flex flex-wrap gap-2 px-4 py-2">
                                    {grouped[date].map((time, i) => (
                                        <button
                                            key={i}
                                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </details>
                        </div>
                    ))}

                    {visibleDays < dateKeys.length && (
                        <button
                            onClick={handleViewMore}
                            className="block w-full text-center text-blue-700 border border-blue-700 py-2 rounded hover:bg-blue-100"
                        >
                            View More Dates
                        </button>
                    )}
                </div>
            </div>

            {/* Right column: appointment details */}
            <div className="bg-white p-4 rounded shadow h-fit">
                <h3 className="font-bold mb-2">Dr. Lisa Budras-Krüger</h3>
                <p className="text-sm text-gray-600 mb-4">Doctor in further training</p>

                <div className="text-sm space-y-2">
                    <p>📍 Schloßplatz 8, 15711 Königs Wusterhausen</p>
                    <p>🗒️ ErstvorstellerIn</p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBookingPage;
