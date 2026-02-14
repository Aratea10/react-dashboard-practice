export interface Product {
    id: number;
    name: string;
    price: number;
    tags: string[];
    image?: string;
    isOnSale: boolean;
    description: string;
    userId: number;
    timestamp: string;
}

export interface ProductFormData {
    name: string;
    price: number;
    tags: string[];
    image?: string;
    isOnSale: boolean;
    description: string;
}
