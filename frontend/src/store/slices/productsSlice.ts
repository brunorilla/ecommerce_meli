import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsService, fetchProductDetailService } from "../../services/productService.ts";

interface Product {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    condition: string;
    freeShipping: boolean;
}

interface ProductDetail extends Product {
    soldQuantity: number;
    description: string;
}

interface ProductsState {
    loading: boolean;
    searchResults: Product[];
    selectedProduct: ProductDetail | null;
    categories: string[];
    error: string | null;
}

const initialState: ProductsState = {
    loading: false,
    searchResults: [],
    selectedProduct: null,
    categories: [],
    error: null,
};

// Ahora usamos el servicio en el AsyncThunk
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (query: string, { rejectWithValue }) => {
        try {
            return await fetchProductsService(query);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductDetail = createAsyncThunk(
    "products/fetchProductDetail",
    async (id: string, { rejectWithValue }) => {
        try {
            return await fetchProductDetailService(id);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.items;
                state.categories = action.payload.categories;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProductDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;