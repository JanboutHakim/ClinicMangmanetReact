import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DrugCard, { Drug } from '../components/Drug/DrugCard';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';

const ITEMS_PER_PAGE = 20;

const DrugPage: React.FC = () => {
    const [drugs, setDrugs] = useState<Drug[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        const endpoint = searchQuery
            ? `${API_ENDPOINTS.drugs}/search?q=${encodeURIComponent(searchQuery)}`
            : API_ENDPOINTS.drugs;

        api.get(endpoint)
            .then((res) => {
                setDrugs(res.data);
                setCurrentPage(1); // reset to page 1 on new search
            })
            .catch((err) => console.error('Drug fetch failed', err))
            .finally(() => setLoading(false));
    }, [searchQuery]);

    const totalPages = Math.ceil(drugs.length / ITEMS_PER_PAGE);
    const paginatedDrugs = drugs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-6">
                <SearchBar onSearch={setSearchQuery} />

                {loading ? (
                    <p className="text-center text-sm text-gray-500">Loading drugs...</p>
                ) : drugs.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">No drugs found.</p>
                ) : (
                    <>
                        <div className="divide-y border rounded bg-white">
                            {paginatedDrugs.map((drug) => (
                                <DrugCard key={drug.drugId} drug={drug} />
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DrugPage;
