import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { productsService } from '../services/products.service';
import { useAuth } from '../hooks/useAuth';

export const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [nameFilter, setNameFilter] = useState('');
    const [saleFilter, setSaleFilter] = useState('todos');

    const { token } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!token) return;

            try {
                const data = await productsService.getAll(token);
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar productos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    useEffect(() => {
        let filtered = [...products];

        if (nameFilter) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (saleFilter === 'venta') {
            filtered = filtered.filter(p => p.isOnSale);
        } else if (saleFilter === 'compra') {
            filtered = filtered.filter(p => !p.isOnSale);
        }

        setFilteredProducts(filtered);
    }, [nameFilter, saleFilter, products]);

    if (isLoading) return <div>Cargando productos...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1>Productos</h1>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h3>Filtros</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name-filter" style={{ display: 'block', marginBottom: '5px' }}>
                        Buscar por nombre:
                    </label>
                    <input
                        id="name-filter"
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Escribe un nombre..."
                        style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Filtrar por tipo:
                    </label>
                    <select
                        value={saleFilter}
                        onChange={(e) => setSaleFilter(e.target.value)}
                        style={{ padding: '8px' }}
                    >
                        <option value="todos">Todos</option>
                        <option value="venta">En oferta</option>
                        <option value="compra">No en oferta</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p>No hay productos para mostrar.</p>
                    <Link to="/products/new" style={{ color: '#0066cc', textDecoration: 'underline' }}>
                        Crear un nuevo producto
                    </Link>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: 'white' }}>
                            <h3>{product.name}</h3>
                            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#0066cc' }}>
                                {product.price}€
                            </p>
                            {product.isOnSale && (
                                <span style={{ backgroundColor: '#ff4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                    ¡OFERTA!
                                </span>
                            )}
                            <div style={{ marginTop: '10px' }}>
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{ display: 'inline-block', backgroundColor: '#e0e0e0', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', marginRight: '5px', marginTop: '5px' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
