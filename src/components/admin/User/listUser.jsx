import { FiEdit, FiTrash2, FiSearch, FiUser } from 'react-icons/fi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import function
import * as functions from "../../../utils/function";
// 
const ListUser = ({ users, handleEdit, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    let userData = users.users.data || [];
    let userTotal = users.users.total || 0;


    return (
        <>
            <div className="user-management">
                <div className="user-header">
                    <h1>Quản Lý Tài Khoản</h1>
                    <div className="search-box">
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Tìm kiếm người dùng..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div className="user-table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Thông tin</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.length > 0 ? (
                                userData.map((user, index) => (
                                    <tr key={user.user_id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    <FiUser />
                                                </div>
                                                <span>{user.customer_name}</span>
                                            </div>
                                        </td>
                                        <td>{user.customer_email}</td>
                                        <td>{functions.dataRole[user.user_role]}</td>
                                        <td>
                                            <span className={`status-badge ${user.status}`}>
                                                {user.user_authentic === 1 ? 'Hoạt động' : 'Vô hiệu hóa'}
                                            </span>
                                        </td>
                                        <td>{functions.Ejsdate('H:i:s d/m/Y', user.customer_create_time)}</td>
                                        <td>{functions.Ejsdate('H:i:s d/m/Y', user.customer_create_time)}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link to={`/admin/edit-user/${user.user_id}`}>
                                                    <button
                                                        className="edit-btn"
                                                        title="Chỉnh sửa">
                                                        <FiEdit />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(user.user_id)}
                                                    title="Xóa">
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-results">
                                        Không tìm thấy người dùng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListUser;