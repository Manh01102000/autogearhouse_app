// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import authReducer from './features/auth/authSlice';
import categoryReducer from './features/category/categoriesSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        category: categoryReducer,
    },
});

export default store;
