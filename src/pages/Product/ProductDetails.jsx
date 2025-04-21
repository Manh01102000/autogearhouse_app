// Import các thư viện & module
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDetailProducts } from '../../redux/features/products/productSlice';
import { Link, useParams } from 'react-router-dom';
import { extractSlugAndId, productLink } from '../../utils/function';
// ==============Import components==============
// SEO
import MetaCard from '../../components/SEO/MetaCard';
import BreadCrumb from '../../components/SEO/BreadCrumb';
// Header
import Header from "../../components/Header/Header";
// Banner
import HeroSection from "../../components/home/HeroSection";
// Header
import Footer from "../../components/Footer";
// PRODUCT
import ProdctDetailTop from '../../components/ProductDetail/ProdctDetailTop';
import ProdctDetailContent from '../../components/ProductDetail/ProdctDetailContent';
import ProdctDetailFooter from '../../components/ProductDetail/ProdctDetailFooter';

function ProductDetails() {
    {/* ID sản phẩm từ params */ }
    const { slugId } = useParams();
    const { slug, id } = extractSlugAndId(slugId);
    {/* Dữ liệu sản phẩm */ }
    const [dataProduct, setDataProduct] = useState([]);
    const [dataProductSuggest, setDataProductSuggest] = useState([]);
    const dispatch = useDispatch();
    const { detailProducts, loadingDetail, errorDetail } = useSelector((state) => state.products);
    const { category, loading, error } = useSelector((state) => state.category);
    const { brand, modelProduct } = useSelector((state) => state.initAppData);
    useEffect(() => {
        if (id) {
            dispatch(fetchDetailProducts(id));
        }
    }, [dispatch]);
    useEffect(() => {
        if (detailProducts) {
            setDataProduct(detailProducts.product);
            setDataProductSuggest(detailProducts.productSuggest || []);
        }
    }, [detailProducts]);
    {/* SEO */ }
    const domain = import.meta.env.VITE_DOMAIN_WEB;
    const [metaCard, setMetaCard] = useState({
        title: '',
        description: '',
        canonical: '',
        keywords: '',
        image: '',
        index: 'noindex,nofollow',
    });
    useEffect(() => {
        if (dataProduct && dataProduct.product_name) {
            const maxLength = 30;
            const productName = dataProduct.product_name.length > maxLength ? dataProduct.product_name.substring(0, maxLength) + "..." : dataProduct.product_name;
            setMetaCard({
                title: dataProduct.seo_title || `Chi Tiết Sản Phẩm - ${productName} | Auto Gear House`,
                description: dataProduct.seo_description || `Khám phá chi tiết về ${productName} tại Auto Gear House. Cung cấp thông tin đầy đủ về thông số kỹ thuật, giá cả, và các tính năng nổi bật của {Tên Sản Phẩm}. Mua xe với giá tốt, giao hàng nhanh chóng.`,
                canonical: domain + productLink(dataProduct.product_alias, dataProduct.product_id, productName),
                keywords: dataProduct.tags?.join(', ') || `xe ô tô, mua xe, xe mới, Auto Gear House`,
                image: dataProduct.image,
                index: 'index,follow',
            });
        }
    }, [dataProduct]);

    {/* breadCrumb */ }
    const [CategoryNamesParent, setCategoryNamesParent] = useState("");
    const [CategoryLinksParent, setCategoryLinksParent] = useState("");
    const [CategoryNamesChild, setCategoryNamesChild] = useState("");
    const [CategoryLinksChild, setCategoryLinksChild] = useState("");
    useEffect(() => {
        if (category && dataProduct?.category && dataProduct?.category_code) {
            const parentCategory = category.find(cat => cat.cat_id === dataProduct.category);
            const childCategory = parentCategory?.children?.find(child => child.cat_id === dataProduct.category_code);

            if (parentCategory) {
                setCategoryNamesParent(parentCategory.cat_name);
                setCategoryLinksParent(parentCategory.cat_alias);
            }

            if (childCategory) {
                setCategoryNamesChild(childCategory.cat_name);
                setCategoryLinksChild(childCategory.cat_alias);
            }
        }
    }, [category, dataProduct]);
    const [breadCrumb, setBreadCrumb] = [
        [

            { title: "Trang chủ", url: "/", class: "otherssite" },
            {
                title: CategoryNamesParent,
                url: `/${CategoryLinksParent}`,
                class: "otherssite",
            },
            {
                title: CategoryNamesChild,
                url: `/${CategoryLinksParent}/${CategoryLinksChild}`,
                class: "otherssite",
            },
            {
                title: dataProduct?.product_name,
                url: "",
                class: "thissite",
            },

        ]
    ];
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
            {/* Content */}
            <div className="container-page">
                <div className="page-detail">
                    <BreadCrumb items={breadCrumb} />
                    <section className='detail-product'>
                        <ProdctDetailTop product={dataProduct} brand={brand} />
                        <ProdctDetailContent product={dataProduct} brand={brand} modelProduct={modelProduct} />
                        <ProdctDetailFooter productSuggest={dataProductSuggest} />
                    </section>

                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default ProductDetails;
