export interface User {
    id: number;
    username: string;
    password: string;
}

export interface LoginCredentials {
    username: string;
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
