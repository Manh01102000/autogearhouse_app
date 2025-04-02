import styles from "./AdminButton.module.scss";

const AdminButton = ({ text, onClick }) => {
  return (
    <button className={styles.adminButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default AdminButton;
