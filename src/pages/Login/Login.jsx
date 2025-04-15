// Import các thư viện & module
import { useEffect } from 'react';
// Sử dụng state
import { useState } from "react";
// Import hook-form
import { useForm } from "react-hook-form";
// Import useLoading
import { useLoading } from "../../contexts/LoadingContext";
// Import useNavigate
import { Link, useNavigate } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
// Import Helmet phục vụ SEO
import { Helmet } from "react-helmet-async";
// =============IMPORT IMAGE==========================
import eyeClosedIcon from "../../assets/images/admin/eyes-closed.png";
import eyeOpnedIcon from "../../assets/images/admin/eyes-opend.png";
import bgrLogin from "../../assets/images/bgr/bgr-login.png";
// ==============Import components==============
// Header
import Header from "../../components/Header/Header";
// Header
import Footer from "../../components/Footer";
// AUTHSLICE
import { login } from '../../redux/features/auth/authSlice';
//SCSS
import './Login.scss';
const Login = () => {
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
    // Hàm xử lý đăng nhập khi form được submit
    const onSubmit = async (data) => {
        showLoading();
        try {
            // Gọi đến createAsyncThunk tên là login và gửi request đến UserService.LoginUser(email, password)
            const result = await dispatch(login({ email: data.username, password: data.password })).unwrap();
            // console.log(result);
            navigate('/');
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
    // Lấy user từ Redux store
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);
    return (
        <>
            <Helmet>
                {/* Tiêu đề & mô tả SEO */}
                <title>Đăng nhập tài khoản | Autogearhouse</title>
                <meta name="description" content="Đăng nhập vào Autogearhouse để quản lý đơn hàng, theo dõi lịch sử mua sắm và nhận các ưu đãi độc quyền về phụ kiện ô tô." />
                <meta name="keywords" content="AutoGearHouse, linh kiện xe hơi, phụ kiện ô tô, đồ chơi xe hơi, bảo trì xe hơi" />
                <meta name="author" content="AutoGearHouse" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph (Facebook, Zalo, LinkedIn) */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://autogearhouse.com/" />
                <meta property="og:title" content="Đăng nhập tài khoản | Autogearhouse" />
                <meta property="og:description" content="Đăng nhập vào Autogearhouse để quản lý đơn hàng, theo dõi lịch sử mua sắm và nhận các ưu đãi độc quyền về phụ kiện ô tô." />
                <meta property="og:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta property="og:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
                <meta property="og:site_name" content="AutoGearHouse" />
                <meta property="og:locale" content="vi_VN" />

                {/* Twitter Card (Twitter) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://autogearhouse.com/" />
                <meta name="twitter:title" content="Đăng nhập tài khoản | Autogearhouse" />
                <meta name="twitter:description" content="Đăng nhập vào Autogearhouse để quản lý đơn hàng, theo dõi lịch sử mua sắm và nhận các ưu đãi độc quyền về phụ kiện ô tô." />
                <meta name="twitter:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta name="twitter:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
            </Helmet>
            {/* Header */}
            <Header />
            <div id="login-page">
                <div className="login-wrapper">
                    <div className="login-image">
                        <img src={bgrLogin} alt="Login illustration" />
                    </div>
                    <div className="login-form-section">
                        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-heading">
                                <h1>Chào mừng bạn quay lại, AutoGearHouse!</h1>
                                <p>
                                    Quản lý mua bán ô tô thông minh, bắt đầu ngay với <strong>AutoGear House!</strong>
                                </p>
                            </div>

                            <div className="login-input-group">
                                <input
                                    type="text"
                                    placeholder="Nhập tài khoản"
                                    className="login-input"
                                    autoComplete="off"
                                    {...register("username", { required: "Vui lòng nhập tài khoản!" })}
                                />
                                {errors.username && <p className="error-text">{errors.username.message}</p>}

                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        className="login-input"
                                        autoComplete="off"
                                        {...register("password", { required: "Vui lòng nhập mật khẩu!" })} />
                                    <img
                                        src={showPassword ? eyeOpnedIcon : eyeClosedIcon}
                                        alt="Toggle Password"
                                        className="password-toggle"
                                        onClick={togglePassword}
                                    />
                                </div>
                                {errors.password && <p className="error-text">{errors.password.message}</p>}
                            </div>

                            <div className="login-options">
                                <Link to="/quen-mat-khau" className="forgot-password">Quên mật khẩu?</Link>
                            </div>

                            <button className="login-button" type="submit">Đăng nhập</button>

                            <div className="divider">
                                <Link to="/dang-ky-tai-khoan" className="register">Tạo tài khoản</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <Footer />
        </>
    );
};

export default Login;
