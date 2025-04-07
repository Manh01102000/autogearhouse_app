import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import function
import * as functions from "../../../utils/function";
// Import service
import * as UserService from '../../../services/UserService';
// CSS
import './ChangePasswordForm.scss';

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm();
    const password = watch('emp_password');
    const onSubmit = async (data) => {
        try {
            // chuyển đổi thành timestamp
            // data.emp_birth = String(functions.convertToTimestamp(data.emp_birth));
            // // 
            // let response = await UserService.createUser(data);
            // if (response?.result) {
            //     navigate('/admin/users', { state: { message: 'Thêm tài khoản người dùng thành công' } });
            // } else {
            //     reset();
            //     setError('root.serverError', {
            //         type: 'server',
            //         message: response?.message || 'Lỗi khi lấy dữ liệu'
            //     });
            // }
        } catch (err) {
            reset();
            setError('root.serverError', {
                type: 'server',
                message: err?.message || 'Có lỗi xảy ra khi thêm tài khoản'
            });
        }
    };
    return (

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {errors.root?.serverError && (
                <div className="error-message">{errors.root.serverError.message}</div>
            )}
            <div className="form-column">
                <div className="form-group">
                    <label>Mật khẩu hiện tại *</label>
                    <input
                        placeholder='Nhập mật khẩu hiện tại'
                        type="password"
                        {...register('emp_password_current', {
                            required: 'Vui lòng nhập mật khẩu hiện tại',
                        })} />
                    {errors.emp_password_current && <span className="error-text">{errors.emp_password_current.message}</span>}
                </div>

                <div className="form-group">
                    <label>Mật khẩu mới *</label>
                    <input placeholder='Nhập mật khẩu mới'
                        type="password"
                        {
                        ...register('emp_password', {
                            required: 'Vui lòng nhập mật khẩu mới',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu mới phải có ít nhất 6 ký tự'
                            },
                            validate: {
                                hasUpperCase: value => /[A-Z]/.test(value) || 'Mật khẩu phải chứa ít nhất 1 chữ hoa',
                                hasNumber: value => /\d/.test(value) || 'Mật khẩu phải chứa ít nhất 1 số'
                            }
                        })
                        } />
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
            <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;