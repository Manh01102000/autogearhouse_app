import { callApi } from "./ApiService"; // Import hàm gọi API

const getDataCategory = async (data) => {
    const response = await callApi("GET", '/api/category', data, 'json');
    return response;
}

const getDataCategoryAll = async (data) => {
    const response = await callApi("GET", '/api/category/all', data, 'json');
    return response;
}

const getDataCategoryByID = async (id) => {
    const response = await callApi("GET", `/api/category/${id}`, {}, 'json');
    return response;
}

export {
    getDataCategory,
    getDataCategoryAll,
    getDataCategoryByID,
}