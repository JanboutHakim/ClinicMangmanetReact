import React from "react";

interface Doctor {
    id: number;
    clinicName: string;
    specialty?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
}

interface Props {
    doctors: Doctor[];
}

const DoctorList: React.FC<Props> = ({ doctors }) => {
    if (doctors.length === 0) return null;

    return (
        <div className="absolute z-50 mt-2 w-full max-w-xl bg-white rounded-lg shadow-xl overflow-hidden">
            {doctors.map((doctor) => (
                <div
                    key={doctor.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all"
                >
                    <div className="flex flex-col text-sm text-gray-800">
            <span className="font-semibold">
              Dr. {doctor.firstName} {doctor.lastName}
            </span>
                        <span className="text-gray-500">{doctor.specialty}</span>
                        <span className="text-gray-400 text-xs">{doctor.clinicName} - {doctor.city}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
