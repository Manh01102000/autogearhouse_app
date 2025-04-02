import styles from "./AdminInput.module.scss";

const AdminInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.adminInput}
      value={value}
      onChange={onChange}
    />
  );
};

export default AdminInput;
