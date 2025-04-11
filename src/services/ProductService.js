import { callApi } from "./ApiService"; // Import hàm gọi API

// Lấy sản phẩm theo search
const getProduct = async (data) => {
    const response = await callApi("POST", '/api/products/search', data, 'json');
    return response;
}

// Lấy sản phẩm theo id
const getProductById = async (id) => {
    const response = await callApi("GET", `/api/products/${id}`, {}, 'json');
    return response;
}

// Tạo sản phẩm
const createProduct = async (data, headers) => {
    const response = await callApi("POST", '/api/products', data, 'form-data', headers);
    return response;
}

// Cập nhật sản phẩm
const updateProduct = async (id, data, headers) => {
    const response = await callApi("PUT", `/api/products/${id}`, data, 'form-data', headers);
    return response;
}

// Xóa sản phẩm
const deleteProduct = async (id, data, headers) => {
    const response = await callApi("DELETE", `/api/products/${id}`, data, 'form-data', headers);
    return response;
}

// Lấy sản phẩm mới
const getProductNew = async (data) => {
    const response = await callApi('GET', `/api/products/new`, {}, 'json');
    return response;
}

// Lấy sản phẩm nổi bật
const getProductFeatured = async (data) => {
    const response = await callApi('GET', `/api/products/featured`, {}, 'json');
    return response;
}

export {
    getProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductNew,
    getProductFeatured
}