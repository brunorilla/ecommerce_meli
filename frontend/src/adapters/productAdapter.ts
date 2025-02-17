interface BackendProduct {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    location: string;
}

interface BackendProductDetail extends BackendProduct {
    sold_quantity: number;
    description: string;
    categories: ProductCategory[];
}

export interface ProductCategory {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    condition: string;
    freeShipping: boolean;
    location: string;
}

export interface ProductDetail extends Product {
    soldQuantity: number;
    description: string;
    categories: ProductCategory[];
}

export const adaptProductList = (backendProducts: BackendProduct[]): Product[] => {
    return backendProducts.map((product) => ({
        id: product.id,
        title: product.title,
        price: `${product.price.currency} ${product.price.amount}`,
        imageUrl: product.picture,
        condition: product.condition,
        freeShipping: product.free_shipping,
        location: product.location
    }));
};

export const adaptProductDetail = (backendProduct: BackendProductDetail): ProductDetail => ({
    id: backendProduct.id,
    title: backendProduct.title,
    price: `${backendProduct.price.currency} ${backendProduct.price.amount}`,
    imageUrl: backendProduct.picture,
    condition: backendProduct.condition,
    freeShipping: backendProduct.free_shipping,
    soldQuantity: backendProduct.sold_quantity,
    description: backendProduct.description,
    categories: backendProduct.categories,
    location: backendProduct.location
});