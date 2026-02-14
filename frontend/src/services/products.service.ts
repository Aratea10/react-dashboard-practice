import type { Product, ProductFormData } from '../types';

const API_URL = 'http://localhost:8000/api';

export const productsService = {
    async getAll(token: string): Promise<Product[]> {
        const response = await fetch(`${API_URL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
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
            throw new Error('Failed to fetch product');
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
            throw new Error('Failed to create product');
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
            throw new Error('Failed to delete product');
        }
    },
};
