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
        <div className="mt-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 h-full">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-poppins font-black text-gray-800 text-xl tracking-tighter">Live Delivery Tracker</h3>
                    <span className="animate-pulse flex items-center gap-2 text-[10px] font-black text-hijau bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 bg-hijau rounded-full"></div> LIVE
                    </span>
                </div>

                <div className="space-y-8">
                    {deliveries.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between mb-2 items-end">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-900 rounded-lg text-white"><FaMotorcycle size={14}/></div>
                                    <span className="font-bold text-sm text-gray-700">
                                        {item.driver} <span className="text-gray-300 font-medium ml-1">({item.id})</span>
                                    </span>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.eta} lagi</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r from-hijau to-emerald-300 rounded-full ${item.progress} shadow-[0_0_10px_rgba(74,222,128,0.3)] transition-all duration-1000`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}