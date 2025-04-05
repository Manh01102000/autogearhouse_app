// ==================APPROUTER: Chịu trách nhiệm điều hướng các trang dành cho User=================
// Import Routes và Route từ React Router để định nghĩa các đường dẫn
import { Routes, Route } from "react-router-dom";
// Import các trang chính của website.
import LoginAdmin from "../../pages/admin/AdminLogin/AdminLogin";
import Dashboard from "../../pages/admin/Dashboard";
// PRODUCT
import ManageProducts from "../../pages/admin/Product/ManageProducts";
import AddProducts from "../../pages/admin/Product/AddProducts";
import EditProducts from "../../pages/admin/Product/EditProducts";
// USER
import UserLists from "../../pages/admin/User/UserList";
import AdminLists from "../../pages/admin/User/AdminList";
import BusinessLists from "../../pages/admin/User/BusinessList";
import AddUser from "../../pages/admin/User/AddUser";
import EditUser from "../../pages/admin/User/EditUser";
//404
import NotFound from "../../pages/NotFound";
// Cấu hình
// Cấu hình kiểm tra quyền đăng nhập
import ProtectedRoute from '../../components/ProtectedRoute';


const AppRouter = () => {
    return (
        <Routes>
            {/* Public route */}
            <Route path="login" element={<LoginAdmin />} />

            {/* Nhóm các route cần bảo vệ chung */}
            <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* PRODUCT */}
                <Route path="product-list" element={<ManageProducts />} />
                <Route path="add-products" element={<AddProducts />} />
                <Route path="edit-products/:id" element={<EditProducts />} />

                {/* USER */}
                <Route element={<ProtectedRoute adminOnly />}>
                    <Route path="add-user" element={<AddUser />} />
                    <Route path="edit-user/:id" element={<EditUser />} />
                    <Route path="admins" element={<AdminLists />} />
                </Route>

                <Route path="users" element={<UserLists />} />
                <Route path="business" element={<BusinessLists />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
// Xuất AppRouter
export default AppRouter; 
