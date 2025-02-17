export interface Author {
    name: string;
    lastname: string;
}

export interface Price {
    currency: string;
    amount: number;
    decimals: number;
}

export interface ProductCategory {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    location: string
}

export interface ProductDetail extends Product {
    sold_quantity: number;
    description: string;
    categories: ProductCategory[]
}


export interface SearchResult {
    author: Author;
    categories: ProductCategory[];
    items: Product[];
}

export interface ProductDetailResult {
    author: Author;
    item: ProductDetail;
}