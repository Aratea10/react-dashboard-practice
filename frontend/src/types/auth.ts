export interface User {
    id: number;
    name: string;
    password: string;
}

export interface LoginCredentials {
    name: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
    logout: () => void;
}
