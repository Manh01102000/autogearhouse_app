import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      {/* Luôn hiển thị ở đầu trang */}
      <Header />
      {/* ✅ Đặt Navbar vào Layout để luôn hiển thị trên mọi trang */}
      <Navbar />
      {/* Đây là nơi hiển thị nội dung từng trang */}
      <main>{children}</main>
      {/* Luôn hiển thị ở cuối trang */}
      <Footer />
    </>
  );
};

export default MainLayout;
