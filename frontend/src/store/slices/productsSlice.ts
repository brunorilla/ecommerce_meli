import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Price {
    currency: string;
    amount: number;
    decimals: number;
}

interface Product {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
}

interface ProductDetail extends Product {
    sold_quantity: number;
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

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/items?q=${query}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error al obtener productos");
        }
    }
);

export const fetchProductDetail = createAsyncThunk(
    "products/fetchProductDetail",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/items/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error al obtener detalles del producto");
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
                state.selectedProduct = action.payload.item;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;