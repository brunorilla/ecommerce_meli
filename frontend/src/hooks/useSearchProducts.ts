import {RootState, useAppDispatch, useAppSelector} from "../store";
import { fetchProducts } from "../store/slices/productsSlice";
import { useEffect } from "react";

export const useSearchProducts = (query: string, category?: string) => {
    const dispatch = useAppDispatch();
    const { loading, searchResults, categories, error } = useAppSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (query || category) {
            dispatch(fetchProducts({ query, category }));
        }
    }, [query, category, dispatch]);

    return { loading, searchResults, categories, error };
};