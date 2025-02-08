import {RootState, useAppDispatch, useAppSelector} from "../store";
import { fetchProducts } from "../store/slices/productsSlice";
import { useEffect } from "react";

export const useSearchProducts = (query: string) => {
    const dispatch = useAppDispatch();
    const { loading, searchResults, categories, error } = useAppSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (query) {
            dispatch(fetchProducts(query));
        }
    }, [query, dispatch]);

    return { loading, searchResults, categories, error };
};