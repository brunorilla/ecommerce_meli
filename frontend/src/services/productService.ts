import axios from "axios";
import { adaptProductList, adaptProductDetail } from "../adapters/productAdapter";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProductsService = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/items?q=${query}`);
        return {
            items: adaptProductList(response.data.items),
            categories: response.data.categories
        };
    } catch (error: any) {
        throw new Error(error.response?.data || "Error al obtener productos");
    }
};

export const fetchProductDetailService = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/items/${id}`);
        return adaptProductDetail(response.data.item);
    } catch (error: any) {
        throw new Error(error.response?.data || "Error al obtener detalles del producto");
    }
};