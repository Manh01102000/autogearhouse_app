// ==================APPROUTER: Chịu trách nhiệm điều hướng các trang dành cho User=================
// Import Routes và Route từ React Router để định nghĩa các đường dẫn
import { Routes, Route } from "react-router-dom";
//Import MainLayout để bọc tất cả các trang bên trong layout chính (có Header, Footer, v.v.)
import MainLayout from "../../layouts/MainLayout";
// Import các trang chính của website.
import Home from "../../pages/Home";
import ProductDetails from "../../pages/Product/ProductDetails";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/RegisterAccount";
import NotFound from "../../pages/NotFound";
// Cấu hình

const AppRouter = () => {
  return (
    <MainLayout>
      {/* Bọc Routes bên trong MainLayout để đảm bảo Header/Footer xuất hiện trên tất cả các trang */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dang-nhap-tai-khoan" element={<Login />} />
        <Route path="/dang-ky-tai-khoan" element={<Register />} />
        <Route path="/san-pham/:slugId" element={<ProductDetails />} />
        {/* Route path="*" bắt tất cả đường dẫn không hợp lệ và hiển thị trang NotFound. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};
// Xuất AppRouter
export default AppRouter; 
