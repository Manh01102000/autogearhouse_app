// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import authReducer from './features/auth/authSlice';
import categoryReducer from './features/category/categoriesSlice';
import initAppDataReducer from './features/initAppData/initAppDataSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        category: categoryReducer,
        initAppData: initAppDataReducer,
    },
});

export default store;
