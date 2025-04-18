// Import Helmet phục vụ SEO
import { Helmet } from "react-helmet-async";
const MetaCard = ({ title, description, keywords, canonical, index, image }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords || "AutoGearHouse, linh kiện xe hơi, phụ kiện ô tô, đồ chơi xe hơi, bảo trì xe hơi"} />
                <link rel="canonical" href={canonical || "https://autogearhouse.com/"} />
                <meta name="author" content="AutoGearHouse" />
                <meta name="robots" content={index || "noindex, nofollow"} />

                {/* Open Graph (Facebook, Zalo, LinkedIn) */}
                <meta property="og:type" content="product" />
                <meta property="og:url" content={canonical || "https://autogearhouse.com/"} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image || 'https://autogearhouse.com/images/banner.jpg'} />
                <meta property="og:image:alt" content={title || "AutoGearHouse - Linh kiện xe hơi chất lượng"} />
                <meta property="og:site_name" content="AutoGearHouse" />
                <meta property="og:locale" content="vi_VN" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonical || "https://autogearhouse.com/"} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image || 'https://autogearhouse.com/images/banner.jpg'} />
                <meta name="twitter:image:alt" content={title || "AutoGearHouse - Linh kiện xe hơi chất lượng"} />
            </Helmet>
        </>
    )
}

export default MetaCard;