import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import { useAuth } from '../../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';

interface DoctorData {
    id: number;
    clinicName: string;
    address: string;
    specialization: string[];
    imageUrl?: string;
}

const BookingPage: React.FC = () => {
    const { doctorId } = useParams<{ doctorId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, accessToken } = useAuth();
    const { t } = useTranslation();

    const selectedSlot = new URLSearchParams(location.search).get('slot') || '';

    const [doctor, setDoctor] = useState<DoctorData | null>(null);
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (!doctorId) return;
        api
            .get(API_ENDPOINTS.doctor(doctorId), {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => setDoctor(res.data))
            .catch((err) => console.error(err));
    }, [doctorId, accessToken]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !doctorId || !selectedSlot) return;

        const startTime = dayjs(selectedSlot).format('YYYY-MM-DDTHH:mm:ss');
        console.log(startTime)
        const body = {
            patientId: user.id,
            doctorId: Number(doctorId),
            startTime,
            reason,
            notes,
            cancellationReason: null,
        };

        try {
            await api.post(API_ENDPOINTS.bookAppointment(user.id), body, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            navigate('/my-appointments');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <form onSubmit={handleSubmit} className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">{t('book')}</h2>
                    {selectedSlot && (
                        <p className="text-sm text-gray-700">
                            {t('selectedSlot')}: {dayjs(selectedSlot).format('YYYY-MM-DD HH:mm')}
                        </p>
                    )}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium mb-1">
                            {t('reasonLabel')}
                        </label>
                        <input
                            id="reason"
                            required
                            className="w-full border rounded p-2"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium mb-1">
                            {t('notesLabel')}
                        </label>
                        <textarea
                            id="notes"
                            className="w-full border rounded p-2"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        {t('confirmBooking')}
                    </button>
                </form>
                {doctor && (
                    <div className="bg-white p-4 rounded shadow h-fit">
                        <h3 className="font-bold mb-2">{doctor.clinicName}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {doctor.specialization && doctor.specialization.length > 0
                                ? doctor.specialization.join(', ')
                                : '—'}
                        </p>
                        <div className="text-sm space-y-2">
                            <p>{doctor.address}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
