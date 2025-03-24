// ==================APPROUTER: Chịu trách nhiệm điều hướng các trang dành cho Admin=================
// Import Routes và Route từ React Router để định nghĩa các đường dẫn
import { Routes, Route } from "react-router-dom";
//Import AdminLayout để bọc tất cả các trang bên trong layout chính (có Header, Footer, v.v.)
import AdminLayout from "../../layouts/AdminLayout";
// Import các trang chính của website.
import Dashboard from "../../pages/admin/Dashboard";
import ManageProducts from "../../pages/admin/ManageProducts";
import ManageUsers from "../../pages/admin/ManageUsers";
import NotFound from "../../pages/NotFound";

const AdminRouter = () => {
    return (
        <AdminLayout>
            {/* Bọc Routes bên trong AdminLayout để đảm bảo Header/Footer xuất hiện trên tất cả các trang */}
            <Routes>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                {/* Route path="*" bắt tất cả đường dẫn không hợp lệ và hiển thị trang NotFound. */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminRouter;
