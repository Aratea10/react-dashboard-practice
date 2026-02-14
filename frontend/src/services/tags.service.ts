const API_URL = 'http://localhost:8000/api';

export const tagsService = {
    async getAll(token: string): Promise<string[]> {
        const response = await fetch(`${API_URL}/tags`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }

        return response.json();
    },
};
