import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import type { Product } from '../types';
import { productsService } from '../services/products.service';
import { useAuth } from '../hooks/useAuth';

export const ProductPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!token || !id) return;

            try {
                const data = await productsService.getById(Number(id), token);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar el producto');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id, token]);

    const handleDelete = async () => {
        if (!token || !id) return;

        setIsDeleting(true);
        try {
            await productsService.delete(Number(id), token);
            navigate('/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el producto');
            setIsDeleting(false);
            setShowConfirmDelete(false);
        }
    };

    if (isLoading) return <div>Cargando producto...</div>;
    if (error || !product) return <Navigate to="/404" replace />;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Link to="/products" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
                ← Volver a la lista de productos
            </Link>

            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '20px' }}>
                        Sin imagen
                    </div>
                )}

                <h1>{product.name}</h1>

                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>
                    {product.price}€
                </p>

                {product.isOnSale && (
                    <span style={{ backgroundColor: '#ff5722', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                        ¡OFERTA!
                    </span>
                )}

                <div style={{ margin: '20px 0' }}>
                    <strong>Descripción:</strong>
                    <p>{product.description}</p>
                </div>

                <div>
                    <strong>Etiquetas:</strong>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                style={{ backgroundColor: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                    <button
                        onClick={() => setShowConfirmDelete(true)}
                        style={{ backgroundColor: '#d32f2f', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                    >
                        Eliminar producto
                    </button>
                </div>
            </div>

            {showConfirmDelete && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
                        <h3>¿Confirmar eliminación?</h3>
                        <p>¿Estás seguro de que quieres eliminar "{product.name}"? Esta acción no se puede deshacer.</p>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                style={{ flex: 1, backgroundColor: '#d32f2f', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: isDeleting ? 'not-allowed' : 'pointer' }}
                            >
                                {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                            </button>
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                disabled={isDeleting}
                                style={{ flex: 1, backgroundColor: '#757575', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: isDeleting ? 'not-allowed' : 'pointer' }}
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
