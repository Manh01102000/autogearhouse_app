// Component gốc của ứng dụng
import RootRouter from "./configs/routes";
// Lấy các dữ liệu tĩnh khi vừa khởi app
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { brand } from "./redux/features/initAppData/initAppDataSlice";
// 
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(brand());
  }, [dispatch]);

  return <RootRouter />;
};

export default App;
