import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Router giúp toàn bộ ứng dụng sử dụng React Router.
// Routes nhóm tất cả Route lại với nhau.
// Import router
import AppRouter from "../routes/AppRouter";
import AdminRouter from "../routes/AdminRouter";
// Check đăng nhập
// Tạm thời bỏ thay bằng redux
// import { AuthProvider } from "../../contexts/AuthContext";

const App = () => {
    return (
        // <AuthProvider>
            <Router>
                <Routes>
                    {/* Routes cho User */}
                    <Route path="/*" element={<AppRouter />} />

                    {/* Routes cho Admin */}
                    <Route path="/admin/*" element={<AdminRouter />} />
                </Routes>
            </Router>
        // </AuthProvider>
    );
};

// Xuất App để sử dụng trong App.jsx.
export default App;
