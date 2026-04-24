import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaLock, FaUserShield, FaRadiationAlt, FaHome, FaArrowLeft } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function ErrorPage({ code, title, description }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getErrorTheme = () => {
    switch (code) {
      case "401":
        return { color: "text-[#DCCCAC]", bgColor: "bg-[#99AD7A]", icon: <FaLock /> };
      case "403":
        return { color: "text-red-700", bgColor: "bg-[#99AD7A]", icon: <FaUserShield /> };
      case "400":
        return { color: "text-[#99AD7A]", bgColor: "bg-[#99AD7A]", icon: <FaRadiationAlt /> };
      default:
        return { color: "text-[#546B41]", bgColor: "bg-[#99AD7A]", icon: <FaExclamationTriangle /> };
    }
  };

  const theme = getErrorTheme();

  return (
    <div className="h-full relative bg-[#FFF8EC] overflow-hidden">
      <div className="px-10">
        <PageHeader title={`Error ${code}`} breadcrumb={["System", "Error"]} />
      </div>
      
      <div className={`absolute top-[-10%] left-[-5%] w-[30rem] h-[30rem] ${theme.bgColor} opacity-[0.03] rounded-full blur-[100px] pointer-events-none`}></div>
      <div className={`absolute bottom-[-10%] right-[-5%] w-[25rem] h-[25rem] ${theme.bgColor} opacity-[0.05] rounded-full blur-[80px] pointer-events-none`}></div>

      <div 
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s ease-out'
        }}
        className="relative z-10 flex flex-col items-center justify-center mt-10 px-6"
      >
        <div className="relative mb-8">
          <div className={`absolute inset-0 ${theme.bgColor} opacity-20 rounded-full animate-ping scale-75`}></div>
          <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl shadow-[#DCCCAC]/20 border border-[#DCCCAC]/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className={`${theme.color} text-8xl`}>{theme.icon}</div>
            <div className="absolute -top-4 -right-6 bg-[#546B41] text-[#FFF8EC] px-5 py-2 rounded-2xl font-black text-xl shadow-xl rotate-12 border-2 border-[#FFF8EC]">
              {code}
            </div>
          </div>
        </div>

        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-black text-[#546B41] mb-2 tracking-tight leading-tight uppercase">
            {title}
          </h1>
          <p className="text-[#99AD7A] text-base leading-relaxed mb-8 font-bold px-4">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 bg-white border-2 border-[#DCCCAC] text-[#546B41] hover:border-[#546B41] font-black py-3.5 px-8 rounded-2xl transition-all duration-300 w-full sm:w-auto shadow-sm uppercase text-xs tracking-widest active:scale-95"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Kembali
          </button>

          <button 
            onClick={() => navigate("/")} 
            className="group flex items-center gap-3 bg-[#546B41] hover:bg-[#435634] text-[#FFF8EC] font-black py-3.5 px-10 rounded-2xl transition-all duration-300 shadow-lg hover:-translate-y-1 w-full sm:w-auto justify-center uppercase text-xs tracking-widest active:scale-95"
          >
            <FaHome /> 
            Ke Dashboard Utama
          </button>
        </div>

        <p className="mt-12 text-[10px] text-[#DCCCAC] font-black uppercase tracking-[0.2em]">
          System Error Protocol • Sedap Dashboard
        </p>
      </div>
    </div>
  );
}