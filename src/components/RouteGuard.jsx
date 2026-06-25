import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

/**
 * PrivateRoute: Hanya mengizinkan user yang sudah login.
 * Jika belum login, redirect ke /login.
 * Jika loading (cek sesi), tampilkan Loading screen.
 */
export function PrivateRoute() {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
}

/**
 * RoleRoute: Hanya mengizinkan user dengan role tertentu.
 * Jika role tidak sesuai, redirect ke /error-403.
 * @param {string[]} allowedRoles - Array role yang diizinkan, misal: ["admin"]
 */
export function RoleRoute({ allowedRoles }) {
    const { profile, loading } = useAuth();

    if (loading) return <Loading />;
    if (!profile || !allowedRoles.includes(profile.role)) {
        return <Navigate to="/error-403" replace />;
    }

    return <Outlet />;
}
