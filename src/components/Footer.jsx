import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { SiTiktok } from 'react-icons/si';
import { MdPlayArrow, MdEmail } from 'react-icons/md';
import logoweb from '../assets/images/home/weblogofooter.png';
// REACT_ROUTER_DOM
import { Link } from 'react-router-dom';
import './Footer.scss';
const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer_container">
                <div className="footer_center">
                    <div className="footer_center_left">
                        <div className="footer_center_left_box">
                            <div className="footer_logo">
                                <img className="footer_img_logo"
                                    src={logoweb}
                                    alt="icon" />
                            </div>
                            <div className="footer_center_left_content">
                                <div className="footer_box_left_content">
                                    <MdEmail color="#fff" size={18} />
                                    <p className="font_s14 line_h18 cl_fff">Email: fashionhoues@gmail.com</p>
                                </div>
                                <div className="footer_box_left_content">
                                    <FaPhone color="#fff" size={18} />
                                    <p className="font_s14 line_h18 cl_fff">Điện thoại: 0123456789</p>
                                </div>
                                <div className="footer_box_left_content">
                                    <IoTime color="#fff" size={18} />
                                    <p className="font_s14 line_h18 cl_fff">
                                        Thời gian: Thứ Hai đến Thứ Bảy, 8:00 sáng đến 6:00 chiều
                                    </p>
                                </div>
                                <div className="footer_box_left_content">
                                    <FaLocationDot color="#fff" size={18} />
                                    <p className="font_s14 line_h18 cl_fff">Địa chỉ: Hà Nội</p>
                                </div>
                            </div>
                        </div>
                        <div className="footer_center_left_box">
                            <p className="footer_center_left_boxtitle font_s16 line_h20 font_w500 cl_fff">
                                Thông tin chung
                            </p>
                            <div className="footer_center_left_boxcontent">
                                {['Về chúng tôi', 'Câu hỏi thường gặp', 'Sự kiện', 'Tin tức', 'Tuyển dụng'].map((item, idx) => (
                                    <div className="footer-list-content" key={idx}>
                                        <MdPlayArrow color="#fff" size={24} />
                                        <a href=""
                                            rel="nofollow"
                                            className="font_s14 cl_fff font_w400 line_h18" >
                                            {item}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="footer_center_right">
                        <div className="footer_center_right_box">
                            <p className="footer_center_right_boxtitle font_s16 line_h20 font_w500 cl_fff">
                                Chính sách bán hàng
                            </p>
                            <div className="footer_center_right_boxcontent">
                                {[
                                    'Chính sách thanh toán',
                                    'Chính sách vận chuyển',
                                    'Chính sách bảo mật',
                                    'Chính sách đổi trả'
                                ].map((item, idx) => (
                                    <div className="footer-list-content" key={idx}>
                                        <MdPlayArrow color="#fff" size={24} />
                                        <a
                                            href=""
                                            rel="nofollow"
                                            className="font_s14 cl_fff font_w400 line_h18"
                                        >
                                            {item}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="footer_center_right_box">
                            <p className="footer_center_right_boxtitle font_s16 line_h20 font_w500 cl_fff">
                                Đăng ký nhận thông tin
                            </p>
                            <div className="footer_center_right_boxcontent">
                                <p className="font_s14 cl_fff font_w400 line_h20">
                                    Đăng kí nhận thông tin ưu đãi và xu hướng mới nhất
                                </p>
                                <div className="form_news_letter_email">
                                    <div className="icon_email">
                                        <MdEmail color="#000" size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="news_letter_email"
                                        className="news_letter_input"
                                        id="news_letter_email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                        placeholder="Nhập email của bạn"
                                    />
                                    <div className="container_send_newsletter">
                                        <button type="submit" className="button_send_newsletter">
                                            Đăng ký
                                        </button>
                                    </div>
                                </div>
                                <div className="form_mxh">
                                    <div className="mxh_icon">
                                        <FaFacebookF color="#fff" size={24} />
                                    </div>
                                    <div className="mxh_icon">
                                        <FaInstagram color="#fff" size={24} />
                                    </div>
                                    <div className="mxh_icon">
                                        <SiTiktok color="#fff" size={24} />
                                    </div>
                                    <div className="mxh_icon">
                                        <FaYoutube color="#fff" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom">
                    <p className="font_s14 cl_fff font_w400 line_h18 w100 txt_alct">
                        © Bản quyền thuộc về Fashion Houes
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;