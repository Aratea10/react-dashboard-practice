import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductFormData } from '../types';
import { productsService } from '../services/products.service';
import { tagsService } from '../services/tags.service';
import { useAuth } from '../hooks/useAuth';

export const NewProductPage = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        price: 0,
        tags: [],
        photo: '',
        isOnSale: false,
        description: '',
    });

    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            if (!token) return;

            try {
                const tags = await tagsService.getAll(token);
                setAvailableTags(tags);
            } catch (err) {
                console.error('Error al cargar tags:', err);
            }
        };

        fetchTags();
    }, [token]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!token) return;

        try {
            const newProduct = await productsService.create(formData, token);
            navigate(`/products/${newProduct.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el producto');
            setIsLoading(false);
        }
    };

    const handleTagToggle = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const isFormValid =
        formData.name.trim() !== '' &&
        formData.price > 0 &&
        formData.tags.length > 0 &&
        formData.description.trim() !== '';

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Crear nuevo producto</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
                        Nombre *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>
                        Precio (€) *
                    </label>
                    <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
                        Descripción *
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        style={{ width: '100%', padding: '8px', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="photo" style={{ display: 'block', marginBottom: '5px' }}>
                        URL de la imagen (opcional)
                    </label>
                    <input
                        id="photo"
                        type="url"
                        value={formData.photo}
                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.isOnSale}
                            onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                        />
                        ¿Es una oferta? *
                    </label>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Tags * (elige al menos uno)
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {availableTags.map((tag) => (
                            <label key={tag} style={{
                                padding: '5px 10px',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                backgroundColor: formData.tags.includes(tag) ? '#e3f2fd' : 'transparent'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={formData.tags.includes(tag)}
                                    onChange={() => handleTagToggle(tag)}
                                    style={{ marginRight: '5px' }}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>
                </div>

                {error && (
                    <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: isFormValid && !isLoading ? '#1976d2' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
                        fontSize: '16px'
                    }}
                >
                    {isLoading ? 'Creando...' : 'Crear producto'}
                </button>
            </form>
        </div>
    );
};
