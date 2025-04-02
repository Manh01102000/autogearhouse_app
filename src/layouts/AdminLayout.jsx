import HeaderAdmin from "../components/admin/HeaderAdmin";
import NavbarAdmin from "../components/admin/NavbarAdmin";
import FooterAdmin from "../components/admin/FooterAdmin";

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Luôn hiển thị ở đầu trang */}
      <HeaderAdmin />
      {/* ✅ Đặt Navbar vào Layout để luôn hiển thị trên mọi trang */}
      <NavbarAdmin />
      {/* Đây là nơi hiển thị nội dung từng trang */}
      <main>{children}</main>
      {/* Luôn hiển thị ở cuối trang */}
      <FooterAdmin />
    </>
  );
};

export default AdminLayout;
