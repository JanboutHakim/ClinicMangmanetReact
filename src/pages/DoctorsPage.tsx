import React, { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorService';
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

const ITEMS_PER_PAGE = 10;

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [search, setSearch] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { accessToken } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchDoctorsData = async () => {
            try {
                const data = await getDoctors(search, specialtyFilter, accessToken!);
                const doctorsArray = Array.isArray(data) ? data : data?.doctors || [];
                setDoctors(doctorsArray);
                setCurrentPage(1);
            } catch (err) {
                console.error('Failed to fetch doctors:', err);
                setDoctors([]);
            }
        };

        fetchDoctorsData();
    }, [accessToken, search, specialtyFilter]);

    const specialties = Array.from(
        new Set(doctors.map((d) => d.specialty).filter(Boolean))
    ) as string[];

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDoctors = doctors.slice(start, start + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(doctors.length / ITEMS_PER_PAGE);

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
                            {t('prev') || 'Prev'}
                        </button>
                        <span>
              {currentPage} / {totalPages}
            </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            {t('next') || 'Next'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;
