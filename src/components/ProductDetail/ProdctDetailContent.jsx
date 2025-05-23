import './ProdctDetailContent.scss';
import { useState, useEffect } from "react";
// icon
import icon_brand from '../../assets/images/icon/icon_brand.svg';
import icon_linecar from '../../assets/images/icon/icon_linecar.svg';
import icon_calendar from '../../assets/images/icon/icon_calendar.svg';
import icon_fuel from '../../assets/images/icon/icon_fuel.svg';
import icon_piston from '../../assets/images/icon/icon_piston.svg';
import icon_flash from '../../assets/images/icon/icon_flash.svg';

// Lấy dữ liệu từ function
import * as functions from '../../utils/function';

const ProdctDetailContent = ({ product, brand, modelProduct }) => {
    const [changeTab, setChangeTab] = useState(1);
    const [carSpecs, setCarSpecs] = useState([]);
    useEffect(() => {
        console.log(brand);
        console.log(modelProduct);
        console.log(product);
        if (product) {
            setCarSpecs([
                { label: "Hãng xe", value: brand.find(b => b.brand_id == product?.product_brand)?.brand_name },
                { label: "Dòng xe", value: modelProduct.find(m => m.model_id == product?.product_model)?.model_name },
                { label: "Năm sản xuất", value: product?.product_year },
                { label: "Loại nhiên liệu", value: functions.dataFuelType[product?.product_fuel_type] },
                { label: "Hộp số", value: functions.dataTransmission[product?.product_transmission] },
                { label: "Công suất (HP)", value: product?.product_horsepower },
                { label: "Dung tích động cơ", value: functions.dataEngineCapacity[product?.product_engine_capacity] },
                { label: "Mô-men xoắn (Nm)", value: functions.dataTorque[product?.product_torque] },
                { label: "Dẫn động", value: functions.dataDriveType[product?.product_drive_type] },
                { label: "Loại thân xe", value: functions.dataBodyType[product?.product_body_type] },
                { label: "Số chỗ", value: functions.dataSeats[product?.product_seats] },
                { label: "Số cửa", value: functions.dataDoors[product?.product_doors] },
                { label: "Số túi khí", value: functions.dataAirbags[product?.product_airbags] },
                { label: "Tính năng an toàn", value: functions.dataSafetyFeatures[product?.product_safety_features] },
                { label: "Hệ thống giải trí", value: functions.dataInfotainment[product?.product_infotainment] },
                { label: "Hỗ trợ đỗ", value: product?.product_parking_assist == 1 ? "Không" : "Có" },
                { label: "Kiểm soát hành trình", value: product?.product_cruise_control == 1 ? "Không" : "Có" },
                { label: "Tình trạng xe", value: product?.product_newold == 1 ? "Mới" : "Cũ" },
            ]);
        }
    }, [product]);

    const HandleChangeTab = (e) => {
        let thiss = e.target;
        const datatab = thiss.getAttribute("data-tab");
        if (datatab) {
            setChangeTab(datatab)
        }
    }

    // Luồng đánh giá sản phẩm
    const [formData, setFormData] = useState({
        userName: '',
        rating: 0,
        review_title: '',
        review_comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Vui lòng chọn số sao đánh giá');
            return;
        }
        onSubmit(formData);
        setFormData({
            userName: '',
            rating: 0,
            review_title: '',
            review_comment: '',
        });
    };

    return (
        <>
            {product && (
                <div className='detail-product__content detail-product__page'>
                    <ul className="tabs-title">
                        <li className={`tab-link cursor_pt ${changeTab == 1 ? "current" : ""}`} onClick={HandleChangeTab} data-tab="1">
                            Thông tin chi tiết
                        </li>
                        <li className={`tab-link cursor_pt ${changeTab == 2 ? "current" : ""}`} onClick={HandleChangeTab} data-tab="2">
                            Thông số kĩ thuật
                        </li>
                        <li className={`tab-link cursor_pt ${changeTab == 3 ? "current" : ""}`} onClick={HandleChangeTab} data-tab="3">
                            Đánh giá sản phẩm
                        </li>
                    </ul>
                    {
                        changeTab && changeTab == 1 && (
                            <div className="detail-product__content__tab tab-1">
                                <div className="product_getcontent">
                                    <div className="product-getcontent__showcontent">
                                        <h2 className='title'>Thông tin chi tiết</h2>
                                        <div className='show-detail__product'>
                                            <div className="item-detail_product">
                                                <img src={icon_brand} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{brand.find(b => b.brand_id == product?.product_brand)?.brand_name}</p>
                                            </div>
                                            <div className="item-detail_product">
                                                <img src={icon_linecar} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{modelProduct.find(m => m.model_id == product?.product_model)?.model_name}</p>
                                            </div>
                                            <div className="item-detail_product">
                                                <img src={icon_calendar} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{product?.product_year}</p>
                                            </div>
                                            <div className="item-detail_product">
                                                <img src={icon_fuel} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{functions.dataFuelType[product?.product_fuel_type]}</p>
                                            </div>
                                            <div className="item-detail_product">
                                                <img src={icon_piston} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{functions.dataTransmission[product?.product_transmission]}</p>
                                            </div>
                                            <div className="item-detail_product">
                                                <img src={icon_flash} width={24} height={24} alt="icon" />
                                                <p className='text-detail_product'>{product?.product_horsepower} HP</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-getcontent__showcontent">
                                        <h2 className='title'>Mô tả</h2>
                                        <div
                                            className="show-detail__content"
                                            dangerouslySetInnerHTML={{ __html: functions.nl2br(product?.product_description) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        changeTab && changeTab == 2 && (
                            <div className="detail-product__content__tab tab-2">
                                <div className="product_getcontent">
                                    <div className="product-getcontent__showcontent car-specs">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Chi tiết</th>
                                                    <th>Giá trị</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carSpecs.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.label}</td>
                                                        <td>{item.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        changeTab && changeTab == 3 && (
                            <div className="detail-product__content__tab tab-3">
                                <div className="product_getcontent">
                                    <div className="product-getcontent__showcontent">
                                        <form className="review-form" onSubmit={handleSubmitReview}>
                                            <h3>Viết đánh giá của bạn</h3>

                                            <div className="form-group">
                                                <label>Đánh giá của bạn</label>
                                                <div className="rating-input">
                                                    {[...Array(5)].map((item, i) => (
                                                        <span key={i} className={`star ${i < formData.rating ? 'filled' : ''}`} onClick={() => handleRatingChange(i + 1)} >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label>Tiêu đề</label>
                                                <input type="text" name="review_title" value={formData.review_title} onChange={handleChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Nội dung đánh giá</label>
                                                <textarea name="review_comment" value={formData.review_comment} onChange={handleChange} required />
                                            </div>

                                            <button type="submit" className="btn-submit">Gửi đánh giá</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}
export default ProdctDetailContent;