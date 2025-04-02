import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/Layout/AdminLayout';
import ListUserEmployee from '../../../components/admin/User/listUserEmployee';
import './UserList.scss';
import * as UserService from '../../../services/UserService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy dữ liệu người dùng
    const getDataUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = {
                page: 1,
                pageSize: 20,
                emp_department: 2,
                sortBy: 1,
            };
            let response = await UserService.getUserAdmin(data);
            if (response?.result) {
                setUsers(response.data);
            } else {
                setError(response?.message || 'Lỗi khi lấy dữ liệu');
            }
        } catch (error) {
            setError('Lỗi API: ' + error.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    // Xử lý xóa người dùng
    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                let response = await UserService.deleteUser(userId);
                if (response?.result) {
                    setUsers(users.filter(user => user.id !== userId));
                } else {
                    alert('Lỗi khi xóa người dùng: ' + response?.message);
                }
            } catch (error) {
                alert('Lỗi API: ' + error.message);
            }
        }
    };

    // Xử lý sửa người dùng
    const handleEdit = async (user) => {
        const newName = prompt('Nhập tên mới:', user.name);
        const newEmail = prompt('Nhập email mới:', user.email);
        const newRole = prompt('Nhập vai trò mới (Admin/Moderator/User):', user.role);

        if (newName && newEmail && newRole) {
            try {
                let updatedUser = { ...user, name: newName, email: newEmail, role: newRole };
                let response = await UserService.updateUser(user.id, updatedUser);
                if (response?.result) {
                    setUsers(users.map(u => (u.id === user.id ? updatedUser : u)));
                } else {
                    alert('Lỗi khi cập nhật người dùng: ' + response?.message);
                }
            } catch (error) {
                alert('Lỗi API: ' + error.message);
            }
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <AdminLayout>
            <ListUserEmployee users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </AdminLayout>
    );
};

export default UserList;
