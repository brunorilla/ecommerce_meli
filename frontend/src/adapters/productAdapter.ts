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
}

interface BackendProductDetail extends BackendProduct {
    sold_quantity: number;
    description: string;
}

export interface Product {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    condition: string;
    freeShipping: boolean;
}

export interface ProductDetail extends Product {
    soldQuantity: number;
    description: string;
}

export const adaptProductList = (backendProducts: BackendProduct[]): Product[] => {
    return backendProducts.map((product) => ({
        id: product.id,
        title: product.title,
        price: `${product.price.currency} ${product.price.amount}`,
        imageUrl: product.picture,
        condition: product.condition,
        freeShipping: product.free_shipping
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
    description: backendProduct.description
});