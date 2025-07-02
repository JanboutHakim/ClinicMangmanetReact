import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export interface Patient {
    id: number;
    name: string;
    phoneNumber: string;
    address: string;
}

interface Props {
    data: Patient[];
}

const DoctorPatientTable: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                {t('noPatients') || 'No patients found.'}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-gray-800">
                <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                <tr className="ltr:text-left rtl:text-right">
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">{t('name')}</th>
                    <th className="px-6 py-3">{t('phone')}</th>
                    <th className="px-6 py-3">{t('address')}</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {data.map((patient, index) => (
                    <tr
                        key={patient.id}
                        className="hover:bg-gray-50 cursor-pointer ltr:text-left rtl:text-right"
                        onClick={() => navigate(`/doctor-home/patient/${patient.id}`)}
                    >
                        <td className="px-6 py-4 font-medium">{index + 1}</td>
                        <td className="px-6 py-4">{patient.name}</td>
                        <td className="px-6 py-4">{patient.phoneNumber}</td>
                        <td className="px-6 py-4">{patient.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorPatientTable;
