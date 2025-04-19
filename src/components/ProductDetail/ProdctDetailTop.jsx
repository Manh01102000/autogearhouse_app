
import { FaSquarePhone } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import truckfast from '../../assets/images/icon/truck-fast.svg';
import loadgif from '../../assets/images/home/load.gif';
// Lấy dữ liệu từ function
import * as functions from '../../utils/function';
// CSS
import './ProdctDetailTop.scss';
import { useEffect, useState } from "react";
const ProdctDetailTop = ({ product, brand }) => {
    const [stock, setStock] = useState(1);
    const [quantity, setQuantity] = useState(1);
    // Lấy dữ liệu ảnh và cho state quản lý
    const [productImg, setProductImg] = useState([]);
    const [productVariant, setVariant] = useState([]);
    useEffect(() => {
        setProductImg(product?.product_images_full
            ? product.product_images_full.split(',')
            : []);

        // Xử lý variant
        if (product?.product_variants?.length > 0) {
            setVariant(product?.product_variants[0]);
            setStock(product?.product_variants[0].product_stock);
        }

    }, [product]);

    const ChangeVariant = (variant) => {
        setVariant(variant);
        setStock(variant.product_stock);
        setQuantity(1);
    }

    // 
    const handleIncreaseCountProduct = () => {
        setQuantity(prev => {
            const newCount = prev + 1;
            return stock && newCount > stock ? stock : newCount;
        });
    };

    const handleDecreaseCountProduct = () => {
        setQuantity(prev => {
            const newCount = prev - 1;
            return newCount < 1 ? 1 : newCount;
        });
    };

    const handleChangeCountProduct = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) {
            if (val > stock) setQuantity(stock);
            else if (val < 1) setQuantity(1);
            else setQuantity(val);
        } else {
            setQuantity(1); // reset nếu người dùng nhập không hợp lệ
        }
    };


    return (
        <>
            {product && (
                <div className='detail-product__top detail-product__page'>
                    <div className="product-top__image">
                        <div className="top-image__left">
                            <div className="top-image__box">
                                {
                                    productImg.slice(1, 4).map((item, index) => {
                                        return (
                                            <img key={index} className="top-image__small"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = loadgif;
                                                }}
                                                src={item} alt="anh" />
                                        )
                                    })
                                }
                                {
                                    productImg && productImg.length > 4 && (
                                        <p className="image-small__count">+{Number(productImg.length) - 4}</p>
                                    )
                                }

                            </div>
                        </div>
                        <div className="top-image__right">
                            <img className="top-image__big lazyload"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = { loadgif };
                                }}
                                src={productImg[0]}
                                alt="anh"
                            />
                        </div>
                    </div>
                    <div className="product-top__infor">
                        <h1 className='top-infor__name'>{product.product_name || "Chưa có dữ liệu"}</h1>
                        <div className="top-infor-brand__status">
                            <p className="text-infor__brand">
                                Thương hiệu: <span>{brand.find(b => b.brand_id == product.product_brand)?.brand_name || "Không xác định"}</span>
                            </p>
                            <p className="text-infor__status">
                                Tình trạng: <span>
                                    {productVariant?.length > 0
                                        ? (productVariant.product_stock > 0 ? "Còn hàng" : "Hết hàng")
                                        : "Đang cập nhật"}
                                </span>
                            </p>
                        </div>
                        <div className="top-infor-price">
                            <p className="text-infor__price-discount">
                                {functions.number_format(productVariant.product_price || 0, 0, ',', '.')} đ
                            </p>
                            <p className="text-infor__price-origin active_price-origin">
                                400.000.000đ
                            </p>
                        </div>
                        <div className="prod-card_common prod-card_color d_flex fl_cl w100 gap_5">
                            <p className="prod-card_text font_s14 font_w500 line_h20 cl_000">Màu sắc</p>
                            <div className="prod-card_option d_flex al_ct gap_10 w100">
                                {product?.product_variants?.length > 0 ? (
                                    product.product_variants.map((item, index) => (
                                        <span className={`item-card_option change-option_color ${item.variant_id == productVariant.variant_id ? 'active_o' : ''}`}
                                            key={index} onClick={() => ChangeVariant(item)} data-color={item.product_color}>
                                            {item.product_color}
                                        </span>
                                    ))
                                ) : (
                                    <p>Không có biến thể nào.</p>
                                )}
                            </div>
                        </div>
                        <div className="prod-card_common prod-card_amount_buy d_flex al_ct w100 gap_15" data-stock="10">
                            <p className="prod-card_text font_s14 font_w500 line_h20 cl_000">Số lượng</p>
                            <div className="prod-card_option d_flex al_ct gap_15">
                                <button type="button" className="minus-product minus_plus_gnr d_flex cursor_pt" checkdiscount="0" data="0" onClick={handleDecreaseCountProduct}>-</button>
                                <input type="text" name="product-card_count" value={quantity}
                                    className="product-card_count font_s15 line_h20 font_w400 cl_000"
                                    onChange={handleChangeCountProduct} />
                                <button type="button" className="plus-product minus_plus_gnr d_flex cursor_pt" checkdiscount="0" data="0" onClick={handleIncreaseCountProduct}>+</button>
                            </div>
                            <span className="product-card_stock font_s14 line_h16 font_w400 cl_000">{stock} sản phẩm sẵn có</span>
                        </div>
                        <div className="prod-card_common prod-card_ship d_flex al_ct w100 gap_10">
                            <p className="prod-card_text font_s14 font_w500 line_h16 cl_000">Vận chuyển</p>
                            <div className="prod-card_shipping d_flex al_ct gap_10">
                                <img src={truckfast} width="18" height="18" alt="icon" />
                                <p className="fee_ship font_s14 mt_5 line_h16 font_w400 cl_000" data-feeship={product?.product_feeship || 0} >
                                    {
                                        product?.product_ship == 1
                                            ? "Miễn phí vận chuyển"
                                            : `${functions.number_format(product?.product_feeship || 0, 0, ',', '.')}đ`
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="top-infor__button">
                            <button className="button-contact">
                                <FaSquarePhone fontSize={18} /> Liên hệ HotLine
                            </button>
                            <button className="button-chat">
                                <IoChatboxOutline fontSize={18} /> Liên hệ qua chat
                            </button>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}
export default ProdctDetailTop;