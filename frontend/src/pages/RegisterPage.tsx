import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== passwordConfirm) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);

        try {
            await authService.register({ username, password });
            setSuccess('Usuario registrado correctamente. Redirigiendo al login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al registrar el usuario');
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <h1>Crear cuenta</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                        Nombre de usuario
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password-confirm" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirmar contraseña
                    </label>
                    <input
                        id="password-confirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ color: 'green', marginBottom: '15px' }}>
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        marginBottom: '10px'
                    }}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                    ¿Ya tienes cuenta?{' '}
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                        Inicia sesión
                    </a>
                </div>
            </form>
        </div>
    );
};
