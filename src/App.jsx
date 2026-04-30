import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
import AuthLayout from "./layouts/AuthLayout";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customer = React.lazy(() => import("./pages/Customer"));
const Order = React.lazy(() => import("./pages/Order"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Header = React.lazy(() => import("./components/Header"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));
import "./assets/tailwind.css";
import Loading from "./components/Loading"; 

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="orders" element={<Order />} />
          <Route path="customers" element={<Customer />} />
          
          <Route path="error-400" element={<ErrorPage code="400" title="Bad Request" description="Permintaan tidak dapat diproses oleh server." />} />
          <Route path="error-401" element={<ErrorPage code="401" title="Unauthorized" description="Anda harus login terlebih dahulu." />} />
          <Route path="error-403" element={<ErrorPage code="403" title="Forbidden" description="Anda tidak punya akses ke halaman ini." />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
export default App;