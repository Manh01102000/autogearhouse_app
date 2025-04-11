import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ adminOnly = false }) => {
    // Lấy user từ Redux store
    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    // Nếu chưa đăng nhập thì redirect về trang đăng nhập
    if (!user || (user && user.user_authentic == 0)) return <Navigate to="/admin/login" replace />;

    // Nếu yêu cầu admin mà user không phải admin thì redirect về trang chủ
    if (adminOnly && user.user_role != 2) {
        return <Navigate to="/" replace />;
    }

    // Nếu hợp lệ thì cho phép vào các route con
    return <Outlet />;
};

export default ProtectedRoute;
