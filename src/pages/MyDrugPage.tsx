import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/ContextsAuth";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { API_ENDPOINTS } from "../constants/apiConfig";

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
    const [drugs, setDrugs] = useState<MyDrug[]>([]);

    useEffect(() => {
        if (!user) return;

        api
            .get(`/patients/${user.id}/drugs`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setDrugs(res.data))
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
        </>
    );
}

export default MyDrugPage;
