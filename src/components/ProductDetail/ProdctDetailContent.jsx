import './ProdctDetailContent.scss';
import { useState } from "react";
// icon
import icon_brand from '../../assets/images/icon/icon_brand.svg';
import icon_linecar from '../../assets/images/icon/icon_linecar.svg';
import icon_calendar from '../../assets/images/icon/icon_calendar.svg';
import icon_fuel from '../../assets/images/icon/icon_fuel.svg';
import icon_piston from '../../assets/images/icon/icon_piston.svg';
import icon_flash from '../../assets/images/icon/icon_flash.svg';

const ProdctDetailContent = () => {
    const [changeTab, setChangeTab] = useState(1);
    const HandleChangeTab = (e) => {
        let thiss = e.target;
        const datatab = thiss.getAttribute("data-tab");
        if (datatab) {
            setChangeTab(datatab)
        }
    }
    const carSpecs = [
        { label: "Hãng xe", value: "4425x1730x1475" },
        { label: "Dòng xe", value: "1895x1420x1205" },
        { label: "Năm sản xuất", value: "2550" },
        { label: "Loại nhiên liệu", value: "1475/1460" },
        { label: "Hộp số", value: "133" },
        { label: "Công suất", value: "N/A" },
        { label: "Dung tích động cơ", value: "5.1" },
        { label: "Dẫn động", value: "1075" },
        { label: "Loại thân xe", value: "1075" },
        { label: "Số chỗ", value: "1075" },
        { label: "Số cửa", value: "1075" },
        { label: "Số túi khí", value: "1075" },
        { label: "Tính năng an toàn", value: "1075" },
        { label: "Hệ thống giải trí", value: "1075" },
        { label: "Hỗ trợ đỗ", value: "1075" },
        { label: "Kiểm soát hành trình", value: "1075" },
        { label: "Tình trạng xe", value: "1075" },
    ];
    return (
        <>
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
                                            <p className='text-detail_product'>Hãng</p>
                                        </div>
                                        <div className="item-detail_product">
                                            <img src={icon_linecar} width={24} height={24} alt="icon" />
                                            <p className='text-detail_product'>Dòng</p>
                                        </div>
                                        <div className="item-detail_product">
                                            <img src={icon_calendar} width={24} height={24} alt="icon" />
                                            <p className='text-detail_product'>Năm sản xuất</p>
                                        </div>
                                        <div className="item-detail_product">
                                            <img src={icon_fuel} width={24} height={24} alt="icon" />
                                            <p className='text-detail_product'>Nhiên liệu</p>
                                        </div>
                                        <div className="item-detail_product">
                                            <img src={icon_piston} width={24} height={24} alt="icon" />
                                            <p className='text-detail_product'>Hộp số</p>
                                        </div>
                                        <div className="item-detail_product">
                                            <img src={icon_flash} width={24} height={24} alt="icon" />
                                            <p className='text-detail_product'>Công suất</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-getcontent__showcontent">
                                    <h2 className='title'>Mô tả</h2>
                                    <div className='show-detail__content'>
                                        - Chiều dài cáp từ 15 đến 30m
                                        - Tời có sẵn điều khiển từ xa và điều khiển dây
                                        - Ngoài ra chúng tôi có loại tời chỉ có điều khiển dây
                                        Thông số của tời điện ắc quy 12V loại 2000lbs
                                        - Dùng để kéo ngang khoảng 900kg, và nâng hạ thẳng đứng khoảng 150kg
                                        - Cáp dài 15m
                                        - Động cơ: 0.7 kw
                                        - Tời có sẵn chân đế, dẫn hướng cáp, móc tời, điều khiển từ xa và điều khiển có dây
                                        - Tự trọng tời nặng khoảng 7kg
                                        Ngoài loại điện 12v, chúng tôi còn có loại điện 24v
                                        Quý khách hàng cần tư vấn hoặc đặt mua hàng vui lòng liên hệ: 0917 5566 83 (ms Hương, Điện Thoại hoặc Zalo)
                                        - Chiều dài cáp từ 15 đến 30m
                                        - Tời có sẵn điều khiển từ xa và điều khiển dây
                                        - Ngoài ra chúng tôi có loại tời chỉ có điều khiển dây
                                        Thông số của tời điện ắc quy 12V loại 2000lbs
                                        - Dùng để kéo ngang khoảng 900kg, và nâng hạ thẳng đứng khoảng 150kg
                                        - Cáp dài 15m
                                        - Động cơ: 0.7 kw
                                        - Tời có sẵn chân đế, dẫn hướng cáp, móc tời, điều khiển từ xa và điều khiển có dây
                                        - Tự trọng tời nặng khoảng 7kg
                                        Ngoài loại điện 12v, chúng tôi còn có loại điện 24v
                                        Quý khách hàng cần tư vấn hoặc đặt mua hàng vui lòng liên hệ: 0917 5566 83 (ms Hương, Điện Thoại hoặc Zalo)
                                    </div>
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
                                    - Chiều dài cáp từ 15 đến 30m
                                    - Tời có sẵn điều khiển từ xa và điều khiển dây
                                    - Ngoài ra chúng tôi có loại tời chỉ có điều khiển dây
                                    Thông số của tời điện ắc quy 12V loại 2000lbs
                                    - Dùng để kéo ngang khoảng 900kg, và nâng hạ thẳng đứng khoảng 150kg
                                    - Cáp dài 15m
                                    - Động cơ: 0.7 kw
                                    - Tời có sẵn chân đế, dẫn hướng cáp, móc tời, điều khiển từ xa và điều khiển có dây
                                    - Tự trọng tời nặng khoảng 7kg
                                    Ngoài loại điện 12v, chúng tôi còn có loại điện 24v
                                    Quý khách hàng cần tư vấn hoặc đặt mua hàng vui lòng liên hệ: 0917 5566 83 (ms Hương, Điện Thoại hoặc Zalo)
                                    - Chiều dài cáp từ 15 đến 30m
                                    - Tời có sẵn điều khiển từ xa và điều khiển dây
                                    - Ngoài ra chúng tôi có loại tời chỉ có điều khiển dây
                                    Thông số của tời điện ắc quy 12V loại 2000lbs
                                    - Dùng để kéo ngang khoảng 900kg, và nâng hạ thẳng đứng khoảng 150kg
                                    - Cáp dài 15m
                                    - Động cơ: 0.7 kw
                                    - Tời có sẵn chân đế, dẫn hướng cáp, móc tời, điều khiển từ xa và điều khiển có dây
                                    - Tự trọng tời nặng khoảng 7kg
                                    Ngoài loại điện 12v, chúng tôi còn có loại điện 24v
                                    Quý khách hàng cần tư vấn hoặc đặt mua hàng vui lòng liên hệ: 0917 5566 83 (ms Hương, Điện Thoại hoặc Zalo)
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default ProdctDetailContent;