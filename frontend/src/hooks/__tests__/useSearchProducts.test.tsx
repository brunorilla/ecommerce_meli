import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "../../store/slices/productsSlice";
import { useSearchProducts } from "../useSearchProducts";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import type { RootState } from "../../store";

const createMockStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: { products: productsReducer },
        preloadedState: preloadedState as RootState,
    });
};

let mockStore: ReturnType<typeof createMockStore>;

beforeEach(() => {
    vi.clearAllMocks();
    mockStore = createMockStore();
});

afterEach(() => {
    vi.restoreAllMocks();
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
);

describe("useSearchProducts Hook", () => {
    it("should return initial state", () => {
        const { result } = renderHook(() => useSearchProducts(""), { wrapper: Wrapper });
        expect(result.current.loading).toBe(false);
        expect(result.current.searchResults).toEqual([]);
        expect(result.current.categories).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("should dispatch fetchProducts when query is provided", async () => {
        const dispatchSpy = vi.spyOn(mockStore, "dispatch");

        await act(async () => {
            renderHook(() => useSearchProducts("iphone"), { wrapper: Wrapper });
        });

        expect(dispatchSpy).toHaveBeenCalledTimes(1);

        const dispatchedThunk = dispatchSpy.mock.calls[0][0];
        expect(typeof dispatchedThunk).toBe("function");
        const dummyDispatch = vi.fn();
        //@ts-expect-error: to do fix
        const resultThunk = await dispatchedThunk(dummyDispatch, mockStore.getState, undefined);
        expect(resultThunk.meta.arg).toEqual({ query: "iphone", category: undefined });
    });

    it("should dispatch fetchProducts when category is provided", async () => {
        const dispatchSpy = vi.spyOn(mockStore, "dispatch");

        await act(async () => {
            renderHook(() => useSearchProducts("", "electronics"), { wrapper: Wrapper });
        });

        expect(dispatchSpy).toHaveBeenCalledTimes(1);

        const dispatchedThunk = dispatchSpy.mock.calls[0][0];
        expect(typeof dispatchedThunk).toBe("function");

        const dummyDispatch = vi.fn();
        //@ts-expect-error: to do fix
        const resultThunk = await dispatchedThunk(dummyDispatch, mockStore.getState, undefined);
        expect(resultThunk.meta.arg).toEqual({ query: "", category: "electronics" });
    });

    it("should not dispatch fetchProducts if no query or category is provided", async () => {
        const dispatchSpy = vi.spyOn(mockStore, "dispatch");

        await act(async () => {
            renderHook(() => useSearchProducts(""), { wrapper: Wrapper });
        });

        expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it("should update state when products are fetched", async () => {
        act(() => {
            mockStore.dispatch(
                fetchProducts.fulfilled(
                    {
                        items: [
                            {
                                id: "1",
                                title: "iPhone",
                                price: "1000",
                                imageUrl: "",
                                condition: "new",
                                freeShipping: true,
                            },
                        ],
                        categories: [{ id: "cat1", name: "Phones" }],
                    },
                    "requestId",
                    { query: "iphone" }
                )
            );
        });

        const { result } = renderHook(() => useSearchProducts("iphone"), { wrapper: Wrapper });

        expect(result.current.searchResults).toHaveLength(1);
        expect(result.current.categories).toEqual([{ id: "cat1", name: "Phones" }]);
    });

});