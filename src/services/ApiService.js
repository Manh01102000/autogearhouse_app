import axios from "axios";
let API_DOMAIN = import.meta.env.VITE_API_DOMAIN;


export const callApi = async (method, url, data = {}, type = "json", headers = {}) => {
    try {
        const instance = axios.create({
            baseURL: API_DOMAIN,
            withCredentials: false,
        });

        let finalData = data;
        let finalHeaders = {
            Accept: "application/json",
            ...headers // Giữ nguyên các headers truyền vào
        };

        // set Content-Type cho JSON
        if (type !== "form-data") {
            finalHeaders["Content-Type"] = "application/json";
        }

        let finalMethod = method.toUpperCase();

        if (method.toUpperCase() === "PUT") {
            if (type === "form-data") {
                finalData.append("_method", "PUT");
                finalMethod = "POST";
            } else {
                finalData._method = "PUT";
            }
        }

        const response = await instance({
            method: finalMethod,
            url,
            data: finalData,
            headers: finalHeaders,
        });

        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error.response?.data || error;
    }
};
