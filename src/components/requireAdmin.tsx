import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAdmin() {
    const {isLoggedIn, user, isAuthLoading} = useAuth();

    if (isAuthLoading) {
        return null;
    }

    if (!isLoggedIn || user?.role !== "admin"){
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>;
}
export default RequireAdmin;