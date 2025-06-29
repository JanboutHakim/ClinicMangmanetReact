import React from 'react';

interface Props {
    title?: string;
    onAddAppointment?: () => void;
}

export const PatientHeader: React.FC<Props> = ({ title = 'Patient Profile', onAddAppointment }) => (
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textDark">{title}</h1>
        <div className="space-x-2">
            {onAddAppointment && (
                <button onClick={onAddAppointment} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm">
                    + Add Appointment
                </button>
            )}
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow text-sm">Print</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm">Edit</button>
        </div>
    </div>
);
