import { callApi } from "./ApiService"; // Import hàm gọi API

const getProduct = async (data) => {
    const response = await callApi("POST", '/api/products/search', data, 'json');
    return response;
}

export {
    getProduct
}