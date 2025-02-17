import axios from "axios";
import {SearchResult, ProductDetailResult, ProductCategory} from "../domain/Product";

const API_URL = "https://api.mercadolibre.com";

const AUTHOR = {name: "Bruno", lastname: "Rilla Santiago"};

export class ProductService {
    static async searchProducts(query?: string, category?: string): Promise<SearchResult> {
        let url = `${API_URL}/sites/MLA/search?`;
        if (query) url += `q=${query}`;
        if (category) url += `${query ? "&" : ""}category=${category}`;

        let categories: ProductCategory[] = [];

        const response = await axios.get(url);

        try {
            categories = response.data.filters.find((f: any) => f.id === "category")?.values[0]?.path_from_root.map((c: any) => ({
                id: c.id,
                name: c.name
            })) || [];
        } catch (error: any) {
            console.error("Error fetching categories in searchProducts", error.message);
        }

        if (!categories.length) {
            categories = [{id: "unknown", name: "Categoría indeterminada"}];
        }

        const items = response.data.results.slice(0, 10).map((item: any) => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: parseInt((item.price % 1).toFixed(2).substring(2)) || 0,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            location: `${item.address?.city_name || "Ciudad desconocida"}, ${item.address?.state_name || "Provincia desconocida"}`
        }));

        return {author: AUTHOR, categories, items};
    }

    static async getProductDetail(id: string): Promise<ProductDetailResult> {
        const [itemRes, descRes] = await Promise.all([
            axios.get(`${API_URL}/items/${id}`),
            axios.get(`${API_URL}/items/${id}/description`)
        ]);


        const item = itemRes.data;
        const description = descRes.data.plain_text;

        const categoryRes = await axios.get(`${API_URL}/categories/${item.category_id}`);
        const categories = categoryRes.data.path_from_root;

        return {
            author: AUTHOR,
            item: {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: parseInt((item.price % 1).toFixed(2).substring(2)) || 0,
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
                location: `${item.seller_address?.city?.name || "Ciudad desconocida"}, ${item.seller_address?.state?.name || "Provincia desconocida"}`,
                description,
                categories
            }
        };
    }
}