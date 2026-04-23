import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaPlus, FaTimes, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

const customerData = Array.from({ length: 30 }, (_, i) => ({
  id: `CST-2026-${i + 1}`,
  name: ["Roni", "Maya", "Zaky", "Tania"][i % 4] + " " + (i + 1),
  email: `user${i + 1}@sedap.com`,
  phone: `0812-3456-78${i}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3]
}));

export default function Customer() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
            showForm ? "bg-red-500 text-white" : "bg-[#00B074] text-white hover:-translate-y-1"
          }`}
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close" : "Add Customer"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-gray-100 animate-in slide-in-from-top duration-500">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#00B074] pl-4">Add New Customer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-400 uppercase">Customer ID</label>
              <input className="w-full bg-gray-50 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#00B074]" placeholder="CST-XXX" />
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-400 uppercase">Customer Name</label>
              <input className="w-full bg-gray-50 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#00B074]" placeholder="Full Name" />
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
              <input className="w-full bg-gray-50 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#00B074]" placeholder="mail@mail.com" />
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-400 uppercase">Phone</label>
              <input className="w-full bg-gray-50 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#00B074]" placeholder="08XXX" />
            </div>
            <div className="space-y-1"><label className="text-[10px] font-bold text-gray-400 uppercase">Loyalty</label>
              <select className="w-full bg-gray-50 p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#00B074]">
                <option>Bronze</option><option>Silver</option><option>Gold</option>
              </select>
            </div>
            <div className="lg:col-span-5 flex justify-end mt-2">
              <button className="bg-[#00B074] text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-[#009663]">Save Data</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerData.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-transparent hover:border-[#00B074] transition-all group">
            <div className="flex justify-between items-start mb-6">
              <FaUserCircle className="text-5xl text-gray-100 group-hover:text-emerald-50 transition-colors" />
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                c.loyalty === "Gold" ? "bg-yellow-100 text-yellow-600" : 
                c.loyalty === "Silver" ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-orange-600"
              }`}>{c.loyalty}</span>
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-1">{c.name}</h4>
            <p className="text-xs text-gray-300 font-bold mb-4 tracking-tighter">{c.id}</p>
            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium"><FaEnvelope className="text-[#00B074]" /> {c.email}</div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium"><FaPhone className="text-[#00B074]" /> {c.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}