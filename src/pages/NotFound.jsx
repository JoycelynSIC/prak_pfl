import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div id="dashboard-container" className="bg-[#F8FAFC] min-h-screen pb-20 overflow-hidden relative">
            {/* Header tetap di atas */}
            <PageHeader />

            {/* Dekorasi Background Bulatan Halus */}
            <div className="absolute top-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-[#00B074] opacity-[0.03] rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[25rem] h-[25rem] bg-[#00B074] opacity-[0.05] rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex flex-col items-center justify-center mt-24 px-6">
                
                {/* Bagian Visual */}
                <div className="relative mb-12">
                    {/* Ring Animasi di Belakang Ikon */}
                    <div className="absolute inset-0 bg-[#00B074] opacity-20 rounded-full animate-ping scale-75"></div>
                    
                    <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <FaExclamationTriangle className="text-[#00B074] text-8xl" />
                        
                        {/* Label Floating 404 */}
                        <div className="absolute -top-4 -right-6 bg-[#2D2D2D] text-white px-5 py-2 rounded-2xl font-black text-xl shadow-xl rotate-12">
                            404
                        </div>
                    </div>
                </div>

                {/* Teks Deskripsi */}
                <div className="text-center max-w-lg">
                    <h1 className="text-5xl font-black text-[#2D2D2D] mb-4 tracking-tight">
                        Waduh, Kesasar Ya?
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10">
                        Halaman yang kamu cari tidak ditemukan atau mungkin sudah dipindahkan. 
                        Tenang, tim kami sedang merapikan dapurnya!
                    </p>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 bg-white border-2 border-gray-200 text-gray-600 hover:border-[#00B074] hover:text-[#00B074] font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-3 bg-[#00B074] hover:bg-[#009663] text-white font-bold py-3.5 px-10 rounded-2xl transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(0,176,116,0.4)] hover:-translate-y-1 w-full sm:w-auto justify-center"
                    >
                        <FaHome />
                        Ke Dashboard Utama
                    </button>
                </div>

                {/* Link bantuan opsional di bawah */}
                <p className="mt-12 text-sm text-gray-400">
                    Butuh bantuan? <span className="text-[#00B074] cursor-pointer hover:underline font-medium">Hubungi Admin</span>
                </p>
            </div>
        </div>
    );
}