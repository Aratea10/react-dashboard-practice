import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Layout = () => {
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setShowConfirmLogout(false);
        navigate('/login');
    };

    return (
        <div>
            <nav style={styles.nav}>
                <div style={styles.linksContainer}>
                    <Link to="/products" style={styles.link}>
                        Productos
                    </Link>
                    <Link to="/products/new" style={styles.link}>
                        Crear producto
                    </Link>
                </div>

                <button
                    onClick={() => setShowConfirmLogout(true)}
                    style={styles.logoutBtn}
                >
                    Cerrar sesión
                </button>
            </nav>

            <main style={styles.main}>
                <Outlet />
            </main>

            {showConfirmLogout && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>¿Cerrar sesión?</h3>
                        <p>¿Estás seguro de que quieres cerrar sesión?</p>

                        <div style={styles.modalActions}>
                            <button
                                onClick={handleLogout}
                                style={styles.confirmBtn}
                            >
                                Sí, cerrar sesión
                            </button>
                            <button
                                onClick={() => setShowConfirmLogout(false)}
                                style={styles.cancelBtn}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#f4f4f4',
        borderBottom: '1px solid #ddd'
    },
    linksContainer: {
        display: 'flex',
        gap: '15px'
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold'
    },
    logoutBtn: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    main: {
        padding: '20px'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    modalActions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginTop: '20px'
    },
    confirmBtn: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    cancelBtn: {
        backgroundColor: '#ccc',
        color: 'black',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};
