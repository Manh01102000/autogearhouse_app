// AuthContext.js

// IMPORT SERVICE xử lý API liên quan đến người dùng (login, verifyToken, refreshToken)
import * as UserService from "../services/UserService";

// Import các hook và hàm cần thiết từ React
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo Context để chia sẻ thông tin xác thực (user, login, logout, ...)
const AuthContext = createContext();

// AuthProvider sẽ bao bọc toàn bộ app để cung cấp dữ liệu xác thực
export function AuthProvider({ children }) {
    // State lưu thông tin người dùng hiện tại
    const [user, setUser] = useState(null);

    // State kiểm soát việc đang kiểm tra đăng nhập hay không
    const [loading, setLoading] = useState(true);

    // useEffect chạy 1 lần khi component được mount (ứng dụng khởi chạy)
    // → dùng để kiểm tra xem user đã đăng nhập hay chưa thông qua token lưu trong localStorage
    useEffect(() => {
        const checkAuth = async () => {
            // Lấy token từ localStorage
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Nếu có token, tạo headers để gửi kèm theo request
                    const headers = {
                        'Authorization': `Bearer ${token}`,
                    };

                    // Gọi API verifyToken để xác thực token
                    const userData = await UserService.verifyToken(headers);
                    if (userData.data) {
                        // Nếu thành công, lưu thông tin user vào state
                        setUser(userData.data);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    // Nếu token không hợp lệ hoặc có lỗi → xóa token
                    localStorage.removeItem('token');
                }
            }

            // Dù có token hay không, sau khi kiểm tra xong thì tắt trạng thái loading
            setLoading(false);
        };

        checkAuth();
    }, []); // [] để đảm bảo chỉ chạy 1 lần khi component mount

    // Hàm làm mới token khi cần (ví dụ token hết hạn)
    const refreshToken = async () => {
        try {
            // Lấy token hiện tại
            const token = localStorage.getItem('token');
            // Gửi kèm token trong header
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            // Gọi API để lấy access token mới
            const response = await UserService.refreshToken(headers);

            // Lưu token mới vào localStorage
            localStorage.setItem('token', response.access_token);

            return true;
        } catch (error) {
            // Nếu không làm mới được → logout
            logout();
            return false;
        }
    };

    // Hàm login được gọi khi người dùng submit form đăng nhập
    const login = async (email, password) => {
        try {
            const response = await UserService.LoginUser(email, password);

            // Nếu login thất bại (result = false), ném lỗi
            if (!response.result) {
                throw new Error(response.message || "Sai tên đăng nhập hoặc mật khẩu");
            }

            // Nếu thành công, lấy token và user từ response
            const { token, user } = response.data;

            // Lưu token vào localStorage
            localStorage.setItem('token', token);
            console.log(user);
            // Lưu user vào state
            setUser(user);

        } catch (error) {
            // Thêm thông tin chi tiết vào error để hiển thị lên UI nếu cần
            error.message = `Lỗi đăng nhập: ${error.message}`;
            // Ném lỗi tiếp để component sử dụng login() có thể xử lý
            throw error;
        }
    };

    // Hàm logout: xóa token và xóa user khỏi state
    const logout = () => {
        localStorage.removeItem('token'); // Xóa token
        setUser(null); // Reset user
    };
    // console.log(user);
    // Trả về Provider để bọc quanh App, truyền các giá trị user, loading, login, logout cho toàn bộ app
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook để dùng AuthContext dễ dàng hơn ở các component khác
export function useAuth() {
    return useContext(AuthContext);
}
