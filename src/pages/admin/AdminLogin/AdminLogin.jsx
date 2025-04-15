// Import các module
import styles from "./AdminLogin.module.scss";
// Sử dụng state
import { useState } from "react";
// Import hook-form
import { useForm } from "react-hook-form";
// Import useLoading
import { useLoading } from "../../../contexts/LoadingContext";
// LAYOUT
import AdminLayoutLogin from "../../../components/admin/Layout/AdminLayoutLogin";
// IMPORT IMAGE
import eyeClosedIcon from "../../../assets/images/admin/eyes-closed.png";
import eyeOpnedIcon from "../../../assets/images/admin/eyes-opend.png";
// IMPORT SERVICE
import * as UserService from "../../../services/UserService";
// Import useNavigate
import { useNavigate } from 'react-router-dom';
// authContext (đóng do dùng redux)
// import { useAuth } from '../../../contexts/AuthContext';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/features/auth/authSlice';

const AdminLogin = () => {
    // Khai báo hook từ useAuth
    // const { login } = useAuth();

    // Hook sử dụng để điều hướng
    const navigate = useNavigate();

    // State quản lý việc hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Hàm lấy loading context
    const { showLoading, hideLoading } = useLoading();

    // REDUX
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    // Hàm xử lý đăng nhập khi form được submit
    const onSubmit = async (data) => {
        showLoading();
        try {
            // Gọi đến createAsyncThunk tên là login và gửi request đến UserService.LoginUser(email, password)
            const result = await dispatch(login({ email: data.username, password: data.password })).unwrap();
            // console.log(result);
            navigate('/admin/dashboard');
        } catch (error) {
            alert(error);
            console.error("Lỗi đăng nhập:", error);
        } finally {
            hideLoading();
        }
    };

    // Hàm toggle hiển thị mật khẩu
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Xử lý focus input để làm nổi bật label
    const handleFocus = (e) => {
        const target = e.target;
        const box = target.closest(`.${styles["admin-login__box"]}`);
        const title = box.querySelector(`.${styles["admin-login__label"]}`);
        if (title) {
            title.style.transition = "all 0.5s ease";
            title.style.transform = "translateY(0px)";
            title.style.fontSize = "14px";
        }
    };

    // Xử lý blur input để khôi phục lại label khi không có giá trị
    const handleBlur = (e) => {
        const target = e.target;
        if (!target.value.trim()) {
            const box = target.closest(`.${styles["admin-login__box"]}`);
            const title = box.querySelector(`.${styles["admin-login__label"]}`);
            if (title) {
                title.style.transition = "all 0.5s ease";
                title.style.transform = "translateY(15px)";
                title.style.fontSize = "15px";
            }
        }
    };

    return (
        <AdminLayoutLogin>
            <div className={styles["admin-login__container"]}>
                {/* Form đăng nhập */}
                <form className={styles["admin-login__form"]} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles["admin-login__top"]}>
                        <h1 className={styles["admin-login__title"]}>Đăng nhập quản trị viên</h1>
                        <p className={styles["admin-login__subtitle"]}>
                            AutoGear Houses - Chào mừng bạn quay lại
                        </p>
                    </div>
                    <div className={styles["admin-login__center"]}>
                        {/* Tài khoản */}
                        <div className={styles["admin-login__box"]}>
                            <h2 className={styles["admin-login__label"]}>
                                Tài khoản <span className={styles["required"]}>*</span>
                            </h2>
                            <div className={styles["admin-login__input-wrapper"]}>
                                <input
                                    className={styles["admin-login__input"]}
                                    type="text"
                                    autoComplete="off"
                                    {...register("username", { required: "Vui lòng nhập tài khoản!" })}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors.username && <p className={styles["error-text"]}>{errors.username.message}</p>}
                        </div>

                        {/* Mật khẩu */}
                        <div className={styles["admin-login__box"]}>
                            <h2 className={styles["admin-login__label"]}>
                                Mật khẩu <span className={styles["required"]}>*</span>
                            </h2>
                            <div className={styles["admin-login__input-wrapper"]}>
                                <input
                                    className={styles["admin-login__input"]}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="off"
                                    {...register("password", { required: "Vui lòng nhập mật khẩu!" })}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <img
                                    src={showPassword ? eyeOpnedIcon : eyeClosedIcon}
                                    alt="Toggle Password"
                                    className={styles["admin-login__icon"]}
                                    onClick={togglePassword}
                                />
                            </div>
                            {errors.password && <p className={styles["error-text"]}>{errors.password.message}</p>}
                        </div>

                        {/* Nút đăng nhập */}
                        <div className={styles["admin-login__button-wrapper"]}>
                            <button className={styles["admin-login__button"]} type="submit">
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayoutLogin>
    );
};

export default AdminLogin;
