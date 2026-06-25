import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { PrivateRoute, RoleRoute } from "./components/RouteGuard";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import "./assets/tailwind.css";

// Lazy-loaded pages
const MainLayout   = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard    = React.lazy(() => import("./pages/Dashboard"));
const Customer     = React.lazy(() => import("./pages/Customer"));
const Order        = React.lazy(() => import("./pages/Order"));
const Product      = React.lazy(() => import("./pages/Product"));
const ProductDetail= React.lazy(() => import("./pages/ProductDetail"));
const NotFound     = React.lazy(() => import("./pages/NotFound"));
const ErrorPage    = React.lazy(() => import("./pages/ErrorPage"));
const Register     = React.lazy(() => import("./pages/auth/Register"));
const Forgot       = React.lazy(() => import("./pages/auth/Forgot"));
const Login        = React.lazy(() => import("./pages/auth/Login"));
const FiturXYZ     = React.lazy(() => import("./pages/FiturXYZ"));
const Notes        = React.lazy(() => import("./pages/Notes"));
const Components   = React.lazy(() => import("./pages/Components"));

/** Redirect user yang sudah login agar tidak bisa masuk ke /login atau /register */
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ── Auth routes (hanya untuk yang belum login) ── */}
        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        {/* ── Protected routes (harus login) ── */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>

            {/* Bisa diakses semua role yang sudah login */}
            <Route path="/"             element={<Dashboard />} />
            <Route path="products"      element={<Product />} />
            <Route path="products/:id"  element={<ProductDetail />} />
            <Route path="orders"        element={<Order />} />
            <Route path="components"    element={<Components />} />
            <Route path="fiturxyz"      element={<FiturXYZ />} />
            <Route path="notes"         element={<Notes />} />

            {/* Khusus admin */}
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="customers" element={<Customer />} />
            </Route>

            {/* Error pages */}
            <Route path="error-400" element={<ErrorPage code="400" title="Bad Request"  description="Permintaan tidak dapat diproses oleh server." />} />
            <Route path="error-401" element={<ErrorPage code="401" title="Unauthorized" description="Anda harus login terlebih dahulu." />} />
            <Route path="error-403" element={<ErrorPage code="403" title="Forbidden"    description="Anda tidak punya akses ke halaman ini." />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
