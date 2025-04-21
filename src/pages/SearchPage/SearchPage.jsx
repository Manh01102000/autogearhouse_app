// Import các thư viện & module
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSearchProducts } from '../../redux/features/products/productSlice';
// ==============Import components==============
// Header
import Header from "../../components/Header/Header";
// SEO
import MetaCard from '../../components/SEO/MetaCard';
import BreadCrumb from '../../components/SEO/BreadCrumb';
// Banner
import HeroSection from "../../components/home/HeroSection";
// Header
import Footer from "../../components/Footer";
// Product
import ProductSection from "../../components/home/ProductSection";
// SCSS
import './SearchPage.scss';
import * as functions from '../../utils/function';
// 
import banner_search from '../../assets/images/bgr/banner_search.png';

const SearchPage = () => {
    const { slugCate, slugSubCate } = useParams();
    // 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    // Lấy dữ liệu danh mục sản phẩm
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.category);
    const { searchCateProducts, loadingSearch, errorSearch } = useSelector((state) => state.products);
    const newProducts = searchCateProducts || [];
    // SEO
    const [metaCard, metaCardShow] = useState(
        {
            'title': 'AutoGearHouse - Cửa hàng linh kiện xe hơi chất lượng',
            'description': 'AutoGearHouse cung cấp linh kiện, xe hơi chất lượng cao, giá tốt, bảo hành uy tín. Giao hàng toàn quốc.',
            'canonical': 'https://autogearhouse.com/',
            'keywords': 'AutoGearHouse, linh kiện xe hơi, phụ kiện ô tô, đồ chơi xe hơi, bảo trì xe hơi',
            'image': 'https://autogearhouse.com/images/banner.jpg',
            'index': 'index, follow',
        }
    );
    // breadCrumb
    const [breadCrumb, setBreadCrumb] = useState([
        { title: "Trang chủ", url: "/", class: "otherssite" },
    ]);

    useEffect(() => {
        if (!category || category.length === 0) return;

        const cateObj = category.find(item => item.cat_alias == slugCate);
        const subCateObj = cateObj?.children?.find(item => item.cat_alias == slugSubCate);

        if (slugCate && !slugSubCate && cateObj) {
            setBreadCrumb([
                { title: "Trang chủ", url: "/", class: "otherssite" },
                { title: cateObj.cat_name, url: "", class: "thissite" },
            ]);
        } else if (slugCate && slugSubCate && cateObj && subCateObj) {
            setBreadCrumb([
                { title: "Trang chủ", url: "/", class: "otherssite" },
                { title: cateObj.cat_name, url: `/${slugCate}`, class: "otherssite" },
                { title: subCateObj.cat_name, url: "", class: "thissite" },
            ]);
        }
        // console.log(cateObj);
        const categoryID = cateObj?.cat_id;
        const categoryCodeID = subCateObj?.cat_id;
        // console.log(categoryID);
        // console.log(categoryCodeID);
        if (categoryID || categoryCodeID) {
            dispatch(fetchSearchProducts({ page, pageSize, categoryID, categoryCodeID }));
        }
    }, [category, slugCate, slugSubCate]);

    console.log(newProducts);

    return (
        <>
            <MetaCard title={metaCard.title}
                description={metaCard.description}
                keywords={metaCard.keywords}
                canonical={metaCard.canonical}
                index={metaCard.index} />
            {/* Header */}
            <Header />
            {/* Banner chính */}
            <HeroSection />
            {/* Danh sách tìm kiếm */}
            <section id="searchMain">
                <div className="search-page">
                    <div className="main-h1">
                        <h1 className="meta_h1">Danh sách sản phẩm hôm nay - {functions.Ejsdate('d/m/Y', functions.Ejstime())}</h1>
                    </div>
                    <BreadCrumb items={breadCrumb} />
                    <div className="search-page__content">
                        <div className="search-page__content__left">
                            {/* Danh sách sản phẩm */}
                            {
                                newProducts && (
                                    <ProductSection dataH2={''} loading={loadingSearch} dataProducts={newProducts} />
                                )
                            }
                        </div>
                        <div className="search-page__content__rigth">
                            <img src={banner_search} alt="Banner" />
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default SearchPage;