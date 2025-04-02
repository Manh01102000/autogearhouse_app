// File khởi chạy ứng dụng: Nơi khởi động ứng dụng React trong #root của index.html
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { HelmetProvider } from "react-helmet-async";
// Import thư viện React.
// ReactDOM.createRoot giúp ứng dụng chạy với React 18 tối ưu hơn.
// React.StrictMode giúp phát hiện các lỗi tiềm ẩn trong quá trình phát triển.
// react-helmet-async là một thư viện giúp bạn quản lý thẻ <head> trong React một cách hiệu quả và tối ưu hơn khi làm SEO.
// Nó là phiên bản cải tiến của react-helmet, với hỗ trợ tốt hơn cho SSR (Server-Side Rendering) và hiệu suất cao hơn.
// css main
import "./assets/css/global.css"; // Import CSS toàn cục
import { LoadingProvider } from "./contexts/LoadingContext";
ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <HelmetProvider>
            <LoadingProvider>
                <App />
            </LoadingProvider>
        </HelmetProvider>
    // </React.StrictMode>
);