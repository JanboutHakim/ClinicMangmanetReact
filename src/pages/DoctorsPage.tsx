import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useAuth } from '../contexts/ContextsAuth';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DoctorCard from '../components/Doctor/DoctorCard';
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
    const [currentPage, setCurrentPage] = useState(1);
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

    useEffect(() => {
        setCurrentPage(1);
    }, [search, specialtyFilter]);

    const specialties = Array.from(
        new Set(doctors.map((d) => d.specialty).filter(Boolean))
    ) as string[];

    const filteredDoctors = doctors.filter(
        (d) =>
            d.clinicName.toLowerCase().includes(search.toLowerCase()) &&
            (specialtyFilter === '' || d.specialty === specialtyFilter)
    );

    const start = (currentPage - 1) * 10;
    const paginatedDoctors = filteredDoctors.slice(start, start + 10);
    const totalPages = Math.ceil(filteredDoctors.length / 10);

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
                    {paginatedDoctors.map((doc) => (
                        <DoctorCard key={doc.id} doctorId={doc.id.toString()} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span>
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;
