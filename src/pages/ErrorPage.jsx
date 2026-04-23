import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaLock, FaUserShield, FaRadiationAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function ErrorPage({ code, title, description }) {
  const navigate = useNavigate();

  const getErrorTheme = () => {
    switch (code) {
      case "401":
        return { color: "text-orange-500", bgColor: "bg-orange-500", icon: <FaLock /> };
      case "403":
        return { color: "text-red-600", bgColor: "bg-red-600", icon: <FaUserShield /> };
      case "400":
        return { color: "text-amber-500", bgColor: "bg-amber-500", icon: <FaRadiationAlt /> };
      default:
        return { color: "text-[#00B074]", bgColor: "bg-[#00B074]", icon: <FaExclamationTriangle /> };
    }
  };

  const theme = getErrorTheme();

  return (
    <div className="h-full pb-20 overflow-hidden relative">
      <PageHeader title={`Error ${code}`} breadcrumb={["System", "Error"]} />

      <div className={`absolute top-[-10%] left-[-5%] w-[30rem] h-[30rem] ${theme.bgColor} opacity-[0.03] rounded-full blur-[100px]`}></div>
      <div className={`absolute bottom-[-10%] right-[-5%] w-[25rem] h-[25rem] ${theme.bgColor} opacity-[0.05] rounded-full blur-[80px]`}></div>

      <div className="relative z-10 flex flex-col items-center justify-center mt-20 px-6">
        <div className="relative mb-12">
          <div className={`absolute inset-0 ${theme.bgColor} opacity-20 rounded-full animate-ping scale-75`}></div>
          <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className={`${theme.color} text-8xl`}>{theme.icon}</div>
            <div className="absolute -top-4 -right-6 bg-[#2D2D2D] text-white px-5 py-2 rounded-2xl font-black text-xl shadow-xl rotate-12">
              {code}
            </div>
          </div>
        </div>

        <div className="text-center max-w-lg">
          <h1 className="text-5xl font-black text-[#2D2D2D] mb-4 tracking-tight leading-tight">{title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium px-4">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-3 bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800 font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto shadow-sm">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali
          </button>
          <button onClick={() => navigate("/")} className="group flex items-center gap-3 bg-[#00B074] hover:bg-[#009663] text-white font-bold py-3.5 px-10 rounded-2xl transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(0,176,116,0.4)] hover:-translate-y-1 w-full sm:w-auto justify-center">
            <FaHome /> Ke Dashboard Utama
          </button>
        </div>
      </div>
    </div>
  );
}