import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { useAuth } from '../../contexts/ContextsAuth';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import { COLORS } from '../../constants/theme';

const AddDrugPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { user, accessToken } = useAuth();
    const navigate = useNavigate();

    const [drugName, setDrugName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dosage, setDosage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !frequency || !drugName) {
            alert(t('fillAllFields'));
            return;
        }

        const body = {
            patientId: user.id,
            drugName,
            frequency: Number(frequency),
            startDate: startDate || null,
            endDate: endDate || null,
            dosage: dosage || null,
            drugStatus: null,
            drugAlarms: []
        };

        try {
            await api.post(`${API_ENDPOINTS.patients}/${user.id}/drugs`, body, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            alert(t('addSuccess'));
            navigate('/my-drugs');
        } catch (err) {
            console.error('❌ Failed to add drug', err);
            alert(t('addFailed'));
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <h2 className="text-xl font-bold">{t('addDrug')}</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 border p-6 rounded"
                    style={{ backgroundColor: COLORS.primary, color: 'white' }}
                >
                    <div>
                        <label className="block text-sm mb-1">{t('drugName')}</label>
                        <input
                            required
                            className="w-full border rounded p-2 text-black"
                            value={drugName}
                            onChange={(e) => setDrugName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">{t('frequency')}</label>
                        <input
                            type="number"
                            required
                            className="w-full border rounded p-2 text-black"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">{t('startDate')}</label>
                        <input
                            type="date"
                            className="w-full border rounded p-2 text-black"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">{t('endDate')}</label>
                        <input
                            type="date"
                            className="w-full border rounded p-2 text-black"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">{t('dosage')}</label>
                        <input
                            className="w-full border rounded p-2 text-black"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: COLORS.secondary }}
                    >
                        {t('addDrug')}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddDrugPage;
