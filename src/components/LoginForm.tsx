// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabeledInput from './LabeledInput';
import Button from './Button';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/ContextsAuth';

type Props = {
    onSwitch: () => void;
};

const LoginForm: React.FC<Props> = ({ onSwitch }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginUser(formData);
            login(data); // save user in context
            console.log(data.user.role)
            // Navigate based on user role
            if (data.user.role == 'DOCTOR') {
                navigate('/doctor-home');
            } else if (data.user.role == 'PATIENT') {
                navigate('/');
            } else {
                navigate('/');
            }

        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {error && (
                <div className="text-red-600 bg-red-100 p-2 rounded text-sm">
                    {error}
                </div>
            )}
            <LabeledInput
                label={t('username')}
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t('username')}
            />
            <LabeledInput
                label={t('password')}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {t('signin')}
            </Button>

            <p className="text-sm text-center mt-4">
                {t('dontHaveAccount')}{' '}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-blue-600 hover:underline"
                >
                    {t('signup')}
                </button>
            </p>
        </form>
    );
};

export default LoginForm;
