import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/admin/Layout/AdminLayout';
import './addProducts.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import function
import * as functions from "../../../utils/function";
// Import service
import * as ProductService from '../../../services/ProductService';
import * as CategoryService from '../../../services/CategoryService';
import * as BrandService from '../../../services/BrandService';
import * as ModelProductService from '../../../services/ModelProductService';
// 
import upload_img from '../../../assets/images/admin/upload_img.png';
import icons_plus_file from '../../../assets/images/admin/icons_plus_file.png';
import icon_delete from '../../../assets/images/admin/icon_delete.png';
import { useLoading } from "../../../contexts/LoadingContext";


const AddProducts = () => {
    // state
    const [showMileage, setShowMileage] = useState(false);
    const [showFeeship, setShowFeeship] = useState(false);
    const [getCategory, setCategory] = useState([]);
    const [getCategoryDetail, setCategoryDetail] = useState([]);
    const [getBrand, setBrand] = useState([]);
    const [getModelProduct, setModelProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    // Hàm lấy loading context
    const { showLoading, hideLoading } = useLoading();
    // files
    const [files, setFiles] = useState([]);
    // product type
    const [variants, setVariant] = useState([]);
    // 
    const navigate = useNavigate();
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm();

    const password = watch('emp_password');

    // ONSUBMIT
    const onSubmit = async (data) => {
        try {
            showLoading();
            const formData = new FormData();

            // Xử lý files mới
            files.forEach(file => {
                const { type, file: actualFile } = file;
                if (type.startsWith('video')) {
                    formData.append('product_videos[]', actualFile);
                } else if (type.startsWith('image')) {
                    formData.append('product_images[]', actualFile);
                }
            });

            // Append các field dữ liệu
            Object.keys(data).forEach((key) => {
                if (data[key] !== undefined && data[key] !== null) {
                    // Xử lý đặc biệt cho object/array
                    if (typeof data[key] === 'object') {
                        formData.append(key, JSON.stringify(data[key]));
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            });

            // Xử lý variants - chuyển thành JSON string
            if (variants && variants.length > 0) {
                formData.append('product_variants', JSON.stringify(variants));
            }
            // Lấy token
            const token = localStorage.getItem('token');
            // Tạo headers
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            // Gọi api
            const response = await ProductService.createProduct(formData, headers);
            // Trả dữ liệu
            if (response?.result) {
                alert(response.message);
                navigate('/admin/product-list', { state: { message: response.message } });
            } else {
                setError('root.serverError', {
                    type: 'server',
                    message: response?.message || 'Lỗi khi thêm dữ liệu'
                });
            }

        } catch (err) {
            setError('root.serverError', {
                type: 'server',
                message: err?.message || 'Có lỗi xảy ra khi thêm sản phẩm'
            });
        } finally {
            hideLoading();
        }
    };

    const handleChangeOldNew = (e) => {
        let val = e.target.value;
        if (val == 1) {
            setShowMileage(false);
            reset({
                product_feeship: '',
            });
        } else {
            setShowMileage(true);
        }
    };

    const handleChangeShip = (e) => {
        let val = e.target.value;
        if (val == 1) {
            setShowFeeship(false);
            reset({
                product_mileage: '',
            });
        } else {
            setShowFeeship(true);
        }
    };

    // LẤY DANH MỤC SẢN PHẨM
    const getDataCategory = useCallback(async () => {
        try {
            const response = await CategoryService.getDataCategory({});

            if (response?.result && response.data?.category) {
                const categoryData = response.data.category;
                setCategory(categoryData);
            } else {
                throw new Error(response?.message || 'category data not found');
            }
        } catch (error) {
            console.error("Fetch category error:", error);
            reset();
            setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu danh mục' });
        }
    }, [reset, setError]);

    useEffect(() => {
        getDataCategory();
    }, [getDataCategory]);

    // SET DANH MỤC CON THEO DANH MỤC CHA
    const handleChangeCategory = async (e) => {
        const val = e.target.value;
        if (val == 0) {
            return setCategoryDetail([]);
        }

        if (val) {
            try {
                const response = await CategoryService.getDataCategoryByID(val);
                console.log("API Response:", response);

                if (response?.result && response.data?.category) {
                    const categoryData = response.data.category;
                    setCategoryDetail(categoryData);
                } else {
                    throw new Error(response?.message || 'category data not found');
                }
            } catch (error) {
                console.error("Fetch category error:", error);
                reset();
                setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu danh mục' });
            }
        }
    }

    // LẤY HÃNG SẢN PHẨM
    const getDataBrands = useCallback(async () => {
        try {
            const response = await BrandService.getDataBrand({});

            if (response?.result && response.data?.brand) {
                const brandData = response.data.brand;
                setBrand(brandData);
            } else {
                throw new Error(response?.message || 'không tìm thấy dữ liệu hãng sản phẩm');
            }
        } catch (error) {
            console.error("Fetch brands error:", error);
            reset();
            setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu danh mục' });
        }
    }, [reset, setError]);

    useEffect(() => {
        getDataBrands();
    }, [getDataBrands]);

    // LẤY DÒNG SẢN PHẨM
    const handleChangeModelProduct = async (e) => {
        const val = e.target.value;
        if (val == 0) {
            return setModelProduct([]);
        }

        if (val) {
            try {
                const response = await ModelProductService.getDataModelProductByID(val);
                // console.log("API Response:", response);

                if (response?.result && response.data?.modelProduct) {
                    const modelProductData = response.data.modelProduct;
                    setModelProduct(modelProductData);
                } else {
                    throw new Error(response?.message || 'không tìm thấy dòng sản phẩm');
                }
            } catch (error) {
                console.error("Fetch category error:", error);
                reset();
                setError('root', { type: 'server', message: error.message || 'Lỗi khi lấy dữ liệu danh mục' });
            }
        }
    }

    // LUỒNG LOAD VIDEO
    const loadVideo = (e) => {
        showLoading();
        const fileInput = e.target.files[0];
        if (!fileInput) return;

        const size = (fileInput.size / (1024 * 1024)).toFixed(2);
        const type = fileInput.type;
        const name = fileInput.name;
        const match = [
            "video/m4v", "video/mp4", "video/ogm", "video/wmv", "video/mpg", "video/ogv",
            "video/webm", "video/mov", "video/asx", "video/mpeg", "image/gif", "image/png",
            "image/jpg", "image/jpeg", "image/jfif", "image/PNG"
        ];

        if (match.includes(type)) {
            let newFiles = [...files];

            if (type.startsWith("video")) {
                if (size <= 20) {
                    // Tối đa 1 video
                    if (newFiles.filter(file => file.type.startsWith('video')).length < 1) {
                        newFiles.push({ file: fileInput, type: 'video' });
                        setFiles(newFiles);
                    } else {
                        alert(`${name} Tối đa 1 video`);
                    }
                } else {
                    alert(`${name} Video tải lên vượt quá 20 MB`);
                }
            } else {
                if (size <= 2) {
                    // Tối đa 10 ảnh
                    if (newFiles.filter(file => file.type.startsWith('image')).length < 10) {
                        newFiles.push({ file: fileInput, type: 'image' });
                        setFiles(newFiles);
                    } else {
                        alert(`${name} Tối đa 10 ảnh`);
                    }
                } else {
                    alert(`${name} Ảnh tải lên vượt quá 2 MB`);
                }
            }
        } else {
            alert(`${name} sai định dạng, vui lòng chọn ảnh hoặc video hợp lệ!`);
        }
        hideLoading();
    }
    const icon_delete_img = (index) => {
        // Sao chép mảng cũ để tránh thay đổi trực tiếp state
        let newFiles = [...files];
        // Xóa phần tử tại vị trí index
        newFiles.splice(index, 1);
        // Cập nhật lại state
        setFiles(newFiles);
    }

    // Luồng lưu loại sản phẩm
    const handleSaveProductType = (e) => {
        let parent = e.target.closest('.boxVariant');

        if (!parent) return;

        // Lấy dữ liệu từ form
        let productColor = parent.querySelector('select[id="product_color"]').value;
        let productStock = parent.querySelector('input[id="product_stock"]').value;
        let productPrice = parent.querySelector('input[id="product_price"]').value;

        // Kiểm tra nếu có input nào trống thì không thêm vào mảng
        if (!productColor || !productStock || !productPrice) {
            alert("Vui lòng nhập đầy đủ thông tin phân loại sản phẩm!");
            parent.querySelector('select[id="product_color"]').focus();
            return;
        }

        // Tạo object mới
        let newProductType = {
            product_color: productColor,
            product_stock: parseInt(productStock, 10),
            product_price: String(productPrice),
        };

        // Cập nhật state `variant`
        setVariant(prevVariant => [...prevVariant, newProductType]);

        parent.querySelector('select[id="product_color"]').value = 'Chọn màu sắc';
        parent.querySelector('input[id="product_stock"]').value = "";
        parent.querySelector('input[id="product_price"]').value = "";
    };
    const handleChange = (index, field, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][field] = value;
        setVariant(updatedVariants);
    };

    // Hàm xóa một loại sản phẩm
    const handleDeleteVariant = (index) => {
        // Sao chép mảng cũ để tránh thay đổi trực tiếp state
        let newVariants = [...variants];
        // Xóa phần tử tại vị trí index
        newVariants.splice(index, 1);
        // Cập nhật lại state
        setVariant(newVariants);
    };
    
    return (
        <AdminLayout>
            <div className="admin-product-form">
                <h2>Thêm sản phẩm</h2>

                {errors.root?.serverError && (
                    <div className="error-message">{errors.root.serverError.message}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Mã + tên sản phẩm */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mã sản phẩm <span className='cl_red'>*</span></label>
                            <input type="text"
                                placeholder='Nhập mã sản phẩm'
                                {...register('product_code', {
                                    required: 'Vui lòng nhập mã sản phẩm',
                                })} />
                            {errors.product_code && <span className="error-text">{errors.product_code.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Tên sản phẩm <span className='cl_red'>*</span></label>
                            <input
                                placeholder='Nhập tên sản phẩm'
                                type="text"
                                {...register('product_name', {
                                    required: 'Vui lòng nhập tên sản phẩm',
                                })} />
                            {errors.product_name && <span className="error-text">{errors.product_name.message}</span>}
                        </div>
                    </div>

                    {/* Mô tả sản phẩm */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mô tả sản phẩm <span className='cl_red'>*</span></label>
                            <textarea placeholder='Nhập mô tả sản phẩm'
                                name="product_description"
                                id="product_description"
                                cols="30" rows="10" {...register('product_description', {
                                    required: 'Vui lòng nhập mô tả sản phẩm',
                                })} ></textarea>
                            {errors.product_description && <span className="error-text">{errors.product_description.message}</span>}
                        </div>
                    </div>

                    {/* Hãng xe + dòng xe */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hãng xe <span className='cl_red'>*</span></label>
                            <select {...register('product_brand', {
                                required: 'Vui lòng chọn hãng xe',
                                validate: (value) =>
                                    value != 0 || 'Chọn hãng xe'
                            })} onChange={handleChangeModelProduct}>
                                <option key='0' value='0'>Chọn hãng xe</option>
                                {getBrand.map((item, index) => (
                                    <option key={index} value={item.brand_id}>
                                        {item.brand_name}
                                    </option>
                                ))}
                            </select>
                            {errors.product_brand && (
                                <span className="error-text">{errors.product_brand.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Dòng xe <span className='cl_red'>*</span></label>
                            <select {...register('product_model', {
                                required: 'Vui lòng chọn dòng xe',
                                validate: (value) =>
                                    value != 0 || 'Chọn dòng xe'
                            })}>
                                <option key='0' value='0'>Chọn dòng xe</option>
                                {getModelProduct.map((item, index) => (
                                    <option key={index} value={item.model_id}>
                                        {item.model_name}
                                    </option>
                                ))}
                            </select>
                            {errors.product_model && (
                                <span className="error-text">{errors.product_model.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Năm sản xuất + loại nhiên liệu */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Năm sản xuất <span className='cl_red'>*</span></label>
                            <input
                                placeholder='Nhập năm sản xuất'
                                type="text"
                                {...register('product_year', {
                                    required: 'Vui lòng nhập năm sản xuất',
                                })} />
                            {errors.product_year && (
                                <span className="error-text">{errors.product_year.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Loại nhiên liệu <span className='cl_red'>*</span></label>
                            <select {...register('product_fuel_type', {
                                required: 'Vui lòng chọn loại nhiên liệu',
                                validate: (value) =>
                                    value != 0 || 'Chọn loại nhiên liệu'
                            })}>
                                {functions.dataFuelType.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_fuel_type && (
                                <span className="error-text">{errors.product_fuel_type.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Hộp số + công suất */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hộp số <span className='cl_red'>*</span></label>
                            <select {...register('product_transmission', {
                                required: 'Vui lòng chọn hộp số',
                                validate: (value) =>
                                    value != 0 || 'Chọn hộp số'
                            })}>
                                {functions.dataTransmission.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_transmission && (
                                <span className="error-text">{errors.product_transmission.message}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Công suất <span className='cl_red'>*</span></label>
                            <input
                                placeholder='Nhập công suất'
                                type="text"
                                {...register('product_horsepower', {
                                    required: 'Vui lòng nhập công suất',
                                })} />
                            {errors.product_horsepower && (
                                <span className="error-text">{errors.product_horsepower.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Dung tích + momen */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Dung tích động cơ <span className='cl_red'>*</span></label>
                            <select {...register('product_engine_capacity', {
                                required: 'Vui lòng chọn dung tích động cơ',
                                validate: (value) =>
                                    value != 0 || 'Chọn dung tích động cơ'
                            })}>
                                {functions.dataEngineCapacity.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_engine_capacity && (
                                <span className="error-text">{errors.product_engine_capacity.message}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Mô-men xoắn (Nm) <span className='cl_red'>*</span></label>
                            <select {...register('product_torque', {
                                required: 'Vui lòng chọn Mô-men xoắn (Nm)',
                                validate: (value) =>
                                    value != 0 || 'Chọn Mô-men xoắn (Nm)'
                            })}>
                                {functions.dataTorque.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_torque && (
                                <span className="error-text">{errors.product_torque.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Dẫn động + loại thân xe */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Dẫn động <span className='cl_red'>*</span></label>
                            <select {...register('product_drive_type', {
                                required: 'Vui lòng chọn dẫn động',
                                validate: (value) =>
                                    value != 0 || 'Chọn dẫn động'
                            })}>
                                {functions.dataDriveType.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_drive_type && (
                                <span className="error-text">{errors.product_drive_type.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Loại thân xe <span className='cl_red'>*</span></label>
                            <select {...register('product_body_type', {
                                required: 'Vui lòng chọn Loại thân xe',
                                validate: (value) =>
                                    value != 0 || 'Chọn Loại thân xe'
                            })}>
                                {functions.dataBodyType.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_body_type && (
                                <span className="error-text">{errors.product_body_type.message}</span>
                            )}
                        </div>
                    </div>

                    {/* số chỗ + số cửa */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Số chỗ <span className='cl_red'>*</span></label>
                            <select {...register('product_seats', {
                                required: 'Vui lòng chọn số chỗ',
                                validate: (value) =>
                                    value != 0 || 'Chọn số chỗ'
                            })}>
                                {functions.dataSeats.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_seats && (
                                <span className="error-text">{errors.product_seats.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Số cửa <span className='cl_red'>*</span></label>
                            <select {...register('product_doors', {
                                required: 'Vui lòng chọn số cửa',
                                validate: (value) =>
                                    value != 0 || 'Chọn số cửa'
                            })}>
                                {functions.dataDoors.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_doors && (
                                <span className="error-text">{errors.product_doors.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Túi khí + tính năng an toàn */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Số túi khí</label>
                            <select {...register('product_airbags')}>
                                {functions.dataAirbags.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_airbags && (
                                <span className="error-text">{errors.product_airbags.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Tính năng an toàn</label>
                            <select {...register('product_safety_features')}>
                                {functions.dataSafetyFeatures.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_safety_features && (
                                <span className="error-text">{errors.product_safety_features.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Giải trí */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Hệ thống giải trí</label>
                            <select {...register('product_infotainment')}>
                                {functions.dataInfotainment.map((item, index) => (
                                    <option key={index} value={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.product_infotainment && (
                                <span className="error-text">{errors.product_infotainment.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Đỗ xe + hành trình */}
                    <div className="form-column">
                        <div className="form-group">
                            <label>Hỗ trợ đỗ <span className='cl_red'>*</span></label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_parking_assist', {
                                            required: 'Vui lòng chọn hỗ trợ đỗ'
                                        })}
                                        value="1" />
                                    Không
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_parking_assist')}
                                        value="2" />
                                    Có
                                </label>
                            </div>
                            {errors.product_parking_assist && (
                                <span className="error-text">{errors.product_parking_assist.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Kiểm soát hành trình <span className='cl_red'>*</span></label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_cruise_control', {
                                            required: 'Vui lòng chọn kiểm soát hành trình'
                                        })}
                                        value="1" />
                                    Không
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_cruise_control')}
                                        value="2" />
                                    Có
                                </label>
                            </div>
                            {errors.product_cruise_control && (
                                <span className="error-text">{errors.product_cruise_control.message}</span>
                            )}
                        </div>
                    </div>

                    {/* tình trạng xe */}
                    <div className="form-column">
                        <div className="form-group">
                            <label>Tình trạng xe <span className='cl_red'>*</span></label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_newold', {
                                            required: 'Vui lòng chọn tình trạng xe'
                                        })}
                                        onChange={handleChangeOldNew}
                                        value="1" />
                                    Mới
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_newold')}
                                        onChange={handleChangeOldNew}
                                        value="2" />
                                    Cũ
                                </label>
                            </div>
                            {errors.product_newold && (
                                <span className="error-text">{errors.product_newold.message}</span>
                            )}
                        </div>

                        {showMileage &&
                            (
                                <div className="form-group form-product-mileage">
                                    <label>Số km đã đi <span className='cl_red'>*</span></label>
                                    <input
                                        placeholder='Nhập số km đã đi'
                                        type="text"
                                        {...register('product_mileage', {
                                            required: 'Vui lòng nhập số km đã đi',
                                        })} />
                                    {errors.product_mileage && (
                                        <span className="error-text">{errors.product_mileage.message}</span>
                                    )}
                                </div>
                            )
                        }
                    </div>

                    {/* Vận chuyển */}
                    <div className="form-column">
                        <div className="form-group">
                            <label>Vận chuyển <span className='cl_red'>*</span></label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_ship', {
                                            required: 'Vui lòng chọn vận chuyển'
                                        })}
                                        onChange={handleChangeShip}
                                        value="1" />
                                    Miễn phí vận chuyển
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        {...register('product_ship')}
                                        onChange={handleChangeShip}
                                        value="2" />
                                    Phí vận chuyển
                                </label>
                            </div>
                            {errors.product_ship && (
                                <span className="error-text">{errors.product_ship.message}</span>
                            )}
                        </div>

                        {showFeeship &&
                            (
                                <div className="form-group form-product-mileage">
                                    <label>Phí vận chuyển <span className='cl_red'>*</span></label>
                                    <input
                                        placeholder='Nhập phí vận chuyển'
                                        type="text"
                                        {...register('product_feeship', {
                                            required: 'Vui lòng nhập phí vận chuyển',
                                        })} />
                                    {errors.product_feeship && (
                                        <span className="error-text">{errors.product_feeship.message}</span>
                                    )}
                                </div>
                            )
                        }

                    </div>

                    {/* Phân loại sản phẩm */}
                    <div className="form-column boxVariant">
                        <div className='frameVariant'>
                            <div className="form-group">
                                <label>Màu sắc <span className='cl_red'>*</span></label>
                                {/* {...register('product_color')} */}
                                <select id='product_color'>
                                    {functions.dataColor.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Số lượng kho <span className='cl_red'>*</span></label>
                                    {/* {...register('product_stock')} */}
                                    <input min={1} placeholder='Nhập số lượng kho' type="number" id='product_stock' />
                                </div>
                                <div className="form-group">
                                    <label>Giá sản phẩm <span className='cl_red'>*</span></label>
                                    {/* {...register('product_price')} */}
                                    <input min={1} placeholder='Nhập giá sản phẩm' type="text" id='product_price' />
                                </div>
                            </div>
                        </div>
                        <button type='button' className="add_variant" onClick={handleSaveProductType}>
                            <img src={icons_plus_file} width="18px" height="18px" alt="icon" />
                            <span className="font_s13 font_w500 line_h16 mt_5">Lưu loại sản phẩm</span>
                        </button>
                    </div>

                    {/* show phân loại sản phẩm */}
                    {variants.length > 0 && (
                        <div className="form-column showVariant">
                            <p className="showVariant_title">Bảng phân loại</p>
                            <div className="showVariant_header">
                                <div className="showVariant_header_type">Loại</div>
                                <div className="showVariant_header_quantity">
                                    <p className="showVariant_header_quantity_title">
                                        Số lượng kho <span className="required">*</span>
                                    </p>
                                </div>
                                <div className="showVariant_header_price">
                                    <p className="showVariant_header_price_title">
                                        Giá bán <span className="required">*</span>
                                    </p>
                                </div>
                                <div className="showVariant_header_delete">Xóa</div>
                            </div>

                            <div className="showVariant_container">
                                {variants.map((variant, index) => (
                                    <div key={index} className="showVariant_item">
                                        <div className="showVariant_item_type">{variant.product_color}</div>
                                        <div className="showVariant_item_quantity">
                                            <input
                                                type="number"
                                                min="0"
                                                name="quantity"
                                                placeholder="Nhập"
                                                className="showVariant_item_quantity_input"
                                                value={variant.product_stock}
                                                onChange={(e) => handleChange(index, "product_stock", e.target.value)}
                                            />
                                        </div>
                                        <div className="showVariant_item_price">
                                            <div className="showVariant_item_price_input">
                                                <input
                                                    type="text"
                                                    name="price"
                                                    className="showVariant_item_price_value"
                                                    placeholder="Giá"
                                                    value={variant.product_price}
                                                    onChange={(e) => handleChange(index, "product_price", e.target.value)}
                                                    autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="showVariant_item_delete">
                                            <img
                                                src={icon_delete}
                                                className="showVariant_item_delete_icon cursor_pt"
                                                onClick={() => handleDeleteVariant(index)}
                                                alt="delete" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ảnh video sản phẩm */}
                    <div className="form-row boxSaveImgVideo">
                        <div className="form-group">
                            <label>Ảnh / Video <span className='cl_red'>*</span></label>
                            <label htmlFor="product_images" className="label_u_video">
                                <p className="saveImgVideo cursor_pt">
                                    <img src={upload_img} className="img_saveImgVideo" alt="icon" />
                                    Tải ảnh hoặc video (Tối đa 10 ảnh và 1 video)
                                </p>
                                <input type="file" id="product_images" hidden name="product_images" onChange={loadVideo} placeholder="Tải lên video" />
                            </label>
                            {files.length > 0 && (
                                <div className="list_imgvideo">
                                    <div className="box_listimgvideo">
                                        <div className="frame_imgvideo">
                                            {files.map((fileData, index) => (
                                                <div key={index} className="box_img_video" data-video={fileData.type === 'video' ? '1' : '0'} data-img={fileData.type === 'image' ? '1' : '0'}>
                                                    {fileData.type === 'video' ? (
                                                        <video src={URL.createObjectURL(fileData.file)} controls className="imgvideo_preview" />
                                                    ) : (
                                                        <img src={URL.createObjectURL(fileData.file)} className="imgvideo_preview" />
                                                    )}
                                                    <img src="/src/assets/images/admin/xoaanh.svg" className="icon_delete" onClick={() => icon_delete_img(index)} alt="delete" />
                                                </div>
                                            ))}
                                        </div>
                                        <label htmlFor="product_images" className="icon_addimgvideo">
                                            <p className="add_picture">
                                                <img src={icons_plus_file} width="18px" height="18px" alt="icon" />
                                                <span className="font_s13 font_w500 line_h16 mt_5">Thêm ảnh/video</span>
                                            </p>
                                        </label>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    {/* Danh mục */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Danh mục <span className='cl_red'>*</span></label>
                            <select {...register('category', {
                                required: 'Vui lòng chọn danh mục',
                                validate: (value) => value != 0 || 'Chọn danh mục'
                            })}
                                onChange={handleChangeCategory}>
                                <option key='0' value='0'>Chọn danh mục</option>
                                {getCategory.map((item, index) => (
                                    <option key={item.cat_id} value={item.cat_id}>
                                        {item.cat_name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <span className="error-text">{errors.category.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Chi tiết danh mục <span className='cl_red'>*</span></label>
                            <select {...register('category_code', {
                                required: 'Vui lòng chọn chi tiết danh mục',
                                validate: (value) =>
                                    value != 0 || 'Chọn chi tiết danh mục'
                            })}>
                                <option key='0' value='0'>Chọn chi tiết danh mục</option>
                                {getCategoryDetail.map((item, index) => (
                                    <option key={item.cat_id} value={item.cat_id}>
                                        {item.cat_name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_code && (
                                <span className="error-text">{errors.category_code.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddProducts;