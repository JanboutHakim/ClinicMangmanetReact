// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    id: number;
    username: string;
    role: string;
    firstName?: string;
    imageUrl?: string;
};

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (data: { accessToken: string; refreshToken: string; user: User }) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() =>
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
    );
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

    const login = ({ accessToken, refreshToken, user }: { accessToken: string; refreshToken: string; user: User }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
    };

    const logout = () => {
        localStorage.clear();
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
};
