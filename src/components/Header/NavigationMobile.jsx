import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavigationMobile.scss';
// 
import { useSelector } from 'react-redux';
// 
const NavigationMobile = ({ isOpen, handleCloseNav }) => {
    const [showParent, setShowParent] = useState({});
    // Lấy dữ liệu danh mục từ useSelector
    const { category, loading, error } = useSelector((state) => state.category);

    const toggleParent = (index) => {
        setShowParent((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <>
            {isOpen && (
                <nav className="container_navigation_mobile">
                    <div className="navigation_mobile">
                        <div className="navmobile-top">
                            <p className="navmobile-top-title font_s18 line_h24 font_w600">Danh mục</p>
                            <span className="navmobile-top-close button-close-nav cursor_pt" onClick={handleCloseNav}>
                                <svg width="18" height="18" viewBox="0 0 19 19" role="presentation">
                                    <path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z"
                                        fillRule="evenodd" ></path>
                                </svg>
                            </span>
                        </div>

                        <div className="navmobile-center">
                            <div className="navmobile-menu-show navmobile-menu-lvl0">
                                <div className="navmobile-menu-lv">
                                    <Link href="/" className="navmobile-menu-text font_w500">Trang chủ</Link>
                                </div>
                            </div>
                            <div className="navmobile-menu-show navmobile-menu-lvl0">
                                <div className="navmobile-menu-lv">
                                    <p className="navmobile-menu-text font_w500">Sản phẩm</p>
                                    <div className="box-icon-showhide" onClick={() => toggleParent('category')} data-showhide={showParent['category'] ? '1' : '0'}>
                                        <div className="icon-line-showhide line1-showhide"></div>
                                        <div className="icon-line-showhide line2-showhide"></div>
                                    </div>
                                </div>
                                {showParent['category'] && (
                                    category.map((item, index) => (
                                        <div className="navmobile-menu-show navmobile-menu-lvl1" key={index}>
                                            <div className="navmobile-menu-lv">
                                                <Link to={item.cat_alias} className="navmobile-menu-text font_w500">
                                                    {item.cat_name}
                                                </Link>
                                                {item.children?.length > 0 && (
                                                    <div className="box-icon-showhide" onClick={() => toggleParent(index)} data-showhide={showParent[index] ? '1' : '0'}>
                                                        <div className="icon-line-showhide line1-showhide"></div>
                                                        <div className="icon-line-showhide line2-showhide"></div>
                                                    </div>
                                                )}
                                            </div>

                                            {item.children?.length > 0 && showParent[index] && (
                                                <div className="navmobile-menu-show navmobile-menu-lvl2">
                                                    {item.children.map((child, indexChild) => (
                                                        <div className="navmobile-menu-child" key={indexChild}>
                                                            <div className="navmobile-menu-lv">
                                                                <Link to={`${item.cat_alias}/${child.cat_alias}`} className="navmobile-menu-text">
                                                                    {child.cat_name}
                                                                </Link>
                                                                {child.children?.length > 0 && (
                                                                    <div
                                                                        className="box-icon-showhide"
                                                                        onClick={() => toggleChild(i, indexChild)}
                                                                        data-showhide={showChild[`${i}-${indexChild}`] ? '1' : '0'}>
                                                                        <div className="icon-line-showhide line1-showhide"></div>
                                                                        <div className="icon-line-showhide line2-showhide"></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Tin tức */}
                            <div className="navmobile-menu-show navmobile-menu-lvl0">
                                <div className="navmobile-menu-lv">
                                    <Link to="/tin-tuc" className="navmobile-menu-text font_w500">Tin tức</Link>
                                    <div className="box-icon-showhide" onClick={() => toggleParent('news')} data-showhide={showParent['news'] ? '1' : '0'}>
                                        <div className="icon-line-showhide line1-showhide"></div>
                                        <div className="icon-line-showhide line2-showhide"></div>
                                    </div>
                                </div>
                                {showParent['news'] && (
                                    <div className="navmobile-menu-show navmobile-menu-lvl1">
                                        <div className="navmobile-menu-child">
                                            <div className="navmobile-menu-lv"><Link to="/tin-tuc" className="navmobile-menu-text">Bài viết nổi bật</Link></div>
                                            <div className="navmobile-menu-lv"><Link to="/mau-xe" className="navmobile-menu-text">Mẫu xe</Link></div>
                                            <div className="navmobile-menu-lv"><Link to="/tin-tuc-tuyen-dung" className="navmobile-menu-text">Tuyển dụng</Link></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Liên hệ */}
                            <div className="navmobile-menu-show navmobile-menu-lvl0">
                                <div className="navmobile-menu-lv">
                                    <Link to="/lien-he" className="navmobile-menu-text font_w500">Liên hệ</Link>
                                </div>
                            </div>
                            {/* Đăng ký lái thử */}
                            <div className="navmobile-menu-show navmobile-menu-lvl0">
                                <div className="navmobile-menu-lv">
                                    <Link to="/dang-ky-lai-thu" className="navmobile-menu-text font_w500">Đăng ký lái thử</Link>
                                </div>
                            </div>
                        </div>

                        <div className="navmobile-bottom">{/* Footer hoặc thông tin thêm */}</div>
                    </div>
                </nav>
            )}
        </>

    );
};

export default NavigationMobile;
