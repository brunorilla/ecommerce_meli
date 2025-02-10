import {RootState, useAppDispatch, useAppSelector} from "../store";
import {fetchProductDetail, fetchProductCategory, clearSelectedProduct} from "../store/slices/productsSlice";
import {useEffect} from "react";

export const useProductDetail = (id: string) => {
    const dispatch = useAppDispatch();
    const {loading, selectedProduct, category, error} = useAppSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProductDetail(id)).then((action) => {
            if (action.payload?.category_id) {
                dispatch(fetchProductCategory(action.payload.category_id));
            }
        });

        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, dispatch]);
    return {loading, selectedProduct, category, error};
};