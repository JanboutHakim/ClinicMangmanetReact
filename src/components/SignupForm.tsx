import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabeledInput from './LabeledInput';
import Button from './Button';
import { BASE_URL } from "../constants/apiConfig";

type Props = {
    onSwitch: () => void;
};

const SignupForm: React.FC<Props> = ({ onSwitch }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        email: '',
        gender: 'MALE',
    });

    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password: string) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
        };
    };

    const passwordStatus = validatePassword(formData.password);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const payload = {
            ...formData,
            lastName: 'Default',
            phoneNumber: '0000000000',
            DOB: '2000-01-01',
            role: 'PATIENT',
        };

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Signup failed');

            alert('Account created!');
            onSwitch();
        } catch {
            alert('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4 text-sm">
            <LabeledInput
                label={t('fullName')}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('fullName')}
                inputClassName="py-1.5 text-sm"
            />

            <LabeledInput
                label={t('username')}
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t('username')}
                inputClassName="py-1.5 text-sm"
            />

            <LabeledInput
                label={t('password')}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordTouched(true)}
                placeholder="••••••••"
                inputClassName="py-1.5 text-sm"
            />

            {passwordTouched && (
                <ul className="text-xs text-gray-600 pl-5 list-disc space-y-1">
                    <li className={passwordStatus.length ? 'text-green-600' : ''}>{t('passwordLength')}</li>
                    <li className={passwordStatus.uppercase ? 'text-green-600' : ''}>{t('passwordUppercase')}</li>
                    <li className={passwordStatus.number ? 'text-green-600' : ''}>{t('passwordNumber')}</li>
                </ul>
            )}

            <LabeledInput
                label={t('confirmPassword')}
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                inputClassName="py-1.5 text-sm"
            />

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">{t('gender')}</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="MALE">{t('male')}</option>
                    <option value="FEMALE">{t('female')}</option>
                </select>
            </div>


            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {t('signup')}
            </Button>

            <p className="text-sm text-center mt-4">
                {t('alreadyHaveAccount')} {' '}
                <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
                    {t('signin')}
                </button>
            </p>
        </form>
    );
};

export default SignupForm;
