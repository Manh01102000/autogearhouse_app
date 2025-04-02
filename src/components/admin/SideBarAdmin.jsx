import React, { useState } from 'react';
import {
    FaBars, FaTachometerAlt, FaUser,
    FaCog, FaSignOutAlt, FaBox,
    FaClipboardList, FaChevronDown, FaChevronRight
} from 'react-icons/fa';
import { DiGithubBadge } from "react-icons/di";
import './SidebarAdmin.scss';

const SidebarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const menuItems = [
        {
            id: 'dashboard',
            icon: <FaTachometerAlt size={20} />,
            label: 'Trang chủ',
            link: '/admin/dashboard'
        },
        {
            id: 'user',
            icon: <FaUser size={20} />,
            label: 'Quản lý người dùng',
            subItems: [
                { label: 'Thêm tài khoản', link: '/admin/add-user' },
                { label: 'Tài khoản khách hàng', link: '/admin/users' },
                { label: 'Tài khoản quản trị', link: '/admin/admins' },
                { label: 'Tài khoản kinh doanh', link: '/admin/business' }
            ]
        },
        {
            id: 'product',
            icon: <FaBox size={20} />,
            label: 'Quản lý sản phẩm',
            subItems: [
                { label: 'Thêm sản phẩm', link: '/admin/add-products' },
                { label: 'Danh sách sản phẩm', link: '/admin/product-list' }
            ]
        },
        {
            id: 'post',
            icon: <FaClipboardList size={20} />,
            label: 'Quản lý bài viết',
            subItems: [
                { label: 'Bài viết', link: '/admin/posts' },
                { label: 'Danh sách bài viết', link: '/admin/post-list' }
            ]
        },
        {
            id: 'settings',
            icon: <FaCog size={20} />,
            label: 'Cài đặt',
            link: '/admin/settings'
        }
    ];

    return (
        <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container" onClick={() => setCollapsed(!collapsed)}>
                    <DiGithubBadge className="logo-icon" size={collapsed ? 40 : 56} />
                    {!collapsed && <span className="logo-text">AutoGear House</span>}
                </div>
                {!collapsed && (
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
                        <FaBars size={18} />
                    </button>
                )}
            </div>

            <div className="sidebar-menu">
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}>
                            {item.link ? (
                                <a href={item.link} className="menu-link">
                                    <span className="menu-icon">{item.icon}</span>
                                    {!collapsed && <span className="menu-label">{item.label}</span>}
                                </a>
                            ) : (
                                <div className="menu-link" onClick={() => toggleMenu(item.id)}>
                                    <span className="menu-icon">{item.icon}</span>
                                    {!collapsed && (
                                        <>
                                            <span className="menu-label">{item.label}</span>
                                            <span className="menu-arrow">
                                                {activeMenu === item.id ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}

                            {!collapsed && item.subItems && activeMenu === item.id && (
                                <ul className="submenu">
                                    {item.subItems.map((subItem, index) => (
                                        <li key={index}>
                                            <a href={subItem.link} className="submenu-link">
                                                {subItem.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {collapsed && hoveredItem === item.id && item.subItems && (
                                <div className="collapsed-submenu">
                                    <div className="submenu-title">{item.label}</div>
                                    <ul>
                                        {item.subItems.map((subItem, index) => (
                                            <li key={index}>
                                                <a href={subItem.link}>{subItem.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <FaSignOutAlt size={20} />
                    {!collapsed && <span>Đăng xuất</span>}
                </button>
            </div>
        </div>
    );
};

export default SidebarAdmin;