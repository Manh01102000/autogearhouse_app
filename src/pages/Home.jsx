// Import các thư viện & module
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNewProducts, fetchFeaturedProducts } from '../redux/features/products/productSlice';
// Import Helmet phục vụ SEO
import { Helmet } from "react-helmet-async";
// ==============Import components==============
// Header
import Header from "../components/Header";
// Banner
import HeroSection from "../components/home/HeroSection";
// Product
import ProductSection from "../components/home/ProductSection";
// News
import NewsSection from "../components/home/NewsSection";
// Banner
import BannerSection from "../components/home/BannerSection";
// Header
import Footer from "../components/Footer";

const Home = () => {
    const dispatch = useDispatch();
    const { newProducts, featuredProducts, loadingFeatured, loadingNew } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchNewProducts({ page: 1, pageSize: 10 }));
        dispatch(fetchFeaturedProducts({ page: 1, pageSize: 10 }));
    }, [dispatch]);

    // Giả lập dữ liệu bài viết, bạn có thể thay thế bằng dữ liệu thật từ API
    const newsList = [
        {
            id: 1,
            title: 'Mẫu ảnh áo dài Việt Nam',
            author: 'Mạnh',
            date: '16/02/2025',
            desc: 'Top những bộ Áo Dài Chụp Ảnh Đẹp Nhất của Áo Dài Nhân dành riêng cho những ai yêu thích lưu giữ những khoảnh khắc đẹp. Mỗi mẫu áo dài trong bộ sưu tập này được chọn lựa kỹ lưỡng với chất liệu vải cao cấp và họa tiết tinh tế, mang lại vẻ đẹp thanh thoát và sang trọng, giúp bạn tỏa sáng trong từng khung hình.',
            image: '/src/assets/images/sample/samp_product.webp',
        },
        {
            id: 2,
            title: 'Mẫu ảnh áo dài Việt Nam',
            author: 'Mạnh',
            date: '16/02/2025',
            desc: 'Top những bộ Áo Dài Chụp Ảnh Đẹp Nhất của Áo Dài Nhân dành riêng cho những ai yêu thích lưu giữ những khoảnh khắc đẹp. Mỗi mẫu áo dài trong bộ sưu tập này được chọn lựa kỹ lưỡng với chất liệu vải cao cấp và họa tiết tinh tế, mang lại vẻ đẹp thanh thoát và sang trọng, giúp bạn tỏa sáng trong từng khung hình.',
            image: '/src/assets/images/sample/samp_product.webp',
        },
        {
            id: 3,
            title: 'Mẫu ảnh áo dài Việt Nam',
            author: 'Mạnh',
            date: '16/02/2025',
            desc: 'Top những bộ Áo Dài Chụp Ảnh Đẹp Nhất của Áo Dài Nhân dành riêng cho những ai yêu thích lưu giữ những khoảnh khắc đẹp. Mỗi mẫu áo dài trong bộ sưu tập này được chọn lựa kỹ lưỡng với chất liệu vải cao cấp và họa tiết tinh tế, mang lại vẻ đẹp thanh thoát và sang trọng, giúp bạn tỏa sáng trong từng khung hình.',
            image: '/src/assets/images/sample/samp_product.webp',
        },
    ];
    return (
        <div>
            <Helmet>
                {/* ✅ Tiêu đề & mô tả SEO */}
                <title>AutoGearHouse - Cửa hàng linh kiện xe hơi chất lượng</title>
                <meta name="description" content="AutoGearHouse cung cấp linh kiện xe hơi chất lượng cao, giá tốt, bảo hành uy tín. Giao hàng toàn quốc." />
                <meta name="keywords" content="AutoGearHouse, linh kiện xe hơi, phụ kiện ô tô, đồ chơi xe hơi, bảo trì xe hơi" />
                <meta name="author" content="AutoGearHouse" />
                <meta name="robots" content="index, follow" />

                {/* ✅ Open Graph (Facebook, Zalo, LinkedIn) */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://autogearhouse.com/" />
                <meta property="og:title" content="AutoGearHouse - Cửa hàng linh kiện xe hơi chất lượng" />
                <meta property="og:description" content="Chuyên cung cấp linh kiện xe hơi chất lượng cao, giá cả hợp lý, bảo hành tốt nhất." />
                <meta property="og:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta property="og:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
                <meta property="og:site_name" content="AutoGearHouse" />
                <meta property="og:locale" content="vi_VN" />

                {/* ✅ Twitter Card (Twitter) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://autogearhouse.com/" />
                <meta name="twitter:title" content="AutoGearHouse - Cửa hàng linh kiện xe hơi chất lượng" />
                <meta name="twitter:description" content="AutoGearHouse chuyên cung cấp linh kiện xe hơi cao cấp, giá tốt nhất." />
                <meta name="twitter:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta name="twitter:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
            </Helmet>
            {/* Header */}
            <Header />
            {/* Banner chính */}
            <HeroSection />
            {/* Danh sách sản phẩm mới nhất */}
            <ProductSection dataH2={'Sản phẩm mới nhất'} loading={loadingNew} dataProducts={newProducts} />
            {/* Banner phụ */}
            <BannerSection />
            {/* Danh sách sản phẩm bán chạy */}
            <ProductSection dataH2={'Sản phẩm bán chạy'} loading={loadingFeatured} dataProducts={featuredProducts} />
            {/* Bài viết */}
            <NewsSection newsList={newsList} />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
