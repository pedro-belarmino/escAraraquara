import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateWrapper() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FF654D] border-t-transparent"></div>
                <p className="rubik text-gray-600 font-medium">Verificando sua sessão...</p>
            </div>
        )
    }

    if (!user) {
        // Guarda a rota pretendida para voltar a ela depois do login.
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    return <Outlet />
}
