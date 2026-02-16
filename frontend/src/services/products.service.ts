import type { Product, ProductFormData } from '../types';

const API_URL = '/api';

export const productsService = {
    async getAll(token: string): Promise<Product[]> {
        const response = await fetch(`${API_URL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        return response.json();
    },

    async getById(id: number, token: string): Promise<Product> {
        const response = await fetch(`${API_URL}/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }

        return response.json();
    },

    async create(product: ProductFormData, token: string): Promise<Product> {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }

        return response.json();
    },

    async delete(id: number, token: string): Promise<void> {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
    },
};
