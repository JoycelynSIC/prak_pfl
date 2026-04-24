import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrders";
import DeliveryTracker from "../components/DeliveryTracker";

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); 
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 11) return { text: "Selamat Pagi", icon: "🌅" };
    if (hour < 15) return { text: "Selamat Siang", icon: "☀️" };
    if (hour < 19) return { text: "Selamat Sore", icon: "🌆" };
    return { text: "Selamat Malam", icon: "🌙" };
  };

  const greeting = getGreeting();
  const stats = [
    { label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
    { label: "Delivered", value: "175", icon: <FaTruck />, color: "bg-[#99AD7A]", shadow: "shadow-[#99AD7A]/20", textColor: "text-[#FFF8EC]" },
    { label: "Canceled", value: "40", icon: <FaBan />, color: "bg-[#DCCCAC]", shadow: "shadow-[#DCCCAC]/20", textColor: "text-[#546B41]" },
    { label: "Revenue", value: "Rp.128", icon: <FaDollarSign />, color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
  ];

  return (
    <div id="dashboard-container" className="min-h-screen bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader 
          title={`${greeting.text} ${greeting.icon}`} 
          breadcrumb={["Joycelyn Dhealiva", "Admin Mode"]}
        >
          <div className="flex flex-col items-end bg-white px-5 py-2.5 rounded-2xl border border-[#DCCCAC]/40 shadow-sm transition-all duration-700">
            <p className="text-[9px] font-black text-[#DCCCAC] uppercase tracking-[0.2em] mb-0.5">Live Time</p>
            <p className="text-lg font-black text-[#546B41] tabular-nums leading-none">
              {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
        </PageHeader>
      </div>

      {/* Stats Cards dengan Staggered Animation */}
      <div id="dashboard-grid" className="px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-2">
        {stats.map((item, i) => (
          <div 
            key={i}
            style={{ 
              transitionDelay: `${i * 100}ms`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.9) translateY(10px)'
            }}
            className="flex items-center space-x-5 bg-white rounded-[2rem] shadow-sm border-2 border-transparent hover:border-[#DCCCAC]/50 transition-all duration-500 p-5 group cursor-default"
          >
            <div className={`${item.color} rounded-2xl p-4 shadow-lg ${item.shadow} group-hover:rotate-6 transition-transform duration-300`}>
              {React.cloneElement(item.icon, { className: `text-xl ${item.textColor}` })}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#546B41] tracking-tight">{item.value}</span>
              <span className="text-[#99AD7A] text-[10px] font-black uppercase tracking-wider">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Content dengan Fade In Slide Up */}
      <div 
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 400ms' // Delay 400ms nunggu kartu selesai
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-10 mt-8 items-start"
      >
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-2 shadow-sm border border-[#DCCCAC]/30 hover:shadow-md transition-shadow">
          <RecentOrders />
        </div>
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-2 shadow-sm border border-[#DCCCAC]/30 hover:shadow-md transition-shadow">
          <DeliveryTracker />
        </div>
      </div>
    </div>
  );
}