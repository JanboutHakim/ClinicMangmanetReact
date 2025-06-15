// src/components/LoginForm.tsx
import React, { useState } from 'react';
import LabeledInput from './LabeledInput';
import Button from './Button';
import {BASE_URL} from "../constants/appConfig";

type Props = {
    onSwitch: () => void;
};

const LoginForm: React.FC<Props> = ({ onSwitch }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        alert('Logged in!');
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <LabeledInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
            />
            <LabeledInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Log In
            </Button>

            <p className="text-sm text-center mt-4">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
                    Sign up
                </button>
            </p>
        </form>
    );
};

export default LoginForm;
