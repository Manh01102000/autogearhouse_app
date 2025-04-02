import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import nodata from "../../../assets/images/admin/nodata.jpg";

const AdminProductList = ({ products, onDelete, onEdit, onCreate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    let productData = products.data || [];
    let productTotal = products.total || 0;

    return (
        <div className="admin-product-dashboard">
            <div className="admin-header">
                <h2>Quản Lý Sản Phẩm</h2>
                <div className="admin-actions">
                    <div className="search-box">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="add-product-btn" onClick={onCreate}>
                        <FiPlus /> Thêm mới
                    </button>
                </div>
            </div>

            <div className="product-table-wrapper">
                <table className="product-data-table">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '60px' }}>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Tồn kho</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center" style={{ width: '100px' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.length > 0 ? (
                            productData.map((product, index) => (
                                <tr key={product.product_id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <div className="product-info-cell">
                                            <img
                                                src={product.product_images_full?.split(',')[0] || 'https://via.placeholder.com/40'}
                                                alt={product.product_name}
                                                className="product-thumb"
                                            />
                                            <span className="product-name">{product.product_name}</span>
                                        </div>
                                    </td>
                                    <td>{product.category_code}</td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                    <td className="text-center">
                                        <span className={`status-label ${product.status}`}>
                                            {product.product_active === '1' ? 'Kích hoạt' : 'Ẩn'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="action-buttons">
                                            <button
                                                className="edit-action"
                                                onClick={() => onEdit(product.product_id)}
                                                title="Chỉnh sửa"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="delete-action"
                                                onClick={() => onDelete(product.product_id)}
                                                title="Xóa"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-results">
                                    <div className="no-data-message">
                                        <img src={nodata} alt="No data" />
                                        <p>Không tìm thấy sản phẩm nào</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductList;