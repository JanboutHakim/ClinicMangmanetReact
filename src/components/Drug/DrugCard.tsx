import React, { useState } from 'react';
import { useAuth } from '../../contexts/ContextsAuth';
import api from '../../services/api';
import {API_ENDPOINTS} from "../../constants/apiConfig";

export interface Drug {
    drugId: number;
    name: string;
    scientificName: string;
    medicationDosage: string;
    pharmaceuticalForm: string;
    company: string;
}

interface DrugCardProps {
    drug: Drug;
}

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
    const { user, accessToken } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [frequency, setFrequency] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!user || !frequency) return;

        setLoading(true);
        try {
            await api.post(
                `${API_ENDPOINTS.patients}/${user.id}/drugs`,
                {
                    drugId: drug.drugId,
                    frequency: Number(frequency)
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            alert('✅ Drug added successfully');
            setShowModal(false);
            setFrequency('');
        } catch (err) {
            console.error('❌ Failed to add drug', err);
            alert('❌ Failed to add drug');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-4 px-2 hover:bg-gray-50 transition">
            {/* Left: Main Info */}
            <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-blue-700">{drug.name}</h2>
                <p className="text-sm text-gray-600 italic">{drug.scientificName}</p>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 md:mt-0 text-sm text-gray-700">
                <span><strong>Dosage:</strong> {drug.medicationDosage}</span>
                <span><strong>Form:</strong> {drug.pharmaceuticalForm}</span>
                <span><strong>Company:</strong> {drug.company}</span>
                {user && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                        + Add Drug
                    </button>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Add {drug.name}</h3>

                        <label className="block mb-3 text-sm">
                            Frequency per day:
                            <input
                                type="number"
                                min={1}
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="mt-1 w-full border rounded p-2"
                            />
                        </label>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !frequency}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Adding...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrugCard;
