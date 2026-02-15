import type { LoginCredentials, AuthResponse } from '../types';

const API_URL = 'http://localhost:8000/api';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Error de inicio de sesión');
        }

        return response.json();
    },

    async register(credentials: LoginCredentials): Promise<void> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Error al registrarse');
        }
    },
};
