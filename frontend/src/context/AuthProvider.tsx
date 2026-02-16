import { useState, type ReactNode } from 'react';
import type { LoginCredentials } from '../types';
import { authService } from '../services/auth.service';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
    });

    const login = async (credentials: LoginCredentials, remember: boolean) => {
        try {
            const response = await authService.login(credentials);

            const tokenValue = response.accessToken;

            setToken(tokenValue);
            setIsAuthenticated(true);

            if (remember) {
                localStorage.setItem('token', tokenValue);
                sessionStorage.removeItem('token');
            } else {
                sessionStorage.setItem('token', tokenValue);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
