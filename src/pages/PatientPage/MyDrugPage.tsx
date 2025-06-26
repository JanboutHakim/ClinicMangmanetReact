import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/ContextsAuth";
import { useTranslation } from "react-i18next";
import { getPatientDrugs } from '../../services/drugService';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/theme';

interface MyDrug {
    id: number;
    patientId: number;
    drugId: number;
    frequency: number;
    drugName: string;
    dosage: string | null;
    startDate: string | null;
    endDate: string | null;
    drugStatus: string | null;
}

function MyDrugPage() {
    const { user, accessToken } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [drugs, setDrugs] = useState<MyDrug[]>([]);

    useEffect(() => {
        if (!user) return;

        getPatientDrugs(user.id, accessToken!)
            .then(setDrugs)
            .catch((err) => console.error('Failed to load user drugs:', err));
    }, [user, accessToken]);

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4">{t('myDrugs')}</h2>

                {drugs.length === 0 ? (
                    <p className="text-gray-500 text-sm">{t('noDrugsFound')}</p>
                ) : (
                    <ul className="divide-y border rounded bg-white">
                        {drugs.map((drug) => (
                            <li key={drug.id} className="p-4 space-y-1">
                                <h3 className="text-blue-700 font-semibold">{drug.drugName}</h3>
                                <p className="text-sm text-gray-600">
                                    {t('frequency')}: {drug.frequency} / day
                                </p>
                                {drug.dosage && <p className="text-sm">{t('dosage')}: {drug.dosage}</p>}
                                {drug.startDate && <p className="text-sm">{t('startDate')}: {drug.startDate}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                onClick={() => navigate('/drugs')}
                className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-medium text-sm hover:opacity-90 transition"
                style={{ backgroundColor: COLORS.secondary }}
            >
                <span className="text-xl">+</span> {t('addDrug')}
            </button>
        </>
    );
}

export default MyDrugPage;
