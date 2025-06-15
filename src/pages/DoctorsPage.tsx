import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiConfig';
import { useAuth } from '../contexts/ContextsAuth';

interface Doctor {
    id: number;
    name: string;
}

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(API_ENDPOINTS.doctors, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((res) => setDoctors(res.data))
            .catch((err) => console.error(err));
    }, [accessToken]);

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Doctors</h2>
            <ul className="space-y-2">
                {doctors.map((doc) => (
                    <li key={doc.id}>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate(`/book/${doc.id}`)}
                        >
                            {doc.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorsPage;
