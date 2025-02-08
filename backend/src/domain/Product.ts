export interface Author {
    name: string;
    lastname: string;
}

export interface Price {
    currency: string;
    amount: number;
    decimals: number;
}

export interface Product {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
}

export interface ProductDetail extends Product {
    sold_quantity: number;
    description: string;
}

export interface SearchResult {
    author: Author;
    categories: string[];
    items: Product[];
}

export interface ProductDetailResult {
    author: Author;
    item: ProductDetail;
}