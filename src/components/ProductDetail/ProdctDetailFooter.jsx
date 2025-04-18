
import { useState } from "react";
import './ProdctDetailFooter.scss';
import { Link } from "react-router-dom";
// anh
import anhtest1 from '../../assets/images/sample/anhtest1.jpg';
import anhtest2 from '../../assets/images/sample/anhtest2.jpg';
import anhtest3 from '../../assets/images/sample/anhtest3.jpg';
import anhtest4 from '../../assets/images/sample/anhtest4.jpg';
import truckfast from '../../assets/images/icon/truck-fast.svg';
// function
import * as functions from '../../utils/function';
// icon
import favorite_product from '../../assets/images/icon/favorite_product.svg';
const ProdctDetailFooter = () => {
    const similarProducts = [
        {
            product_id: 1,
            product_name: "Ghế văn phòng cao cấp",
            product_alias: "ghe-van-phong-cao-cap",
            avatar: anhtest1,
            stock: 12,
            price: 1200000,
            discount: 990000,
        },
        {
            product_id: 2,
            product_name: "Bàn làm việc chân sắt",
            product_alias: "ban-lam-viec-chan-sat",
            avatar: anhtest2,
            stock: 5,
            price: 1500000,
            discount: 0,
        },
        {
            product_id: 3,
            product_name: "Tủ đựng hồ sơ 3 ngăn",
            product_alias: "tu-dung-ho-so-3-ngan",
            avatar: anhtest3,
            stock: 8,
            price: 890000,
            discount: 790000,
        },
        {
            product_id: 4,
            product_name: "Tủ đựng hồ sơ 4 ngăn",
            product_alias: "tu-dung-ho-so-4-ngan",
            avatar: anhtest4,
            stock: 8,
            price: 890000,
            discount: 790000,
        },
    ];

    const FavoriteProduct = (id) => {
        console.log("Favorite clicked! Product ID:", id);
        // Xử lý logic lưu yêu thích ở đây
    };
    return (
        <>
            <div className='detail-product__footer detail-product__page'>
                <div className="prod-detail-bottom">
                    <h2 className="title">Sản phẩm tương tự</h2>
                    <div className="product-suggest-list">
                        {similarProducts.map((product) => (
                            <div className="product-suggest-item" key={product.product_id}>
                                <div className="product-suggest-item-avatar">
                                    <img className="product-suggest-item-img" src={product.avatar} alt={product.product_name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/images/icon/load.gif";
                                        }} />
                                    <img src={favorite_product} className="icon-favorite cursor_pt" width="20" height="20" alt="icon" onClick={() => FavoriteProduct(product.product_id)} />
                                </div>
                                <div className="product-suggest-item-desc">
                                    <Link to={functions.productLink(product.product_id, product.product_alias, product.product_name)} rel="nofollow" >
                                        <h3 className="product-suggest-desc-name">
                                            {product.product_name}
                                        </h3>
                                    </Link>
                                    <p className="product-suggest-desc-text">
                                        Số lượng kho: {product.stock}
                                    </p>
                                    <div className="product-price">
                                        {product.discount !== 0 && (
                                            <p className="product-price-discount">{product.discount.toLocaleString()} đ</p>
                                        )}
                                        <p className={`product-price-original ${product.discount !== 0 ? "active_price" : ""}`} >
                                            {product.price.toLocaleString()} đ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProdctDetailFooter;