import { describe, it, expect, beforeEach, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchProductsService, fetchProductDetailService, fetchProductCategoryService } from "../productService";

const API_URL = import.meta.env.VITE_API_URL;
let mock: MockAdapter;

describe("Product Service", () => {
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.resetHandlers();
        mock.restore();
    });

    it("should fetch product list successfully", async () => {
        const mockData = {
            items: [
                { id: "123", title: "Test Product", price: 100, imageUrl: "test.jpg", condition: "new", freeShipping: true },
            ],
            categories: [{ id: "cat1", name: "Category 1" }]
        };

        mock.onGet(`${API_URL}/api/items?q=test`).reply(200, mockData);

        const response = await fetchProductsService("test");
        expect(response.items).toHaveLength(1);
        expect(response.categories[0].name).toBe("Category 1");
    });

    it("should fetch product details successfully", async () => {
        const mockProduct = {
            item: {
                id: "123",
                title: "Test Product",
                price: 100,
                imageUrl: "test.jpg",
                condition: "new",
                freeShipping: true,
                description: "A great product",
            },
        };

        mock.onGet(`${API_URL}/api/items/123`).reply(200, mockProduct);

        const response = await fetchProductDetailService("123");
        expect(response.title).toBe("Test Product");
        expect(response.description).toBe("A great product");
    });

    it("should fetch product category successfully", async () => {
        const mockCategory = {
            path_from_root: [{ id: "cat1", name: "Category 1" }, { id: "cat2", name: "Category 2" }],
        };

        mock.onGet(`${API_URL}/api/categories/cat1`).reply(200, mockCategory);

        const response = await fetchProductCategoryService("cat1");
        expect(response).toEqual(["Category 1", "Category 2"]);
    });

    it("should throw an error when fetchProductsService fails", async () => {
        mock.onGet(`${API_URL}/api/items?q=test`).reply(500);

        await expect(fetchProductsService("test")).rejects.toThrow("Error al obtener productos");
    });

    it("should throw an error when fetchProductDetailService fails", async () => {
        mock.onGet(`${API_URL}/api/items/123`).reply(500);

        await expect(fetchProductDetailService("123")).rejects.toThrow("Error al obtener detalles del producto");
    });

    it("should throw an error when fetchProductCategoryService fails", async () => {
        mock.onGet(`${API_URL}/api/categories/cat1`).reply(500);

        await expect(fetchProductCategoryService("cat1")).rejects.toThrow("Error al obtener categoría del producto");
    });
});