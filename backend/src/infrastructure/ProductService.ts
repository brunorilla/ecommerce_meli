import axios from "axios";
import {  SearchResult, ProductDetailResult } from "../domain/Product";

const API_URL = "https://api.mercadolibre.com";

const AUTHOR = { name: "Bruno", lastname: "Rilla Santiago" };

export class ProductService {
    static async searchProducts(query: string): Promise<SearchResult> {
        const response = await axios.get(`${API_URL}/sites/MLA/search?q=${query}`);
        const categories = response.data.filters.find((f: any) => f.id === "category")?.values[0]?.path_from_root.map((c: any) => c.name) || [];

        const items = response.data.results.slice(0, 4).map((item: any) => ({
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
        }));

        return { author: AUTHOR, categories, items };
    }

    static async getProductDetail(id: string): Promise<ProductDetailResult> {
        const [itemRes, descRes] = await Promise.all([
            axios.get(`${API_URL}/items/${id}`),
            axios.get(`${API_URL}/items/${id}/description`)
        ]);

        console.log(itemRes.data)
        console.log(descRes.data)

        const item = itemRes.data;
        const description = descRes.data.plain_text;

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
                description,
            }
        };
    }
}