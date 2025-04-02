import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/Layout/AdminLayout';
import './addUser.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import function
import * as functions from "../../../utils/function";
// Import service
import * as UserService from '../../../services/UserService';
// 
const AddUser = () => {
    // state
    const [showAdmin, setShowAdmin] = useState(false);
    // 
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm();

    const password = watch('emp_password');

    const onSubmit = async (data) => {
        try {
            // chuyển đổi thành timestamp
            data.emp_birth = String(functions.convertToTimestamp(data.emp_birth));
            // 
            let response = await UserService.createUser(data);
            if (response?.result) {
                navigate('/admin/users', { state: { message: 'Thêm tài khoản người dùng thành công' } });
            } else {
                reset();
                setError('root.serverError', {
                    type: 'server',
                    message: response?.message || 'Lỗi khi lấy dữ liệu'
                });
            }
        } catch (err) {
            reset();
            setError('root.serverError', {
                type: 'server',
                message: err?.message || 'Có lỗi xảy ra khi thêm tài khoản'
            });
        }
    };

    const handleChangeRole = (e) => {
        let val = e.target.value;
        if (val != 2) {
            setShowAdmin(false);
            reset({
                emp_salary: '',
                emp_department: '',
                emp_position: ''
            });
        } else {
            setShowAdmin(true);
        }
    };

    return (
        <AdminLayout>
            <div className="admin-user-form">
                <h2>Thêm tài khoản</h2>

                {errors.root?.serverError && (
                    <div className="error-message">{errors.root.serverError.message}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên tài khoản *</label>
                            <input type="text"
                                placeholder='Nhập tài khoản đăng nhập'
                                {...register('emp_account', {
                                    required: 'Vui lòng nhập tài khoản đăng nhập',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email không hợp lệ'
                                    }
                                })} />
                            {errors.emp_account && <span className="error-text">{errors.emp_account.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại *</label>
                            <input
                                placeholder='Nhập số điện thoại'
                                type="text"
                                {...register('emp_phone', {
                                    required: 'Vui lòng nhập Số điện thoại',
                                    pattern: {
                                        value: /^(0|\+84)(\d{9,10})$/,
                                        message: 'Số điện thoại không hợp lệ'
                                    }
                                })} />
                            {errors.emp_phone && <span className="error-text">{errors.emp_phone.message}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Mật khẩu *</label>
                            <input
                                placeholder='Nhập mật khẩu'
                                type="password"
                                {...register('emp_password', {
                                    required: 'Vui lòng nhập mật khẩu',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                                    }
                                })} />
                            {errors.emp_password && <span className="error-text">{errors.emp_password.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Xác nhận mật khẩu *</label>
                            <input
                                placeholder='Nhập mật khẩu xác nhận'
                                type="password"
                                {...register('emp_confirm_password', {
                                    required: 'Vui lòng xác nhận mật khẩu',
                                    validate: (value) =>
                                        value === password || 'Mật khẩu không khớp'
                                })} />
                            {errors.emp_confirm_password && (
                                <span className="error-text">{errors.emp_confirm_password.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Họ và tên *</label>
                            <input
                                placeholder='Nhập họ và tên'
                                type="text"
                                {...register('emp_name', {
                                    required: 'Vui lòng nhập họ và tên',
                                })} />
                            {errors.emp_name && (
                                <span className="error-text">{errors.emp_name.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Vai trò *</label>
                            <select {...register('user_role', {
                                required: 'Vui lòng chọn vai trò',
                                validate: (value) =>
                                    value != 0 || 'Chọn vai trò'
                            })} onChange={handleChangeRole}>
                                {functions.dataRole.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.user_role && (
                                <span className="error-text">{errors.user_role.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày sinh *</label>
                            <input type="date" {...register('emp_birth', {
                                required: 'Vui lòng chọn ngày sinh',
                            })} />
                            {errors.emp_birth && (
                                <span className="error-text">{errors.emp_birth.message}</span>
                            )}
                        </div>
                    </div>

                    {
                        showAdmin &&
                        <div className='form-admin'>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vị trí *</label>
                                    <select {...register('emp_position', {
                                        required: 'Vui lòng chọn vị trí',
                                        validate: (value) =>
                                            value != 0 || 'Chọn vị trí'
                                    })}>
                                        {functions.dataAdminPosition.map((item, index) => (
                                            <option key={index} value={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.emp_position && (
                                        <span className="error-text">{errors.emp_position.message}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Phòng ban *</label>
                                    <select {...register('emp_department', {
                                        required: 'Vui lòng chọn phòng ban',
                                        validate: (value) =>
                                            value != 0 || 'Chọn phòng ban'
                                    })}>
                                        {functions.dataAdminDepartment.map((item, index) => (
                                            <option key={index} value={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.emp_department && (
                                        <span className="error-text">{errors.emp_department.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Mức lương *</label>
                                    <select {...register('emp_salary', {
                                        required: 'Vui lòng chọn mức lương',
                                        validate: (value) =>
                                            value != 0 || 'Chọn mức lương'

                                    })}>
                                        {functions.dataRangeMoney.map((item, index) => (
                                            <option key={index} value={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.emp_salary && (
                                        <span className="error-text">{errors.emp_salary.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    }

                    <div className="form-actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Thêm tài khoản'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddUser;