import React from "react";
import { FaMotorcycle } from "react-icons/fa";

export default function DeliveryTracker() {
    const deliveries = [
        { id: "TRX-992", 
            driver: "Bang Jago", 
            status: "OTW", 
            progress: "w-[70%]", 
            eta: "5 Menit" },
        { id: "TRX-995", 
            driver: "Sultan", 
            status: "Pick Up", 
            progress: "w-[30%]", 
            eta: "12 Menit" },
        { id: "TRX-998", 
            driver: "Andi Saputra", 
            status: "On Progress", 
            progress: "w-[55%]", 
            eta: "8 Menit" } 
    ];

    return (
        <div className="h-full">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-[#DCCCAC]/10 border border-[#DCCCAC]/20 h-full">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="font-poppins font-black text-[#546B41] text-xl tracking-tighter">Live Delivery Tracker</h3>
                    <span className="animate-pulse flex items-center gap-2 text-[10px] font-black text-[#546B41] bg-[#FFF8EC] px-3 py-1.5 rounded-full border border-[#DCCCAC]/30 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-[#546B41] rounded-full"></div> LIVE
                    </span>
                </div>

                <div className="space-y-10">
                    {deliveries.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between mb-3 items-end">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-[#546B41] rounded-xl text-[#FFF8EC] shadow-md shadow-[#546B41]/20">
                                        <FaMotorcycle size={16}/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-sm text-[#546B41]">
                                            {item.driver}
                                        </span>
                                        <span className="text-[10px] font-bold text-[#DCCCAC] uppercase tracking-tighter">
                                            {item.id}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-[#99AD7A] bg-[#FFF8EC] px-2 py-1 rounded-md border border-[#DCCCAC]/20 uppercase tracking-widest">
                                    {item.eta}
                                </span>
                            </div>
                            
                            {/* Progress Bar Container */}
                            <div className="w-full h-3 bg-[#FFF8EC] rounded-full border border-[#DCCCAC]/10 overflow-hidden shadow-inner">
                                <div 
                                    className={`h-full bg-gradient-to-r from-[#546B41] to-[#99AD7A] rounded-full ${item.progress} transition-all duration-1000 shadow-[0_0_12px_rgba(84,107,65,0.2)]`}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}