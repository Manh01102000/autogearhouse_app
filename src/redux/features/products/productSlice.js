// redux/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../../services/ProductService';

// Lấy danh sách sản phẩm mới về
export const fetchNewProducts = createAsyncThunk(
    "products/fetchNewProducts",
    async (params, { rejectWithValue }) => {
        try {
            const page = params.page || 1;
            const pageSize = params.pageSize || 10;
            const res = await productService.getProductNew(page, pageSize);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy sản phẩm mới');
        }
    }
);

// Lấy danh sách sản phẩm nổi bật (bán chạy)
export const fetchFeaturedProducts = createAsyncThunk(
    "products/fetchFeaturedProducts",
    async (params, { rejectWithValue }) => {
        try {
            const page = params.page || 1;
            const pageSize = params.pageSize || 10;
            const res = await productService.getProductFeatured(page, pageSize);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy sản phẩm nổi bật');
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        newProducts: [],
        featuredProducts: [],
        loadingNew: false,
        loadingFeatured: false,
        errorNew: null,
        errorFeatured: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- Sản phẩm mới về ---
            .addCase(fetchNewProducts.pending, (state) => {
                state.loadingNew = true;
                state.errorNew = null;
            })
            .addCase(fetchNewProducts.fulfilled, (state, action) => {
                state.loadingNew = false;
                state.newProducts = action.payload;
            })
            .addCase(fetchNewProducts.rejected, (state, action) => {
                state.loadingNew = false;
                state.errorNew = action.payload;
            })

            // --- Sản phẩm nổi bật ---
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.loadingFeatured = true;
                state.errorFeatured = null;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.loadingFeatured = false;
                state.featuredProducts = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.loadingFeatured = false;
                state.errorFeatured = action.payload;
            });
    },
});

export default productSlice.reducer;
