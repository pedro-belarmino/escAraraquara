import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateWrapper() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (<>carregando private</>)
    }
    if (!user && location.pathname !== "/login") {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}