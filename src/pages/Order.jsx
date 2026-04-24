import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaPlus, FaTimes, FaEllipsisV, FaCircle } from "react-icons/fa";
import orderData from "../data/orders.json";

export default function Order() {
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader title="Order List" breadcrumb={["Dashboard", "Orders"]}>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${
              showForm 
                ? "bg-[#DCCCAC] text-[#546B41]" 
                : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] hover:-translate-y-1 active:scale-95"
            }`}
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            {showForm ? "Cancel" : "Add Order"}
          </button>
        </PageHeader>
      </div>

      <div className="px-10 mt-2">
        {showForm && (
            <div className="bg-white p-8 rounded-3xl shadow-xl mb-8 border border-[#DCCCAC]/30 transition-all duration-500 ease-out transform opacity-100 translate-y-0">
              <h3 className="text-lg font-black text-[#546B41] mb-6 border-l-4 border-[#99AD7A] pl-4 uppercase tracking-tight">Add New Order</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Order ID</label>
                  <input className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="ORD-XXX" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Customer Name</label>
                  <input className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="Full Name" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Status</label>
                  <div className="relative">
                    <select className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] appearance-none font-bold cursor-pointer">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#99AD7A]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Total Price</label>
                  <input type="number" className="w-full bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold" placeholder="0" />
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-[#99AD7A] text-[#FFF8EC] font-black py-3 rounded-xl shadow-lg hover:bg-[#546B41] transition-all uppercase text-xs tracking-widest active:scale-95">
                    Save Order
                  </button>
                </div>
              </div>
            </div>
          )}
        <div style={{ 
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-out"
          }}
          className="bg-white rounded-[2.5rem] shadow-sm border border-[#DCCCAC]/20 overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FFF8EC]/50 border-b border-[#DCCCAC]/20">
                  <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Order ID</th>
                  <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Customer Name</th>
                  <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Total Price</th>
                  <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Date</th>
                  <th className="px-8 py-6 text-center font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFF8EC]">
                {orderData.map((order, i) => (
                  <tr 
                    key={order.id} 
                    style={{ 
                      transitionDelay: `${i * 40}ms`,
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)'
                    }}
                    className="hover:bg-[#FFF8EC]/40 transition-all duration-500 ease-out group"
                  >
                    <td className="px-8 py-5 font-black text-[#546B41] text-sm group-hover:translate-x-1 transition-transform">{order.id}</td>
                    <td className="px-8 py-5 font-bold text-[#546B41] text-sm">{order.name}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm ${
                        order.status === "Completed" ? "bg-[#546B41] text-[#FFF8EC]" : 
                        order.status === "Pending" ? "bg-[#DCCCAC] text-[#546B41]" : "bg-red-500 text-white"
                      }`}>
                        <FaCircle className="text-[5px]" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-sm text-[#546B41]">
                      Rp {order.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-8 py-5 text-[#99AD7A] font-bold text-xs uppercase tracking-wider">{order.date}</td>
                    <td className="px-8 py-5 text-center">
                      <button className="p-2 text-[#DCCCAC] hover:text-[#546B41] hover:scale-125 transition-all">
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}