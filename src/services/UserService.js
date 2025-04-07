import { callApi } from "./ApiService"; // Import hàm gọi API
import axios from "axios";

const LoginUser = async (account, password) => {
    let data = {
        account: account,
        password: password,
    }
    const response = await callApi("POST", '/api/user/login', data, 'json');
    return response;
}

const getUser = async (data) => {
    const response = await callApi("POST", '/api/user/search', data, 'json');
    return response;
}

const getUserAdmin = async (data) => {
    const response = await callApi("POST", '/api/user/search-user-admin', data, 'json');
    return response;
}

const createUser = async (data) => {
    const response = await callApi("POST", '/api/user/register', data, 'json');
    return response;
}

const updateUser = async (id, data, headers) => {
    try {
        return await callApi("PUT", `/api/user/${id}`, data, "form-data", headers);
    } catch (error) {
        console.error("Update error:", error);
        throw error;
    }
};

const getUserByID = async (id) => {
    const response = await callApi("GET", `/api/user/${id}`, {}, 'json');
    return response;
}

const verifyToken = async (headers) => {
    const response = await callApi("POST", `/api/user/checkToken`, {}, 'form-data', headers);
    return response;
}

const refreshToken = async (headers) => {
    const response = await callApi("GET", `/api/user/refresh`, {}, 'form-data', headers);
    return response;
}

export {
    createUser,
    LoginUser,
    getUser,
    getUserAdmin,
    getUserByID,
    updateUser,
    verifyToken,
    refreshToken
}