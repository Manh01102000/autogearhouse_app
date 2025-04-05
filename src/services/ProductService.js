import { callApi } from "./ApiService"; // Import hàm gọi API

const getProduct = async (data) => {
    const response = await callApi("POST", '/api/products/search', data, 'json');
    return response;
}

const getProductById = async (id) => {
    const response = await callApi("GET", `/api/products/${id}`, {}, 'json');
    return response;
}

const createProduct = async (data, headers) => {
    const response = await callApi("POST", '/api/products', data, 'form-data', headers);
    return response;
}

const updateProduct = async (id, data, headers) => {
    const response = await callApi("PUT", `/api/products/${id}`, data, 'form-data', headers);
    return response;
}

const deleteProduct = async (id, data, headers) => {
    const response = await callApi("DELETE", `/api/products/${id}`, data, 'form-data', headers);
    return response;
}

export {
    getProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}