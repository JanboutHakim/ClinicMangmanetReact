import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';

const AddDrugPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [medicationDosage, setMedicationDosage] = useState('');
    const [pharmaceuticalForm, setPharmaceuticalForm] = useState('');
    const [company, setCompany] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newDrug = {
            name,
            scientificName,
            medicationDosage,
            pharmaceuticalForm,
            company,
        };
        try {
            await api.post(API_ENDPOINTS.drugs, newDrug);
            navigate('/drugs');
        } catch (err) {
            console.error('Failed to add drug', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <h2 className="text-xl font-bold">{t('addDrug')}</h2>
                <button
                    onClick={() => navigate('/drugs')}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {t('drug')}
                </button>

                <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-white">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            required
                            className="w-full border rounded p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Scientific Name</label>
                        <input
                            required
                            className="w-full border rounded p-2"
                            value={scientificName}
                            onChange={(e) => setScientificName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Dosage</label>
                        <input
                            className="w-full border rounded p-2"
                            value={medicationDosage}
                            onChange={(e) => setMedicationDosage(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Form</label>
                        <input
                            className="w-full border rounded p-2"
                            value={pharmaceuticalForm}
                            onChange={(e) => setPharmaceuticalForm(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <input
                            className="w-full border rounded p-2"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        {t('addDrug')}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddDrugPage;
