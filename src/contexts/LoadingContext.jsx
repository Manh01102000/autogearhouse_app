import { createContext, useContext, useState } from "react";
import LoadingComponent from "../components/Loading"; // Import component Loading

// 1️⃣ Tạo Context
const LoadingContext = createContext(null);

// 2️⃣ Hook để sử dụng trong component
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
};

// 3️⃣ Provider
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
            {isLoading && <LoadingComponent />} {/* Hiển thị Loading khi isLoading === true */}
        </LoadingContext.Provider>
    );
};
