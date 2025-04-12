import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.scss';
import {
  FaChevronLeft, FaChevronRight, FaTruckMoving,
  FaCreditCard, FaCrown, FaTools
} from 'react-icons/fa';
const HeroSection = () => {
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/src/assets/images/home/banner-car-1.jpg',
    '/src/assets/images/home/banner-car-2.jpg',
  ];

  const contentItems = [
    {
      icon: <FaTruckMoving size={30} color="#fff" />,
      title: 'Giao xe tận nơi',
      text: 'Hỗ trợ giao xe tận nhà trên toàn quốc'
    },
    {
      icon: <FaCreditCard size={30} color="#fff" />,
      title: 'Thanh toán linh hoạt',
      text: 'Trả góp 0% lãi suất, nhiều phương thức thanh toán'
    },
    {
      icon: <FaCrown size={30} color="#fff" />,
      title: 'Khách hàng thân thiết',
      text: 'Ưu đãi đặc biệt cho khách hàng lâu năm'
    },
    {
      icon: <FaTools size={30} color="#fff" />,
      title: 'Bảo hành chính hãng',
      text: 'Hỗ trợ bảo hành tại các đại lý toàn quốc'
    },
  ];


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="banner al_ct jc_ct">
      <div className="banner_top">
        <div className="container_banner_top m_slider">
          <div className="banner_top_img m_slides" ref={slideRef} style={{ display: 'flex', transition: '0.5s ease' }}>
            {images.map((src, index) => (
              <img key={index} src={src} alt="banner" className="image_banner" />
            ))}
          </div>
          <button className="prev" onClick={prevSlide}><FaChevronLeft size={24} /></button>
          <button className="next" onClick={nextSlide}><FaChevronRight size={24} /></button>
        </div>
      </div>
      <div className="banner_content">
        <div className="container_banner_content d_flex al_ct jc_sb">
          {contentItems.map((item, idx) => (
            <div key={idx} className="item_banner_content d_flex al_ct jc_ct">
              <div className="item_banner_content_icon">
                {item.icon}
              </div>
              <p className="item_banner_content_title font_s16 line_h20 cl_fff font_w500">{item.title}</p>
              <p className="item_banner_content_text font_s14 line_h18 cl_fff">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
