// src/components/admin/NavbarAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './NavbarAdmin.scss';
// Gọi đến authContext lấy dữ liệu user
import { useAuth } from '../../contexts/AuthContext';

const NavbarAdmin = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [userData, setUserData] = useState([]);
    // Lấy dữ liệu từ authContext
    const { user, loading } = useAuth();
    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [])
    // kiểm tra dữ liệu
    if (loading) return <p>Đang kiểm tra xác thực...</p>;
    // Dữ liệu thông báo mẫu
    const notifications = [
        { id: 1, title: 'Đơn hàng mới', message: 'Bạn có 5 đơn hàng mới cần xử lý', time: '10 phút trước' },
        { id: 2, title: 'Hệ thống', message: 'Phiên bản mới đã sẵn sàng', time: '2 giờ trước' },
        { id: 3, title: 'Bảo trì', message: 'Hệ thống sẽ bảo trì vào 2h sáng', time: '1 ngày trước' }
    ];

    return (
        <nav className="admin-navbar">
            {/* Website */}
            <div className="navbar-brand">
                <h1 className="logo-text">ADMIN DASHBOARD</h1>
            </div>

            {/* menu */}
            <div className="navbar-menu">
                {/* Box Thông báo */}
                <div className="menu-item notification" onClick={() => setShowNotifications(!showNotifications)}>
                    <FaBell className="menu-icon" />
                    <span className="notification-badge">{notifications.length}</span>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="dropdown-header">
                                <h3>Thông báo ({notifications.length})</h3>
                                <button className="mark-read">Đánh dấu đã đọc</button>
                            </div>
                            <div className="notification-list">
                                {notifications.map(noti => (
                                    <div key={noti.id} className="notification-item">
                                        <div className="notification-content">
                                            <h4>{noti.title}</h4>
                                            <p>{noti.message}</p>
                                            <span className="notification-time">{noti.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dropdown-footer">
                                <button className="view-all">Xem tất cả thông báo</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Box thông tin người dùng */}
                <div
                    className="user-profile"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                >
                    <div className="user-avatar">
                        <FaUserCircle className="avatar-icon" />
                    </div>

                    {showUserMenu && (
                        <div className="user-dropdown">
                            <div className="dropdown-header">
                                <div className="user-info">
                                    <span className="user-name">John Doe</span>
                                    <span className="user-role">Quản trị viên</span>
                                </div>
                            </div>
                            <div className="dropdown-menu">
                                <Link to={`/admin/edit-user/${userData.user_id}`}>
                                    <button className="dropdown-item">
                                        <FaUserCircle className="item-icon" />
                                        <span>Thông tin tài khoản</span>
                                    </button>
                                </Link>
                                <button className="dropdown-item">
                                    <FaCog className="item-icon" />
                                    <span>Cài đặt</span>
                                </button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout">
                                    <FaSignOutAlt className="item-icon" />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarAdmin;