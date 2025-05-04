'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface AuthContextType {
    username: string | null;
    userId: number | null;
    login: (username: string) => Promise<Boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState(null as string | null);
    const [userId, setUserId] = useState(null as number | null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUsername = localStorage.getItem('username');
            const storedUserId = localStorage.getItem('userId');
            setUsername(storedUsername);
            setUserId(Number(storedUserId));
        };
        // Initial load
        handleStorageChange();

        // Listen for changes across tabs
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = async (username: string): Promise<Boolean> => {
        const res = await api.post('/auth/sign-in', { username });
        if (res.data.username !== username) {
            return false;
        }
        localStorage.setItem('username', username);
        setUsername(username);
        localStorage.setItem('userId', res.data.id);
        setUserId(res.data.id);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setUsername(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ username, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}