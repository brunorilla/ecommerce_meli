import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    fetchProducts,
    fetchProductDetail,
    fetchProductCategory,
    clearSelectedProduct,
    ProductsState
} from "./productsSlice";
import productsReducer from "./productsSlice";

const initialState: ProductsState = {
    loading: false,
    searchResults: [],
    selectedProduct: null,
    categories: [],
    error: null,
};

describe("productsSlice", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should return the initial state", () => {
        expect(productsReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should handle clearSelectedProduct", () => {
        const modifiedState = {
            ...initialState,
            selectedProduct: { id: "123", title: "Test Product", price: "100", imageUrl: "", condition: "new", freeShipping: true, soldQuantity: 10, description: "Test", categories: [] },
            categories: [{ id: "cat1", name: "Category 1" }],
        };
        const newState = productsReducer(modifiedState, clearSelectedProduct());
        expect(newState.selectedProduct).toBeNull();
        expect(newState.categories).toEqual([]);
    });

    it("should handle fetchProducts.pending", () => {
        const action = { type: fetchProducts.pending.type };
        const newState = productsReducer(initialState, action);
        expect(newState.loading).toBe(true);
        expect(newState.error).toBeNull();
    });

    it("should handle fetchProducts.fulfilled", () => {
        const mockPayload = {
            items: [{ id: "123", title: "Test Product", price: "100", imageUrl: "", condition: "new", freeShipping: true }],
            categories: [{ id: "cat1", name: "Category 1" }],
        };
        const action = { type: fetchProducts.fulfilled.type, payload: mockPayload };
        const newState = productsReducer(initialState, action);
        expect(newState.loading).toBe(false);
        expect(newState.searchResults).toHaveLength(1);
        expect(newState.categories).toEqual(mockPayload.categories);
    });

    it("should handle fetchProducts.rejected", () => {
        const action = { type: fetchProducts.rejected.type, payload: "Error message" };
        const newState = productsReducer(initialState, action);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe("Error message");
    });

    it("should handle fetchProductDetail.fulfilled", () => {
        const mockProduct = {
            id: "123",
            title: "Test Product",
            price: "100",
            imageUrl: "",
            condition: "new",
            freeShipping: true,
            soldQuantity: 10,
            description: "Test",
            categories: [{ id: "cat1", name: "Category 1" }],
        };
        const action = { type: fetchProductDetail.fulfilled.type, payload: mockProduct };
        const newState = productsReducer(initialState, action);
        expect(newState.selectedProduct).toEqual(mockProduct);
    });

    it("should handle fetchProductCategory.fulfilled", () => {
        const action = { type: fetchProductCategory.fulfilled.type, payload: [{ id: "cat1", name: "Category 1" }] };
        const newState = productsReducer(initialState, action);
        expect(newState.categories).toEqual([{ id: "cat1", name: "Category 1" }]);
    });
});