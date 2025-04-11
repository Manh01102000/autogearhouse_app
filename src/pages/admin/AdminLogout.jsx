// Sử dụng state
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// authContext (đóng do dùng redux)
// import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const AdminLogout = () => {
    // authContext (đóng do dùng redux)
    // const { logout } = useAuth();
    // lấy ra hàm dispatch của Redux trong component React, thông qua hook
    const dispatch = useDispatch();
    // lấy ra hàm navigate() của React Router trong component
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Gọi action logout từ authSlice
                dispatch(logout());
                navigate("/admin/login"); // hoặc "/" tùy bạn muốn về đâu sau logout
            } catch (error) {
                console.error("Logout error:", error);
            }
        };

        handleLogout();
    }, [logout, navigate]);

    return null; // không cần hiển thị gì cả
};

export default AdminLogout;
