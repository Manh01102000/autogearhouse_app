// src/components/admin/Layout/AdminLayout.jsx
import React from "react";
import Sidebar from "../SideBarAdmin";
import NavbarAdmin from "../NavbarAdmin";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }) => {
    return (
        <div className={styles.adminLayout}>
            <Sidebar />
            <div className={styles.adminContent}>
                <NavbarAdmin />
                <div className={styles.main}>{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
