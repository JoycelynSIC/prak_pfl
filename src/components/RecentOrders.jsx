export default function RecentOrders() {
    const orders = [
        { id: "#ORD-00123", 
            name: "Widya Agustina", 
            menu: "Nasi Goreng Spesial", 
            total: "Rp. 25.000", 
            status: "On Progress", 
            color: "text-blue-600 bg-blue-50", 
            dot: "bg-blue-500", 
            img: "https://avatar.iran.liara.run/public/65" },
        { id: "#ORD-00124", 
            name: "Kiandra Utami", 
            menu: "Ayam Bakar Madu", 
            total: "Rp. 35.000", 
            status: "On Progress", 
            color: "text-blue-600 bg-blue-50", 
            dot: "bg-blue-500", 
            img: "https://avatar.iran.liara.run/public/28" },
        { id: "#ORD-00125", 
            name: "Intan Rahayu", 
            menu: "Es Teh Manis", 
            total: "Rp. 15.000", 
            status: "On Progress", 
            color: "text-blue-600 bg-blue-50", 
            dot: "bg-blue-500", 
            img: "https://avatar.iran.liara.run/public/12" },
    ];

    return (
        <div className="mt-6 h-full">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 h-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="font-poppins font-black text-gray-800 text-2xl tracking-tight">Recent Orders</h3>
                        <p className="text-sm text-gray-400 font-medium">Monitoring 3 active transactions</p>
                    </div>
                    <button className="bg-hijau/10 text-hijau px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-hijau hover:text-white transition-all duration-300 shadow-sm border border-hijau/20">
                        View All
                    </button>
                </div>
                
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-black">
                                <th className="px-6 py-2">Customer Info</th>
                                <th className="px-6 py-2">Order Detail</th>
                                <th className="px-6 py-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className="group cursor-default">
                                    <td className="bg-gray-50/80 px-6 py-5 rounded-l-[2rem] border-y border-l border-white shadow-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img src={order.img} className="w-12 h-12 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-gray-800 leading-tight">{order.name}</span>
                                                <span className="text-xs text-gray-400 font-bold">{order.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="bg-gray-50/80 px-6 py-5 border-y border-white shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-500 mb-0.5">{order.menu}</span>
                                            <span className="text-lg font-black text-gray-900 tracking-tight">{order.total}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="bg-gray-50/80 px-6 py-5 rounded-r-[2rem] border-y border-r border-white shadow-sm">
                                        <div className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest ${order.color} shadow-inner`}>
                                            <span className={`w-2 h-2 rounded-full ${order.dot} animate-pulse`}></span>
                                            <span>{order.status}</span>
                                        </div>
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