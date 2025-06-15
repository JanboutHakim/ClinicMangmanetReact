import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useAuth } from '../contexts/ContextsAuth';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import AppointmentCard from '../components/Appointment/AppointmentCard';
import { useTranslation } from 'react-i18next';

interface Doctor {
    id: number;
    clinicName: string;
    specialty?: string;
}

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [search, setSearch] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const { accessToken } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        api
            .get(API_ENDPOINTS.doctors, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setDoctors(res.data))
            .catch((err) => console.error(err));
    }, [accessToken]);

    const specialties = Array.from(
        new Set(doctors.map((d) => d.specialty).filter(Boolean))
    ) as string[];

    const filteredDoctors = doctors.filter(
        (d) =>
            d.clinicName.toLowerCase().includes(search.toLowerCase()) &&
            (specialtyFilter === '' || d.specialty === specialtyFilter)
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="p-6 space-y-4">
                <SearchBar className="w-full" onSearch={setSearch} />
                <h2 className="text-xl font-semibold">{t('doctorsHeading')}</h2>
                <div className="flex items-center gap-2">
                    <label htmlFor="specialty" className="font-medium">
                        {t('filterSpecialty')}
                    </label>
                    <select
                        id="specialty"
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">{t('all')}</option>
                        {specialties.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-4">
                    {filteredDoctors.map((doc) => (
                        <AppointmentCard
                            key={doc.id}
                            doctorId={doc.id.toString()}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;
