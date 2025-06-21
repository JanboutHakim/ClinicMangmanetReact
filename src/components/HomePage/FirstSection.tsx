import { useAuth } from "../../contexts/ContextsAuth";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../constants/theme";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import DoctorList from "../Doctor/DoctorList";

interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialty?: string;
    clinicName: string;
    city?: string;
}

const FirstSection = () => {
    const { t, i18n } = useTranslation();
    const { accessToken } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<Doctor[]>([]);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!searchQuery.trim()) {
                setResults([]);
                return;
            }

            try {
                const res = await api.get(`${API_ENDPOINTS.doctors}/search?q=${encodeURIComponent(searchQuery)}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setResults(res.data);
            } catch (err) {
                console.error("Search failed", err);
                setResults([]);
            }
        };

        fetchDoctors();
    }, [searchQuery, accessToken]);

    return (
        <div
            className="relative bg-blue-600 text-white h-[500px] overflow-hidden rounded-b-3xl"
            style={{ backgroundColor: COLORS.primary }}
        >
            <div className="relative z-10 pt-32 flex flex-col items-center justify-center text-center px-10 py-16 max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>

                <div className="w-full relative max-w-xl">
                    <SearchBar
                        onSearch={setSearchQuery}
                        className="w-full"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 200)} // delay to allow click
                    />
                    {focused && searchQuery.trim().length > 0 && (
                        <DoctorList doctors={results} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FirstSection;
