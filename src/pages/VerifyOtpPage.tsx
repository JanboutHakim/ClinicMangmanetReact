import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import { BASE_URL } from '../constants/apiConfig';

const VerifyOtpPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username, email } = (location.state || {}) as { username: string; email: string };
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, otp }),
            });

            if (!res.ok) throw new Error('Verification failed');

            alert('Account verified!');
            navigate('/login');
        } catch {
            alert('Verification failed');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <form onSubmit={handleSubmit} className="space-y-4 text-center">
                    {email && (
                        <p className="text-sm">We sent a code to {email}</p>
                    )}
                    <LabeledInput
                        label="OTP"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        inputClassName="py-1.5 text-sm text-center"
                    />
                    <Button type="submit" className="w-full">
                        Verify
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
