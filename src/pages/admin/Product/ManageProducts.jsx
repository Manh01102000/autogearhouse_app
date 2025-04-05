import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from "../../../components/admin/Layout/AdminLayout";
import ProductList from "../../../components/admin/Product/ProductList";
// CSS
import "./ManageProducts.scss";
// Import Service
import * as productService from "../../../services/ProductService";
import * as CategoryService from '../../../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [getCategory, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm();
    const navigate = useNavigate();
    // Gọi API lấy dữ liệu sản phẩm
    const getDataProduct = useCallback(async () => {
        try {
            setLoading(true);
            const data = { page: 1, pageSize: 20 };
            const response = await productService.getProduct(data);

            if (response?.result) {
                setProducts(response.data);
                setLoading(false);
            } else {
                console.error('Lỗi khi lấy dữ liệu:', response?.message);
            }
        } catch (error) {
            console.error('Lỗi API:', error);
        }
    }, []);

    useEffect(() => {
        getDataProduct();
    }, [getDataProduct]);

    // LẤY TẤT CẢ DANH MỤC SẢN PHẨM
    const getDataCategoryAll = useCallback(async () => {
        setLoading(true);
        try {
            const response = await CategoryService.getDataCategoryAll({});

            if (response?.result && response.data?.category) {
                const categoryData = response.data.category;
                setCategory(categoryData);
            } else {
                throw new Error(response?.message || 'category data not found');
            }
        } catch (error) {
            console.error("Fetch category error:", error);
            reset();
            setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu danh mục' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getDataCategoryAll();
    }, [getDataCategoryAll]);

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            // Lấy token
            const token = localStorage.getItem('token');
            // Tạo headers
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            // Gọi api
            const response = await productService.deleteProduct(productId, {}, headers);
            // Trả dữ liệu
            if (response?.result) {
                alert(response.message);
                navigate('/admin/product-list', { state: { message: response.message } });
            } else {
                setError('root.serverError', {
                    type: 'server',
                    message: response?.message || 'Lỗi khi xóa dữ liệu'
                });
            }
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <AdminLayout>
            <ProductList
                products={products}
                getCategory={getCategory}
                onDelete={handleDelete}
            />
        </AdminLayout>
    );
};

export default ManageProducts;
