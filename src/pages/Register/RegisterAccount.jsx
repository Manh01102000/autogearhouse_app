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
// import function
import * as functions from "../../utils/function";
// =============IMPORT IMAGE==========================
import eyeClosedIcon from "../../assets/images/admin/eyes-closed.png";
import eyeOpnedIcon from "../../assets/images/admin/eyes-opend.png";
import bgrregister from "../../assets/images/bgr/bgr-register.png";
// ==============Import components==============
// Header
import Header from "../../components/Header/Header";
// Header
import Footer from "../../components/Footer";
// AUTHSLICE
import { registerAccount } from '../../redux/features/auth/authSlice';
//SCSS
import './Register.scss';
const Register = () => {
    // Hook sử dụng để điều hướng
    const navigate = useNavigate();
    // State quản lý việc hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // React Hook Form setup
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm();
    const password = watch('emp_password');
    // Hàm lấy loading context
    const { showLoading, hideLoading } = useLoading();
    // REDUX
    const dispatch = useDispatch();
    // Hàm xử lý đăng nhập khi form được submit
    const onSubmit = async (data) => {
        showLoading();
        try {
            data.emp_birth = String(functions.convertToTimestamp(data.emp_birth));
            data.emp_role = 1;
            // console.log(data); return;
            // Gọi đến createAsyncThunk tên là login và gửi request đến UserService.LoginUser(email, password)
            const result = await dispatch(registerAccount(data)).unwrap();
            // console.log(result);
            // return;
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

    const toggleConfimrPassword = () => {
        setShowConfirmPassword((prev) => !prev);
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
                <title>Đăng ký tài khoản - Tham gia cộng đồng AutoGear House</title>
                <meta name="description" content="Tạo tài khoản miễn phí tại AutoGear House để mua bán xe ô tô dễ dàng, theo dõi đơn hàng và nhận ưu đãi độc quyền dành cho thành viên. Đăng ký ngay chỉ với vài bước đơn giản!" />
                <meta name="keywords" content="đăng ký tài khoản, tạo tài khoản, AutoGear House, đăng ký mua bán xe, tài khoản khách hàng, đăng ký thành viên, website ô tô" />
                <meta name="author" content="AutoGearHouse" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph (Facebook, Zalo, LinkedIn) */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://autogearhouse.com/" />
                <meta property="og:title" content="Đăng ký tài khoản - Tham gia cộng đồng AutoGear House" />
                <meta property="og:description" content="Tạo tài khoản miễn phí tại AutoGear House để mua bán xe ô tô dễ dàng, theo dõi đơn hàng và nhận ưu đãi độc quyền dành cho thành viên. Đăng ký ngay chỉ với vài bước đơn giản!" />
                <meta property="og:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta property="og:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
                <meta property="og:site_name" content="AutoGearHouse" />
                <meta property="og:locale" content="vi_VN" />

                {/* Twitter Card (Twitter) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://autogearhouse.com/" />
                <meta name="twitter:title" content="Đăng ký tài khoản - Tham gia cộng đồng AutoGear House" />
                <meta name="twitter:description" content="Tạo tài khoản miễn phí tại AutoGear House để mua bán xe ô tô dễ dàng, theo dõi đơn hàng và nhận ưu đãi độc quyền dành cho thành viên. Đăng ký ngay chỉ với vài bước đơn giản!" />
                <meta name="twitter:image" content="https://autogearhouse.com/images/banner.jpg" />
                <meta name="twitter:image:alt" content="AutoGearHouse - Linh kiện xe hơi chất lượng" />
            </Helmet>
            {/* Header */}
            <Header />
            <div id="register-page">
                <div className="register-wrapper">
                    <div className="register-image">
                        <img src={bgrregister} alt="register illustration" />
                    </div>
                    <div className="register-form-section">
                        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="register-heading">
                                <h1>Đăng ký tài khoản, AutoGearHouse!</h1>
                                <p>Khám phá hàng ngàn mẫu xe chất lượng – mua bán ô tô dễ dàng, nhanh chóng và an toàn chỉ với vài cú click!</p>
                            </div>

                            <div className="register-input-group">
                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="text"
                                            placeholder="Nhập tài khoản"
                                            className="register-input"
                                            autoComplete="off"
                                            {...register('emp_account', {
                                                required: 'Vui lòng nhập tài khoản đăng nhập',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Email không hợp lệ'
                                                }
                                            })} />
                                        {errors.emp_account && <p className="error-text">{errors.emp_account.message}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <div className="password-wrapper">
                                            <input type={showPassword ? "text" : "password"}
                                                placeholder="Nhập mật khẩu"
                                                className="register-input"
                                                autoComplete="off"
                                                {...register("emp_password", { required: "Vui lòng nhập mật khẩu!" })} />
                                            <img src={showPassword ? eyeOpnedIcon : eyeClosedIcon}
                                                alt="Toggle Password"
                                                className="password-toggle"
                                                onClick={togglePassword} />
                                        </div>
                                        {errors.emp_password && <p className="error-text">{errors.emp_password.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <div className="password-wrapper">
                                            <input placeholder='Nhập mật khẩu xác nhận'
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="register-input"
                                                {...register('emp_confirm_password', {
                                                    required: 'Vui lòng xác nhận mật khẩu!',
                                                    validate: (value) =>
                                                        value === password || 'Mật khẩu không khớp'
                                                })} />
                                            <img src={showConfirmPassword ? eyeOpnedIcon : eyeClosedIcon}
                                                alt="Toggle Password"
                                                className="password-toggle"
                                                onClick={toggleConfimrPassword} />
                                        </div>
                                        {errors.emp_confirm_password && <p className="error-text">{errors.emp_confirm_password.message}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="text"
                                            placeholder="Nhập họ và tên"
                                            className="register-input"
                                            autoComplete="off"
                                            {...register("emp_name", { required: "Vui lòng Nhập họ và tên!" })} />
                                        {errors.emp_name && <p className="error-text">{errors.emp_name.message}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input placeholder='Nhập số điện thoại'
                                            type="text"
                                            className="register-input"
                                            {...register('emp_phone', {
                                                required: 'Vui lòng nhập Số điện thoại',
                                                pattern: {
                                                    value: /^(0|\+84)(\d{9,10})$/,
                                                    message: 'Số điện thoại không hợp lệ'
                                                }
                                            })} />
                                        {errors.emp_phone && <p className="error-text">{errors.emp_phone.message}</p>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="date" className="register-input" {...register('emp_birth', {
                                            required: 'Vui lòng chọn ngày sinh',
                                        })} />
                                        {errors.emp_birth && (
                                            <span className="error-text">{errors.emp_birth.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="register-options">
                                <Link to="/quen-mat-khau" className="forgot-password">Quên mật khẩu?</Link>
                            </div>

                            <button className="register-button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Đang xử lý...' : 'Thêm tài khoản'}</button>

                            <div className="divider">
                                <Link to="/dang-nhap-tai-khoan" className="register">Đăng nhập</Link>
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

export default Register;
