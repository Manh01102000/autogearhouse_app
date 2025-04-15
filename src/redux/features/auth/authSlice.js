import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as UserService from "../../../services/UserService";
// Hàm login async thunk, dùng để xử lý logic bất đồng bộ.
export const login = createAsyncThunk(
    'auth/login', // tên action (sẽ tự sinh ra 3 loại: pending, fulfilled, rejected)
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await UserService.LoginUser(email, password);

            // Nếu login thất bại (result = false), ném lỗi
            if (!response.result) {
                throw new Error(response.message || "Sai tên đăng nhập hoặc mật khẩu");
            }

            // Nếu thành công, lấy token và user từ response
            const { token, user } = response.data;

            // Lưu vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            return { user, token };
        } catch (error) {
            // Trả lỗi về reducer
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    }
);

export const registerAccount = createAsyncThunk(
    'auth/registerAccount', // tên action (sẽ tự sinh ra 3 loại: pending, fulfilled, rejected)
    async (data, thunkAPI) => {
        try {
            // console.log(data);return;
            const response = await UserService.createUser(data);

            // Nếu login thất bại (result = false), ném lỗi
            if (!response.result) {
                throw new Error(response.message || 'tạo tài khoản thất bại');
            }

            // Nếu thành công, lấy token và user từ response
            const { token, user } = response.data;

            // Lưu vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            return { user, token };
        } catch (error) {
            // Trả lỗi về reducer
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'tạo tài khoản thất bại');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    // Khởi tạo initialState ban đầu Khi app vừa khởi chạy, nếu đã login trước đó thì lấy lại từ localStorage.
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        // Dùng khi user muốn logout(xóa khỏi state và localStorage.)
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    // xử lý kết quả từ createAsyncThunk
    extraReducers: (builder) => {
        builder
            // ===============Đăng nhập====================
            // khi đang gửi request
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // khi thành công cập nhật user và token vào Redux store.
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            // khi thất bại
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============Đăng ký===================
            // khi đang gửi request
            .addCase(registerAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // khi thành công cập nhật user và token vào Redux store.
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            // khi thất bại
            .addCase(registerAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { logout } = authSlice.actions; //Export logout để gọi trong component.
export default authSlice.reducer; //Export authSlice.reducer để dùng trong store.js.
