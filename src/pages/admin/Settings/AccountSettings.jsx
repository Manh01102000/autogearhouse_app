// src/pages/admin/Settings/AccountSettings.jsx
import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/Layout/AdminLayout';
// import
// import SystemSettings from '../../../components/admin/Settings/SystemSettings';
import ChangePasswordForm from '../../../components/admin/Settings/ChangePasswordForm';
// 
import './AccountSettings.scss';

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('security');
    const [loading, setLoading] = useState(true);
    
    // if (loading) return <p>Đang tải dữ liệu...</p>;
    return (
        <AdminLayout>
            <div className="account-settings">
                <h2>Cài Đặt Tài Khoản</h2>
                <div className="tabs">
                    <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>Bảo mật</button>
                    {/* <button className={activeTab === 'options' ? 'active' : ''} onClick={() => setActiveTab('options')}>Tùy chọn</button> */}
                </div>
                <div className="tab-content">
                    {activeTab === 'security' && <ChangePasswordForm />}
                    {/* {activeTab === 'options' && <SystemSettings />} */}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AccountSettings;