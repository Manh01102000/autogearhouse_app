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

// Lấy chi tiết sản phẩm
export const fetchDetailProducts = createAsyncThunk(
    'products/fetchDetailProducts',
    async (id, { rejectWithValue }) => {
        try {
            const res = await productService.getProductById(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy sản phẩm nổi bật');
        }
    }
)

// Lấy danh sách sản phẩm mới về
export const fetchSearchProducts = createAsyncThunk(
    "products/fetchSearchProducts",
    async (params, { rejectWithValue }) => {
        try {
            const page = params.page || 1;
            const pageSize = params.pageSize || 20;
            const category = params.categoryID || '';
            const category_code = params.categoryCodeID || '';
            const data = {
                page: page,
                pageSize: pageSize,
                category: category,
                category_code: category_code,
            }
            // console.log(data);return;
            const res = await productService.getProduct(data);
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy sản phẩm mới');
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        // --- Sản phẩm mới về ---
        newProducts: [],
        loadingNew: false,
        errorNew: null,
        // --- Sản phẩm nổi bật ---
        featuredProducts: [],
        loadingFeatured: false,
        errorFeatured: null,
        // --- Chi tiết sản phẩm ---
        detailProducts: [],
        loadingDetail: false,
        errorDetail: null,
        // --- tìm kiếm sản phẩm ---
        searchCateProducts: [],
        loadingSearchCate: false,
        errorSearchCate: null,
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
            })
            // --- Chi tiết sản phẩm ---
            .addCase(fetchDetailProducts.pending, (state) => {
                state.loadingDetail = true;
                state.errorDetail = null;
            })
            .addCase(fetchDetailProducts.fulfilled, (state, action) => {
                state.loadingDetail = false;
                state.detailProducts = action.payload;
            })
            .addCase(fetchDetailProducts.rejected, (state, action) => {
                state.loadingDetail = false;
                state.errorDetail = action.payload;
            })
            // --- tìm kiếm sản phẩm (theo danh mục)---
            .addCase(fetchSearchProducts.pending, (state) => {
                state.loadingSearchCate = true;
                state.errorSearchCate = null;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.loadingSearchCate = false;
                state.searchCateProducts = action.payload;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.loadingSearchCate = false;
                state.errorSearchCate = action.payload;
            });
    },
});

export default productSlice.reducer;
