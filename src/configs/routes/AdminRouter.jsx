// ==================APPROUTER: Chịu trách nhiệm điều hướng các trang dành cho User=================
// Import Routes và Route từ React Router để định nghĩa các đường dẫn
import { Routes, Route } from "react-router-dom";
// Import các trang chính của website.
import LoginAdmin from "../../pages/admin/AdminLogin/AdminLogin";
import Dashboard from "../../pages/admin/Dashboard";
// PRODUCT
import ManageProducts from "../../pages/admin/Product/ManageProducts";
import AddProducts from "../../pages/admin/Product/AddProducts";
// USER
import UserLists from "../../pages/admin/User/UserList";
import AdminLists from "../../pages/admin/User/AdminList";
import BusinessLists from "../../pages/admin/User/BusinessList";
import AddUser from "../../pages/admin/User/AddUser";
import EditUser from "../../pages/admin/User/EditUser";
//404
import NotFound from "../../pages/NotFound";
// Cấu hình

const AppRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginAdmin />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* PRODUCT */}
            <Route path="product-list" element={<ManageProducts />} />
            <Route path="add-products" element={<AddProducts />} />
            {/* USER */}
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-admin/:id" element={<EditUser />} />
            <Route path="users" element={<UserLists />} />
            <Route path="admins" element={<AdminLists />} />
            <Route path="business" element={<BusinessLists />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
// Xuất AppRouter
export default AppRouter; 
