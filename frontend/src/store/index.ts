import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;

export default store;