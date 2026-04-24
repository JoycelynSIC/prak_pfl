export default function RecentOrders() {
    const orders = [
        { id: "#ORD-00123", 
            name: "Widya Agustina", 
            menu: "Nasi Goreng Spesial", 
            total: "Rp. 25.000", 
            status: "On Progress", 
            color: "text-[#546B41] bg-[#FFF8EC]", 
            dot: "bg-[#546B41]", 
            img: "https://avatar.iran.liara.run/public/65" },
        { id: "#ORD-00124", 
            name: "Kiandra Utami", 
            menu: "Ayam Bakar Madu", 
            total: "Rp. 35.000", 
            status: "On Progress", 
            color: "text-[#546B41] bg-[#FFF8EC]", 
            dot: "bg-[#546B41]", 
            img: "https://avatar.iran.liara.run/public/28" },
        { id: "#ORD-00125", 
            name: "Intan Rahayu", 
            menu: "Es Teh Manis", 
            total: "Rp. 15.000", 
            status: "On Progress", 
            color: "text-[#546B41] bg-[#FFF8EC]", 
            dot: "bg-[#546B41]", 
            img: "https://avatar.iran.liara.run/public/12" },
    ];

    return (
        <div className="h-full">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#DCCCAC]/10 border border-[#DCCCAC]/20 h-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="font-poppins font-black text-[#546B41] text-2xl tracking-tight">Recent Orders</h3>
                        <p className="text-sm text-[#99AD7A] font-bold">Monitoring 3 active transactions</p>
                    </div>
                    <button className="bg-[#FFF8EC] text-[#546B41] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#546B41] hover:text-[#FFF8EC] transition-all duration-300 shadow-sm border border-[#DCCCAC]">
                        View All
                    </button>
                </div>
                
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-[#DCCCAC] text-[11px] uppercase tracking-[0.2em] font-black">
                                <th className="px-6 py-2">Customer Info</th>
                                <th className="px-6 py-2">Order Detail</th>
                                <th className="px-6 py-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className="group cursor-default">
                                    <td className="bg-[#FFF8EC]/50 px-6 py-5 rounded-l-[2rem] border-y border-l border-white shadow-sm transition-colors group-hover:bg-[#FFF8EC]">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img src={order.img} className="w-12 h-12 rounded-2xl object-cover shadow-md border-2 border-white group-hover:scale-110 transition-transform" />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <div className={`w-2.5 h-2.5 ${order.dot} rounded-full animate-pulse`}></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-[#546B41] leading-tight">{order.name}</span>
                                                <span className="text-xs text-[#99AD7A] font-black">{order.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="bg-[#FFF8EC]/50 px-6 py-5 border-y border-white shadow-sm transition-colors group-hover:bg-[#FFF8EC]">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wider font-black text-[#DCCCAC] mb-0.5">{order.menu}</span>
                                            <span className="text-lg font-black text-[#546B41] tracking-tight">{order.total}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="bg-[#FFF8EC]/50 px-6 py-5 rounded-r-[2rem] border-y border-r border-white shadow-sm transition-colors group-hover:bg-[#FFF8EC]">
                                        <div className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest ${order.color} border border-[#DCCCAC]/20 shadow-inner`}>
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