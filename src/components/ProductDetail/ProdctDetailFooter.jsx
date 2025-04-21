
import { useState } from "react";
import './ProdctDetailFooter.scss';
import { Link } from "react-router-dom";

// function
import * as functions from '../../utils/function';
// icon
import favorite_product from '../../assets/images/icon/favorite_product.svg';
import { FaCalendarAlt, FaUsers, FaCogs } from 'react-icons/fa';
const ProdctDetailFooter = ({ productSuggest }) => {
    return (
        <>
            <div className='detail-product__footer detail-product__page'>
                <div className="prod-detail-bottom">
                    <h2 className="title">Sản phẩm tương tự</h2>
                    <div className="product-suggest-list">
                        {productSuggest && productSuggest.length > 0 ? (
                            productSuggest.map((item, index) => {
                                let product_images_full = item.product_images_full
                                    ? item.product_images_full.split(',')
                                    : [];

                                return (
                                    <div className="product-card" key={index}>
                                        <img
                                            className="product-image lazyload"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = loadgif;
                                            }}
                                            src={product_images_full[0] || loadgif}
                                            alt={item.product_name}
                                        />
                                        {product_images_full.length > 1 && (
                                            <img
                                                className="product-image-hide lazyload"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = loadgif;
                                                }}
                                                src={product_images_full[1] || loadgif}
                                                alt={item.product_name}
                                            />
                                        )}
                                        <div className="product-info">
                                            <Link to={productLink(item.product_alias, item.product_id, item.product_name)}>
                                                <h3 className="product-name">{item.product_name}</h3>
                                            </Link>
                                            <div className="product-price">
                                                {functions.number_format(item.product_variants[0].product_price, 0, '.', ',')} đ
                                            </div>
                                            <div className="product-meta">
                                                <div className="meta-item">
                                                    <FaCalendarAlt /> {item.product_year}
                                                </div>
                                                <div className="meta-item">
                                                    <FaUsers /> {item.product_seats} chỗ
                                                </div>
                                                <div className="meta-item">
                                                    <FaCogs /> {functions.dataTransmission[item.product_transmission]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Không có sản phẩm gợi ý nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProdctDetailFooter;