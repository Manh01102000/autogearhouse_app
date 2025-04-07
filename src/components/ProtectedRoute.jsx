// Import hook useAuth để lấy thông tin người dùng từ AuthContext
import { useAuth } from '../contexts/AuthContext';

// Import Navigate và Outlet từ React Router để điều hướng và hiển thị component con trong route
import { Navigate, Outlet } from 'react-router-dom';
// Outlet là một component đặc biệt được cung cấp bởi React Router v6+, dùng để hiển thị các route con (nested routes) bên trong một route cha.

// Component ProtectedRoute để bảo vệ các route, chỉ cho phép truy cập nếu đã đăng nhập
// Tham số adminOnly (mặc định là false): nếu true → chỉ admin mới được truy cập
const ProtectedRoute = ({ adminOnly = false }) => {
    // Lấy user và trạng thái loading từ context
    const { user, loading } = useAuth();

    // Nếu vẫn đang trong quá trình kiểm tra đăng nhập (loading) → hiển thị loading tạm thời
    if (loading) return <div>Loading...</div>;

    // Nếu không có user (nghĩa là chưa đăng nhập) → chuyển hướng sang trang đăng nhập admin
    if (!user) return <Navigate to="/admin/login" replace />;
    // console.log(user);
    // Nếu route yêu cầu quyền admin nhưng user hiện tại không phải admin (role = '2')
    // → chuyển hướng về trang chủ (ngăn user thường truy cập vào route dành cho admin)
    if (adminOnly && user.user_role != '2') {
        return <Navigate to="/" replace />;
    }

    // Nếu đã đăng nhập và có đủ quyền → cho phép truy cập vào route con thông qua <Outlet />
    return <Outlet />;
};

// Export component để sử dụng ở nơi khác (ví dụ trong file định nghĩa route)
export default ProtectedRoute;
