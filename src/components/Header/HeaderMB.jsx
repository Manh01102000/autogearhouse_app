import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaUser, FaBell, FaUserPlus, FaSearch, FaHeadset, FaShoppingCart, FaHome } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import logoweb from '../../assets/images/home/weblogo.png';
// CSS
import './HeaderMB.scss';
// Nav
import NavigationMobile from './NavigationMobile';
const HeaderPC = ({ onOpenUserInfo, isLogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpenNav = () => {
        setIsOpen(true);
    };
    const onSearchMobile = () => {
        // Logic for opening the mobile navigation
    };
    const handleCloseNav = () => {
        // Xử lý đóng nav
        setIsOpen(false);
    };
    return (
        <>
            <div id="header-mobile">
                <div className="header-mobile_container">
                    <div className="header-mobile">
                        <div className="hd-mobile_left">
                            <div className="icon-show-menu" onClick={onOpenNav}>
                                <div className="icon-line-showmn line1-showmn"></div>
                                <div className="icon-line-showmn line2-showmn"></div>
                                <div className="icon-line-showmn line3-showmn"></div>
                            </div>
                        </div>

                        <div className="hd-mobile_center">
                            <Link to="/" className="hd-mobile-logo">
                                <img src={`${logoweb}?v=${Date.now()}`}
                                    className="hd-mobile-imglogo"
                                    alt="logo" />
                            </Link>
                        </div>

                        <div className="hd-mobile_right">
                            <button className="button-search-mobile" onClick={onSearchMobile}>
                                <FaSearch size={'18px'} />
                            </button>

                            {isLogin ? (
                                <div className="icon-user-mb cursor_pt" onClick={onOpenUserInfo}>
                                    <FaUser size={'18px'} color='#000' />
                                </div>
                            ) : (
                                <Link to="/dang-nhap-tai-khoan">
                                    <div className="icon-user-mb cursor_pt">
                                        <FaUser size={'18px'} color='#000' />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* <!-- ---------NAVI MOBILE-------------- --> */}
                <NavigationMobile isOpen={isOpen} handleCloseNav={handleCloseNav} />
            </div>
        </>
    )
}

export default HeaderPC;