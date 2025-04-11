// components/home/BannerSection.jsx
import React from 'react';
// icon
import banner_sample from '../../assets/images/home/banner_sample.webp';
// css
import './BannerSection.scss';

const BannerSection = () => {
    return (
        <section className="product-section">
            <div className='banner-container'>
                <img src={banner_sample} className='banner-image' alt="banner" />
            </div>
        </section>
    );
};

export default BannerSection;
