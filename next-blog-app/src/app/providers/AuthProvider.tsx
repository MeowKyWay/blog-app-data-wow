'use client';

import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    username: string | null;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState(null as string | null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
        };
        // Initial load
        handleStorageChange();

        // Listen for changes across tabs
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (username: string) => {
        localStorage.setItem('username', username);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
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