import { callApi } from "./ApiService"; // Import hàm gọi API

const getDataBrand = async (data) => {
    const response = await callApi("GET", '/api/brands', data, 'json');
    return response;
}

const getDataBrandByID = async (id) => {
    const response = await callApi("GET", `/api/brands/${id}`, {}, 'json');
    return response;
}

export {
    getDataBrand,
    getDataBrandByID
}