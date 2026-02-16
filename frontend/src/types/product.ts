export interface Product {
    id: number;
    name: string;
    price: number;
    tags: string[];
    photo?: string;
    isOnSale: boolean;
    description: string;
    userId: number;
    timestamp: string;
}

export interface ProductFormData {
    name: string;
    price: number;
    tags: string[];
    photo?: string;
    isOnSale: boolean;
    description: string;
}
