import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LabeledInput from './LabeledInput';
import Button from './Button';
import { signupUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

type Props = {
    onSwitch: () => void;
};

const SignupForm: React.FC<Props> = ({ onSwitch }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        patient: {
            name: '',
            gender: 'MALE',
            phone: '',
            countryCode: '+966', // Default to Saudi Arabia for example
        }
    });

    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (['name', 'phone', 'countryCode', 'gender'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                patient: {
                    ...prev.patient,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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
            patient: {
                ...formData.patient,
                phoneNumber: formData.patient.countryCode + formData.patient.phone,
            },
            role: 'PATIENT',
        };


        try {
            await signupUser(payload);

            alert('Account created!');
            navigate('/verify-otp', {
                state: { username: formData.username, email: formData.email },
            });
        } catch {
            alert('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4 text-sm">
            <LabeledInput
                label={t('fullName')}
                name="name"
                value={formData.patient.name}
                onChange={handleChange}
                placeholder={t('fullName')}
                inputClassName="py-1.5 text-sm"
            />

            <LabeledInput
                label={t('username')}
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t('Username')}
                inputClassName="py-1.5 text-sm"
            />


            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">{t('phone')}</label>
                <div className="flex">
                    <select
                        name="countryCode"
                        value={formData.patient.countryCode}
                        onChange={handleChange}
                        className="px-2 py-1.5 text-sm border border-gray-300 rounded-l-md bg-white"
                    >
                        <option value="+963">🇸🇾 +963</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.patient.phone}
                        onChange={handleChange}
                        placeholder={t('phone')}
                        className="flex-1 px-4 py-1.5 text-sm border border-l-0 border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <LabeledInput
                label={t('email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
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
                    value={formData.patient.gender}
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
