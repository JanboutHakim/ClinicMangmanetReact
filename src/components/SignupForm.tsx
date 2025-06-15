import React, { useState } from 'react';
import LabeledInput from './LabeledInput';
import Button from './Button';
import {BASE_URL} from "../constants/appConfig";

type Props = {
    onSwitch: () => void;
};

const SignupForm: React.FC<Props> = ({ onSwitch }) => {
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

        await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        alert('Account created!');
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4 text-sm">
            <LabeledInput
                label="Full Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                inputClassName="py-1.5 text-sm"
            />

            <LabeledInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                inputClassName="py-1.5 text-sm"
            />

            <LabeledInput
                label="Password"
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
                    <li className={passwordStatus.length ? 'text-green-600' : ''}>At least 8 characters</li>
                    <li className={passwordStatus.uppercase ? 'text-green-600' : ''}>At least one uppercase letter</li>
                    <li className={passwordStatus.number ? 'text-green-600' : ''}>At least one number</li>
                </ul>
            )}

            <LabeledInput
                label="Re-enter Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                inputClassName="py-1.5 text-sm"
            />

            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
            </div>


            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign Up
            </Button>

            <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
                    Sign in
                </button>
            </p>
        </form>
    );
};

export default SignupForm;
