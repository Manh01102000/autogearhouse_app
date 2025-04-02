import styles from "./AdminLayoutLogin.module.scss";

const AdminLayoutLogin = ({ children }) => {
  return (
    <div className={styles.adminLayout}>{children}</div>
  );
};

export default AdminLayoutLogin;
