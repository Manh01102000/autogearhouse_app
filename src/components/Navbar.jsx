import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/about">Giới thiệu</Link></li>
        <li><Link to="/products">Sản phẩm</Link></li>
        <li><Link to="/contact">Liên hệ</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
