const API_URL = '/api';

export const tagsService = {
    async getAll(token: string): Promise<string[]> {
        const response = await fetch(`${API_URL}/tags`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los tags');
        }

        return response.json();
    },
};
