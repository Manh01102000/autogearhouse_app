import { callApi } from "./ApiService"; // Import hàm gọi API

const getDataModelProduct = async (data) => {
    const response = await callApi("GET", '/api/models', data, 'json');
    return response;
}

const getDataModelProductByID = async (id) => {
    const response = await callApi("GET", `/api/models/${id}`, {}, 'json');
    return response;
}

export {
    getDataModelProduct,
    getDataModelProductByID
}