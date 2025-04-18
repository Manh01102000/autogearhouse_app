// Import các thư viện & module
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNewProducts, fetchFeaturedProducts } from '../redux/features/products/productSlice';
// Import Helmet phục vụ SEO
import { Helmet } from "react-helmet-async";
// SEO
import MetaCard from '../components/SEO/MetaCard';
// ==============Import components==============
// Header
import Header from "../components/Header/Header";
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
    // SEO
    const [metaCard, metaCardShow] = [
        {
            'title': 'AutoGearHouse - Cửa hàng linh kiện xe hơi chất lượng',
            'description': 'AutoGearHouse cung cấp linh kiện, xe hơi chất lượng cao, giá tốt, bảo hành uy tín. Giao hàng toàn quốc.',
            'canonical': 'https://autogearhouse.com/',
            'keywords': 'AutoGearHouse, linh kiện xe hơi, phụ kiện ô tô, đồ chơi xe hơi, bảo trì xe hơi',
            'image': 'https://autogearhouse.com/images/banner.jpg',
            'index': 'index, follow',
        }
    ];
    // 
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
            <MetaCard title={metaCard.title}
                description={metaCard.description}
                keywords={metaCard.keywords}
                canonical={metaCard.canonical}
                index={metaCard.index} />
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
