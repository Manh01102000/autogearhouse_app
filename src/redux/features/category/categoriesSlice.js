// categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as CategoryService from "../../../services/CategoryService";

// Khởi tạo thunk để lấy dữ liệu category dạng cây
export const tree = createAsyncThunk(
    'category/tree',
    async (_, thunkAPI) => {
        try {
            const response = await CategoryService.getDataCategoryTree();
            // Nếu không có dữ liệu
            if (!response.result) {
                throw new Error(response.message || "Có lỗi xảy ra vui lòng thử lại sau");
            }
            const { category } = response.data;
            // Lưu vào localStorage
            localStorage.setItem('category', JSON.stringify(category)); // ✅ convert về string
            return category; // ✅ trả về đúng category thay vì toàn bộ response
        } catch (error) {
            // Trả lỗi về reducer
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Không tìm thấy dữ liệu');
        }
    }
);

const authSlice = createSlice({
    name: 'category',
    // Khởi tạo initialState ban đầu Khi app vừa khởi chạy, nếu đã category trước đó thì lấy lại từ localStorage.
    initialState: {
        category: JSON.parse(localStorage.getItem('category')) || null,
        loading: false,
        error: null,
    },
    reducers: {},
    // xử lý kết quả từ createAsyncThunk
    extraReducers: (builder) => {
        builder
            // khi đang gửi request
            .addCase(tree.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // khi thành công cập nhật category vào Redux store.
            .addCase(tree.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            // khi thất bại
            .addCase(tree.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export authSlice.reducer để dùng trong store.js.
export default authSlice.reducer;
