import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaPlus, FaTimes, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import customerData from "../data/customers.json";

export default function Customer() {
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${showForm ? "bg-[#DCCCAC] text-[#546B41]" : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] hover:-translate-y-1 active:scale-95"}`}
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            {showForm ? "Close" : "Add Customer"}
          </button>
        </PageHeader>
      </div>

      <div className="px-10 mt-2">
        {showForm && (
          <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-[#DCCCAC]/30 transition-all duration-500 ease-out transform opacity-100 translate-y-0">
            <h3 className="text-lg font-black text-[#546B41] mb-6 border-l-4 border-[#99AD7A] pl-4 uppercase tracking-tight">Add New Customer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Customer Name</label>
                <input className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="Full Name" />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Email Address</label>
                <input className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="email@example.com" />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Phone Number</label>
                <input className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="0812..." />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Loyalty Level</label>
                <div className="relative">
                  <select className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] appearance-none font-bold cursor-pointer">
                    <option>Bronze</option>
                    <option>Silver</option>
                    <option>Gold</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#99AD7A]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-[#99AD7A] text-[#FFF8EC] font-black py-3 rounded-xl shadow-lg hover:bg-[#546B41] transition-all uppercase text-xs tracking-widest active:scale-95">
                  Save Customer
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {customerData.map((c, i) => (
            <div 
              key={c.id} 
              style={{ 
                transitionDelay: `${i * 100}ms`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
              }}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-[#DCCCAC]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                    <FaUserCircle className="text-5xl text-[#DCCCAC] group-hover:text-[#99AD7A] transition-colors duration-500" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                </div>
                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-sm transition-all group-hover:rotate-6 ${c.loyalty === "Gold" ? "bg-[#546B41] text-[#FFF8EC]" : c.loyalty === "Silver" ? "bg-[#99AD7A] text-[#FFF8EC]" : "bg-[#DCCCAC] text-[#546B41]"}`}>
                  {c.loyalty}
                </span>
              </div>
              <h4 className="font-black text-[#546B41] text-lg mb-1 tracking-tight group-hover:text-[#99AD7A] transition-colors">{c.name}</h4>
              <p className="text-[10px] text-[#99AD7A] font-black mb-4 tracking-[0.15em] uppercase opacity-60">{c.id}</p>
              <div className="space-y-2 border-t border-[#FFF8EC] pt-4">
                <div className="flex items-center gap-3 text-xs text-[#546B41] font-bold hover:translate-x-1 transition-transform cursor-pointer">
                  <FaEnvelope className="text-[#99AD7A]" /> {c.email}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#546B41] font-bold hover:translate-x-1 transition-transform cursor-pointer">
                  <FaPhone className="text-[#99AD7A]" /> {c.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}