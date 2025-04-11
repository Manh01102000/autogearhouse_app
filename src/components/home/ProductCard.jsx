import React from 'react';
import './ProductCard.scss';
import { FaCalendarAlt, FaUsers, FaCogs } from 'react-icons/fa';
import * as functions from '../../utils/function';
// icon
import loadgif from '../../assets/images/home/load.gif';
// 

const ProductCard = ({ product }) => {
    let product_images_full = product.product_images_full.split(',');
    return (
        <div className="product-card">
            <img className="product-image lazyload"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = { loadgif };
                }}
                src={product_images_full[0] || ''}
                alt={product.product_name} />
            {product_images_full.length > 0 &&
                <img className="product-image-hide lazyload"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = { loadgif };
                    }}
                    src={product_images_full[1] || ''}
                    alt={product.product_name} />
            }
            <div className="product-info">
                <h3 className="product-name">{product.product_name}</h3>
                <div className="product-price">
                    {functions.number_format(product.product_variants[0].product_price, 0, '.', ',')} đ
                </div>

                <div className="product-meta">
                    <div className="meta-item">
                        <FaCalendarAlt /> {product.product_year}
                    </div>
                    <div className="meta-item">
                        <FaUsers /> {product.product_seats} chỗ
                    </div>
                    <div className="meta-item">
                        <FaCogs /> {functions.dataTransmission[product.product_transmission]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
