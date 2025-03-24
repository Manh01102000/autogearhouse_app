// Import Helmet phục vụ SEO
import { Helmet } from "react-helmet-async";
// Import components
import HeroSection from "../components/home/HeroSection";
import ProductSection from "../components/home/ProductSection";
const Home = () => {
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
            <h1 hidden>Chào mừng đến với AutoGearHouse!</h1>
            {/* ✅ Banner chính */}
            <HeroSection />
            {/* ✅ Danh sách sản phẩm nổi bật */}
            <ProductSection />
        </div>
    );
};

export default Home;
