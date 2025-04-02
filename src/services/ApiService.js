import axios from "axios";
let API_DOMAIN = import.meta.env.VITE_API_DOMAIN;


export const callApi = async (method, url, data = {}, type = "json", headers = {}) => {
    try {
        const instance = axios.create({
            baseURL: API_DOMAIN,
            withCredentials: false, // Để false nếu không dùng session/cookie
        });
        let finalData = data;
        let finalHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        };
        // Giữ nguyên phương thức gốc
        let finalMethod = method.toUpperCase();
        // Nếu là form-data
        if (type === "form-data") {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });

            // Nếu phương thức là PUT, thêm _method để tương thích Laravel
            if (method.toUpperCase() === "PUT") {
                formData.append("_method", "PUT");
                finalMethod = "POST";
            }

            finalData = formData;
            finalHeaders["Content-Type"] = "multipart/form-data";
        }
        console.log("tại ApiService log set all api");
        console.log({
            method: finalMethod,
            url,
            data: finalData,
            headers: finalHeaders,
        });
        const response = await instance({
            method: finalMethod,
            url,
            data: finalData,
            headers: finalHeaders,
        });

        return response.data;
    } catch (error) {
        console.error("API Error Details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        });
        throw error.response?.data || error;
    }
};
