// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as BrandService from "../../../services/BrandService";
import * as ModelProductService from "../../../services/ModelProductService";

// Khởi tạo thunk để lấy dữ liệu Hãng
export const brand = createAsyncThunk(
    'initAppData/brand',
    async (_, thunkAPI) => {
        try {
            const response = await BrandService.getDataBrand();
            // Nếu không có dữ liệu
            if (!response.result) {
                throw new Error(response.message || "Có lỗi xảy ra vui lòng thử lại sau");
            }
            const { brand } = response.data;
            // Lưu vào localStorage
            localStorage.setItem('brand', JSON.stringify(brand)); // convert về string
            return brand;
        } catch (error) {
            // Trả lỗi về reducer
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Không tìm thấy dữ liệu');
        }
    }
);

// Khởi tạo thunk để lấy dữ liệu Dòng
export const modelProduct = createAsyncThunk(
    'initAppData/modelProduct',
    async (_, thunkAPI) => {
        try {
            const response = await ModelProductService.getDataModelProduct();
            // Nếu không có dữ liệu
            if (!response.result) {
                throw new Error(response.message || "Có lỗi xảy ra vui lòng thử lại sau");
            }
            // console.log(response);
            const { modelProduct } = response.data;
            // Lưu vào localStorage
            localStorage.setItem('modelProduct', JSON.stringify(modelProduct)); // convert về string
            return modelProduct;
        } catch (error) {
            // Trả lỗi về reducer
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Không tìm thấy dữ liệu');
        }
    }
);

const authSlice = createSlice({
    name: 'initAppData',
    // Khởi tạo initialState ban đầu Khi app vừa khởi chạy, lấy dữ liệu trước đó từ localStorage.
    initialState: {
        brand: JSON.parse(localStorage.getItem('brand')) || [],
        modelProduct: JSON.parse(localStorage.getItem('modelProduct')) || [],
        loading: false,
        error: null,
    },
    reducers: {},
    // xử lý kết quả từ createAsyncThunk
    extraReducers: (builder) => {
        builder
            // khi đang gửi request
            .addCase(brand.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // khi thành công cập nhật brand vào Redux store.
            .addCase(brand.fulfilled, (state, action) => {
                state.loading = false;
                state.brand = action.payload;
            })
            // khi thất bại
            .addCase(brand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // khi đang gửi request
            .addCase(modelProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // khi thành công cập nhật modelProduct vào Redux store.
            .addCase(modelProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.modelProduct = action.payload;
            })
            // khi thất bại
            .addCase(modelProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export authSlice.reducer để dùng trong store.js.
export default authSlice.reducer;
