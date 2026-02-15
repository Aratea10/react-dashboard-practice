import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div style= {{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', padding: '20px' }}>
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe.</p>

            <Link to="/products" style= {{ color: '#007bff', textDecoration: 'none', fontSize: '18px' }} >
                Volver a la lista de productos
            </Link >
        </div >
    );
};
