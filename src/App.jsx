import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import "./assets/tailwind.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Customer from "./pages/Customer";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const location = useLocation();
  return (
    <div id="app-container" className="bg-[#FFF8EC] flex min-h-screen w-full items-stretch">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col min-w-0"> 
        <Header />
        <div 
          key={location.pathname} 
          className="flex-1 animate-in fade-in zoom-in-95 duration-500 ease-out">
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/error-400" element={<ErrorPage code="400" 
            title="Bad Request" description="Permintaan tidak dapat diproses oleh server." />} />
            <Route path="/error-401" element={<ErrorPage code="401" 
            title="Unauthorized" description="Anda harus login terlebih dahulu." />} />
            <Route path="/error-403" element={<ErrorPage code="403" 
            title="Forbidden" description="Anda tidak punya akses ke halaman ini." />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;