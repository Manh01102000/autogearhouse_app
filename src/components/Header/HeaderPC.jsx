import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaBell, FaUserPlus, FaSearch, FaHeadset, FaShoppingCart, FaHome } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import logoweb from '../../assets/images/home/weblogo.png';
// REDUX
import { useSelector } from 'react-redux';
// CSS
import './HeaderPC.scss';
const HeaderPC = ({ isLogin }) => {
    // Lấy dữ liệu danh mục từ useSelector
    const { category, loading, error } = useSelector((state) => state.category);
    return (
        <>
            <div id="header-pc">
                <div className="header-pc_top">
                    <div className='header-pc_top_boder'>
                        <div className='header-pc_top_left'>
                            <ul>
                                <li>
                                    <FaPhone />
                                    <p className='font_s14'>1900 1354</p>
                                </li>
                                <li>
                                    <MdEmail />
                                    <p className='font_s14'>Mail@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                        <div className='header-pc_top_right'>
                            <ul>
                                <li><FaSearch /></li>
                                <li><Link to={'/login'}><FaUser /></Link></li>
                                <li><FaBell /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header-pc_content">
                    <div className='header-pc_content_boder'>
                        <div className='header-pc_content_left'>
                            <Link to={'/'}>
                                <img src={logoweb} className='header-logo_web' alt="logo web" />
                            </Link>
                        </div>
                        <div className='header-pc_content_right'>
                            <nav className="navigation">
                                <div className="nav-menu">
                                    <div className="nav-col-menu">
                                        <nav className="header-nav">
                                            <ul className="item_big">
                                                <li className="nav-item">
                                                    <div className="nav-item_big">
                                                        <Link className="a-img cl_000 w100 font_s16 line_h20 font_w500" to={"/"} title="Trang chủ">
                                                            Trang chủ
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="nav-item-prod">
                                                    <div className="nav-item_big">
                                                        <p className="a-img product-down cl_000 w100 font_s16 line_h20 font_w500">
                                                            Sản phẩm
                                                        </p>
                                                    </div>
                                                    <div className="boder-nav-dropdown">
                                                        <div className="nav-dropdown">
                                                            {category.map((item, index) => (
                                                                <li key={index} className="nav-dropdown-item">
                                                                    <div className="nav-dropdown-title">
                                                                        <Link
                                                                            className="nav-link-title"
                                                                            to={`/${item.cat_alias}`}
                                                                            title={item.cat_name}>
                                                                            {item.cat_name}
                                                                        </Link>
                                                                    </div>
                                                                    {item.children && item.children.length > 0 && (
                                                                        <ul className="nav-submenu">
                                                                            {item.children.map((child, i) => (
                                                                                <li key={i} className="nav-submenu-item">
                                                                                    <Link
                                                                                        to={`/${item.cat_alias}/${child.cat_alias}`}
                                                                                        title={child.cat_name}
                                                                                        className="nav-link-sub">
                                                                                        {child.cat_name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="nav-item_big">
                                                        <Link className="a-img product-down cl_000 w100 font_s16 line_h20 font_w500" to={"/tin-tuc"} title="Tin tức">
                                                            Tin tức
                                                        </Link>
                                                    </div>
                                                    <ul className="nav-item_small">
                                                        <li>
                                                            <Link className="font_s14 line_h16 cl_000 w100" to={"/tin-tuc"} title="Bài viết nổi bật">
                                                                Bài viết nổi bật
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="font_s14 line_h16 cl_000 w100" to={"/xu-huong-thoi-trang"} title="Mẫu xe">
                                                                Mẫu xe
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="font_s14 line_h16 cl_000 w100" to={"/tin-tuc-tuyen-dung"} title="Tuyển dụng">
                                                                Tuyển dụng
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="nav-item_big">
                                                        <Link className="a-img cl_000 w100 font_s16 line_h20 font_w500" to={"/lien-he"} title="Liên hệ">
                                                            Liên hệ
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li className="nav-item">
                                                    <div className="nav-item_big">
                                                        <Link className="a-img cl_000 w100 font_s16 line_h20 font_w500" to={"/dang-ky-lai-thu"} title="Đăng ký lái thử">
                                                            Đăng ký lái thử
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderPC;