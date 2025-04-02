// src/pages/AdminDashboard.jsx
import React from 'react';
import AdminLayout from '../../components/admin/Layout/AdminLayout';
import './Dashboard.scss';

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <h1 className="dashboard-title">Tổng Quan</h1>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon users">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-info">
                            <h3>Tổng người dùng</h3>
                            <p className="stat-value">1,024</p>
                            <p className="stat-change positive">↑ 12% so với tháng trước</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon products">
                            <i className="fas fa-box-open"></i>
                        </div>
                        <div className="stat-info">
                            <h3>Tổng sản phẩm</h3>
                            <p className="stat-value">568</p>
                            <p className="stat-change positive">↑ 5% so với tháng trước</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orders">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div className="stat-info">
                            <h3>Tổng đơn hàng</h3>
                            <p className="stat-value">2,430</p>
                            <p className="stat-change negative">↓ 3% so với tháng trước</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon revenue">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-info">
                            <h3>Doanh thu</h3>
                            <p className="stat-value">$48,250</p>
                            <p className="stat-change positive">↑ 8% so với tháng trước</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="recent-orders">
                        <h2>Đơn hàng gần đây</h2>
                        <div className="orders-table">
                            {/* Table content would go here */}
                            <p>Danh sách đơn hàng sẽ hiển thị ở đây</p>
                        </div>
                    </div>

                    <div className="quick-stats">
                        <h2>Thống kê nhanh</h2>
                        <div className="stats-chart">
                            {/* Chart would go here */}
                            <p>Biểu đồ thống kê sẽ hiển thị ở đây</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;