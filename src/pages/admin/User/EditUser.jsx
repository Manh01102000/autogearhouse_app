import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/Layout/AdminLayout';
import './addUser.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as functions from "../../../utils/function";
import * as UserService from '../../../services/UserService';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAdmin, setShowAdmin] = useState(false);

    const {
        register, handleSubmit, watch, reset,
        formState: { errors, isSubmitting },
        setError, setValue
    } = useForm();

    const getDataUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await UserService.getUserByID(id);
            // console.log("API Response:", response);

            if (response?.result && response.data?.user) {
                const userData = response.data.user;
                setUser(userData);
                setValue('emp_account', userData?.user_email_account || '');
                setValue('user_role', userData?.user_role ?? '');
                if (userData.user_role === 1 && userData.customers?.length > 0) {
                    const customer = userData.customers[0];
                    setValue('emp_name', customer?.customer_name || '');
                    setValue('emp_phone', customer?.customer_phone || '');
                    setValue('emp_birth', functions.Ejsdate('Y-m-d', customer?.customer_birthday || ''));
                    setShowAdmin(false);
                } else if (userData.user_role === 2 && userData.employees?.length > 0) {
                    const employee = userData.employees[0];
                    setValue('emp_name', employee?.employee_name || '');
                    setValue('emp_phone', employee?.employee_phone || '');
                    setValue('emp_birth', functions.Ejsdate('Y-m-d', employee?.employee_birthday || ''));
                    setValue('emp_position', employee?.employee_position || '');
                    setValue('emp_department', employee?.employee_department || '');
                    setValue('emp_salary', employee?.employee_salary || '');
                    setShowAdmin(true);
                }
            } else {
                throw new Error(response?.message || 'User data not found');
            }
        } catch (error) {
            console.error("Fetch user error:", error);
            reset();
            setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu người dùng' });
        } finally {
            setLoading(false);
        }
    }, [id, setValue, reset, setError]);

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    const handleChangeRole = (e) => {
        const val = parseInt(e.target.value);
        setShowAdmin(val === 2);
    };

    const onSubmit = async (data) => {
        try {
            data.emp_birth = String(functions.convertToTimestamp(data.emp_birth));
            // Gọi API
            const formData = new FormData();
            // Append các field dữ liệu
            Object.keys(data).forEach((item, index) => {
                if (data[item] !== undefined && data[item] !== null) {
                    if (typeof data[item] === 'object') {
                        formData.append(item, JSON.stringify(data[item]));
                    } else {
                        formData.append(item, data[item]);
                    }
                }
            });
            // Lấy token
            const token = localStorage.getItem('token');
            // Tạo headers
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await UserService.updateUser(id, formData, headers);
            if (response?.result) {
                alert(response.message);
            } else {
                setError('root.serverError', {
                    type: 'server',
                    message: response.message || 'Có lỗi xảy ra khi cập nhật tài khoản',
                });
            }
        } catch (error) {
            console.error("Submit error:", error);
            setError('root.serverError', {
                type: 'server',
                message: error.message || 'Có lỗi xảy ra khi cập nhật tài khoản',
            });
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <AdminLayout>
            <div className="admin-user-form">
                <h2>Chỉnh sửa tài khoản</h2>

                {errors.root?.serverError && (
                    <div className="error-message">{errors.root.serverError.message}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tên tài khoản *</label>
                            <input
                                readOnly
                                type="text"
                                placeholder='Nhập tài khoản đăng nhập'
                                {...register('emp_account', {
                                    required: 'Vui lòng nhập tài khoản đăng nhập',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email không hợp lệ'
                                    }
                                })}
                            />
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
                                })}
                            />
                            {errors.emp_phone && <span className="error-text">{errors.emp_phone.message}</span>}
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
                                })}
                            />
                            {errors.emp_name && (
                                <span className="error-text">{errors.emp_name.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Vai trò *</label>
                            <select
                                {...register('user_role', {
                                    required: 'Vui lòng chọn vai trò',
                                })}
                                onChange={handleChangeRole}>
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
                            <input
                                type="date"
                                {...register('emp_birth', {
                                    required: 'Vui lòng chọn ngày sinh',
                                })}
                            />
                            {errors.emp_birth && (
                                <span className="error-text">{errors.emp_birth.message}</span>
                            )}
                        </div>
                    </div>

                    {showAdmin && (
                        <div className='form-admin'>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vị trí *</label>
                                    <select
                                        {...register('emp_position', {
                                            required: 'Vui lòng chọn vị trí',
                                        })} >
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
                                    <select
                                        {...register('emp_department', {
                                            required: 'Vui lòng chọn phòng ban',
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
                                    <select
                                        {...register('emp_salary', {
                                            required: 'Vui lòng chọn mức lương',
                                        })}
                                    >
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
                    )}

                    <div className="form-actions">
                        <button type="submit" onClick={() => console.log("Button clicked")} disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Cập nhật tài khoản'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditUser;