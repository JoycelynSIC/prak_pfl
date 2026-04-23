import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaPlus, FaTimes, FaSearch, FaFilter, FaEllipsisV } from "react-icons/fa";

const orderData = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-0${i + 1}`,
  name: ["Andi Herlambang", "Siti Aminah", "Budi Doremi", "Dewi Sartika"][i % 4],
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  price: Math.floor(Math.random() * 500000) + 50000,
  date: `2026-04-${(i % 28) + 1}`
}));

export default function Order() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen">
      <PageHeader title="Order List" breadcrumb={["Dashboard", "Orders"]}>
        <button 
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${
            showForm ? "bg-red-500 text-white" : "bg-[#00B074] text-white hover:-translate-y-1"
          }`}
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Cancel" : "Add Orders"}
        </button>
      </PageHeader>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-gray-100 animate-in fade-in zoom-in duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Order</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Order ID</label>
              <input className="w-full bg-gray-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-[#00B074] outline-none" placeholder="ORD-XXX" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Customer Name</label>
              <input className="w-full bg-gray-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-[#00B074] outline-none" placeholder="Full Name" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
              <select className="w-full bg-gray-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-[#00B074] outline-none">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Total Price</label>
              <input type="number" className="w-full bg-gray-50 border-none p-3 rounded-xl focus:ring-2 focus:ring-[#00B074] outline-none" placeholder="0" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-[#00B074] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#009663] transition-all">
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">Order ID</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">Customer Name</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">Status</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">Total Price</th>
                <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase">Date</th>
                <th className="px-6 py-4 text-center text-gray-400 uppercase text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orderData.map((order) => (
                <tr key={order.id} className="hover:bg-emerald-50/30 transition-all">
                  <td className="px-6 py-4 font-bold text-[#00B074] text-sm">{order.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700 text-sm">{order.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      order.status === "Completed" ? "bg-green-100 text-green-600" : 
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-gray-800">Rp {order.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-gray-300 hover:text-[#00B074] transition-all"><FaEllipsisV /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}