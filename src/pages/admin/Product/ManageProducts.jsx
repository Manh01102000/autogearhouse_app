import React, { useState, useEffect } from 'react';
import AdminLayout from "../../../components/admin/Layout/AdminLayout";
import ProductList from "../../../components/admin/Product/ProductList";
// CSS
import "./ManageProducts.scss";
// Import Service
import * as productService from "../../../services/ProductService";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    // Gọi API lấy dữ liệu sản phẩm khi component mount
    useEffect(() => {
        const getDataProduct = async () => {
            try {
                let data = { page: 1, pageSize: 20 };
                let response = await productService.getProduct(data);
                if (response?.result) {
                    setProducts(response.data); // Cập nhật state
                } else {
                    console.error('Lỗi khi lấy dữ liệu:', response?.message);
                }
            } catch (error) {
                console.error('Lỗi API:', error);
            }
        };

        getDataProduct();
    }, []);

    const handleDelete = (productId) => {
        if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleEdit = (product) => {
        console.log('Edit product:', product);
    };

    const handleCreate = () => {
        console.log('Create new product');
    };

    return (
        <AdminLayout>
            <ProductList
                products={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCreate={handleCreate}
            />
        </AdminLayout>
    );
};

export default ManageProducts;
