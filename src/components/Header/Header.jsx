import { useState, useEffect } from 'react';
import HeaderPC from './HeaderPC';
import HeaderMB from './HeaderMB';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { tree } from '../../redux/features/category/categoriesSlice';
function Header() {
    const onOpenUserInfo = () => {
        // Logic for opening the mobile navigation
    };
    // Gọi đến createAsyncThunk tên là tree và gửi request đến CategoryService.getDataCategoryTree();
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(tree());
    }, [dispatch]);
    const isLogin = false;
    return (
        <>
            <div className="header">
                <HeaderPC dataCategory={category} />
                <HeaderMB onOpenUserInfo={onOpenUserInfo} isLogin={isLogin} />
            </div>
        </>
    );
}

export default Header;
