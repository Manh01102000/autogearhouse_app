// Layout trang admin
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />       {/* Luôn hiển thị ở đầu trang */}
      <main>{children}</main>  {/* Đây là nơi hiển thị nội dung từng trang */}
      <Footer />       {/* Luôn hiển thị ở cuối trang */}
    </>
  );
};

export default MainLayout;
