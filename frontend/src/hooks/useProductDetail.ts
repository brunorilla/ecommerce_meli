import {RootState, useAppDispatch, useAppSelector} from "../store";
import {fetchProductDetail, clearSelectedProduct} from "../store/slices/productsSlice";
import {useEffect} from "react";

export const useProductDetail = (id: string) => {
    const dispatch = useAppDispatch();
    const {loading, selectedProduct, categories, error} = useAppSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProductDetail(id));
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, dispatch]);
    return {loading, selectedProduct, categories, error};
};