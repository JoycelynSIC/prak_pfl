import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { FaCircle, FaSpinner, FaShoppingCart, FaStar, FaReceipt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ordersService } from "../services/ordersService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const STATUS_CONFIG = {
    completed: { bg: "bg-emerald-100",  text: "text-emerald-700",  dot: "bg-emerald-500",  label: "Completed" },
    pending:   { bg: "bg-yellow-100",   text: "text-yellow-700",   dot: "bg-yellow-500",   label: "Pending"   },
    cancelled: { bg: "bg-red-100",      text: "text-red-600",      dot: "bg-red-500",       label: "Cancelled" },
};

const TIER_CONFIG = {
    platinum: { color: "bg-purple-600", text: "text-white" },
    gold:     { color: "bg-yellow-400", text: "text-yellow-900" },
    silver:   { color: "bg-gray-400",   text: "text-white" },
    bronze:   { color: "bg-[#DCCCAC]",  text: "text-[#546B41]" },
};

export default function Order() {
    const { profile } = useAuth();
    const isAdmin = profile?.role === "admin";

    const [orders, setOrders]       = useState([]);
    const [loading, setLoading]     = useState(true);
    const [isLoaded, setIsLoaded]   = useState(false);
    const [expandedId, setExpandedId] = useState(null); // untuk expand detail row

    const fetchOrders = useCallback(async () => {
        if (!profile) return;
        setLoading(true);
        try {
            const data = isAdmin
                ? await ordersService.getAll()
                : await ordersService.getMyOrders(profile.id);
            setOrders(data);
        } catch (err) {
            console.error("Gagal memuat orders:", err.message);
        } finally {
            setLoading(false);
            setIsLoaded(true);
        }
    }, [profile, isAdmin]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await ordersService.updateStatus(orderId, newStatus);
            await fetchOrders();
        } catch (err) {
            alert("Gagal update status: " + err.message);
        }
    };

    // ── Stats ringkas ──
    const stats = React.useMemo(() => {
        const total     = orders.length;
        const completed = orders.filter((o) => o.status === "completed").length;
        const pending   = orders.filter((o) => o.status === "pending").length;
        const totalPoin = orders.reduce((s, o) => s + (o.points_earned ?? 0), 0);
        const totalSpend = orders.reduce((s, o) => s + Number(o.total_amount), 0);
        return { total, completed, pending, totalPoin, totalSpend };
    }, [orders]);

    const memberTier = TIER_CONFIG[profile?.current_tier] ?? TIER_CONFIG.bronze;

    return (
        <div className="bg-[#FFF8EC] min-h-screen pb-10">
            <div className="px-10">
                <PageHeader
                    title={isAdmin ? "Order Management" : "My Orders"}
                    breadcrumb={["Dashboard", isAdmin ? "Orders" : "My Orders"]}
                >
                    {/* Member: shortcut ke katalog */}
                    {!isAdmin && (
                        <Link
                            to="/products"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-[#546B41]/20"
                        >
                            <FaShoppingCart />
                            Beli Produk
                        </Link>
                    )}
                </PageHeader>
            </div>

            <div className="px-10 mt-2 space-y-6">

                {/* ── Stats bar ── */}
                {!loading && orders.length > 0 && (
                    <div
                        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease-out" }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { label: "Total Order",    value: stats.total,                                              color: "text-[#546B41]" },
                            { label: "Selesai",        value: stats.completed,                                          color: "text-emerald-600" },
                            { label: "Menunggu",       value: stats.pending,                                            color: "text-yellow-600" },
                            { label: "Total Poin",     value: `+${stats.totalPoin}`,                                    color: "text-yellow-500", icon: <FaStar className="text-yellow-400 text-xs" /> },
                        ].map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#DCCCAC]/20 flex items-center gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider">{s.label}</p>
                                    <p className={`text-2xl font-black ${s.color} flex items-center gap-1 mt-0.5`}>
                                        {s.icon}{s.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Member: banner tier & diskon ── */}
                {!isAdmin && profile?.current_tier && (
                    <div className={`${memberTier.color} rounded-3xl p-5 flex items-center justify-between`}
                        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.7s ease-out 100ms" }}>
                        <div className={`${memberTier.text}`}>
                            <p className="text-xs font-black uppercase tracking-widest opacity-75">Tier Kamu</p>
                            <p className="text-xl font-black">{profile.current_tier.charAt(0).toUpperCase() + profile.current_tier.slice(1)}</p>
                        </div>
                        <div className={`text-right ${memberTier.text}`}>
                            <p className="text-xs font-black uppercase tracking-widest opacity-75">Total Poin</p>
                            <p className="text-3xl font-black flex items-center justify-end gap-1">
                                <FaStar className="text-yellow-300 text-lg" />
                                {profile.total_points?.toLocaleString("id-ID") ?? 0}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex justify-center items-center py-20 text-[#99AD7A]">
                        <FaSpinner className="animate-spin text-3xl mr-3" />
                        <span className="font-black uppercase tracking-widest text-sm">Memuat orders...</span>
                    </div>
                )}

                {/* ── Empty ── */}
                {!loading && orders.length === 0 && (
                    <div className="flex flex-col justify-center items-center py-24 text-[#DCCCAC] bg-white rounded-[2.5rem] border border-[#DCCCAC]/20">
                        <FaShoppingCart className="text-6xl mb-4" />
                        <p className="font-black uppercase tracking-widest text-sm mb-2">Belum ada order</p>
                        {!isAdmin && (
                            <Link to="/products"
                                className="mt-4 flex items-center gap-2 bg-[#546B41] text-[#FFF8EC] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-[#435634] transition-all active:scale-95">
                                <FaShoppingCart /> Mulai Belanja
                            </Link>
                        )}
                    </div>
                )}

                {/* ── Daftar Order (Card style untuk member, table untuk admin) ── */}

                {/* MEMBER: card-based */}
                {!loading && !isAdmin && orders.length > 0 && (
                    <div className="space-y-4">
                        {orders.map((order, i) => {
                            const status  = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                            const isOpen  = expandedId === order.id;
                            const hasDiscount = Number(order.discount_amount) > 0;

                            return (
                                <div
                                    key={order.id}
                                    style={{ transitionDelay: `${i * 50}ms`, opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(16px)" }}
                                    className="bg-white rounded-3xl border border-[#DCCCAC]/20 shadow-sm overflow-hidden transition-all duration-500"
                                >
                                    {/* Header kartu */}
                                    <div
                                        className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#FFF8EC]/50 transition-colors"
                                        onClick={() => setExpandedId(isOpen ? null : order.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#FFF8EC] rounded-2xl flex items-center justify-center">
                                                <FaReceipt className="text-[#99AD7A] text-lg" />
                                            </div>
                                            <div>
                                                <p className="font-black text-[#546B41] text-sm">
                                                    Order #{order.id.slice(0, 8).toUpperCase()}
                                                </p>
                                                <p className="text-[10px] font-bold text-[#DCCCAC] uppercase tracking-wider">
                                                    {new Date(order.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {/* Status */}
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${status.bg} ${status.text}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                {status.label}
                                            </span>
                                            {/* Total */}
                                            <div className="text-right hidden sm:block">
                                                <p className="font-black text-[#546B41]">
                                                    Rp {Number(order.total_amount).toLocaleString("id-ID")}
                                                </p>
                                                {order.points_earned > 0 && (
                                                    <p className="text-[10px] font-black text-yellow-500 flex items-center justify-end gap-1">
                                                        <FaStar /> +{order.points_earned} poin
                                                    </p>
                                                )}
                                            </div>
                                            {isOpen ? <FaChevronUp className="text-[#DCCCAC]" /> : <FaChevronDown className="text-[#DCCCAC]" />}
                                        </div>
                                    </div>

                                    {/* Expanded detail */}
                                    {isOpen && (
                                        <div className="border-t border-[#FFF8EC] px-6 pb-6 pt-4 space-y-3">
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                <div className="bg-[#FFF8EC] rounded-2xl p-4">
                                                    <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider mb-1">Subtotal</p>
                                                    <p className="font-black text-[#546B41] text-sm">Rp {Number(order.subtotal).toLocaleString("id-ID")}</p>
                                                </div>
                                                {hasDiscount && (
                                                    <div className="bg-green-50 rounded-2xl p-4">
                                                        <p className="text-[10px] font-black text-green-400 uppercase tracking-wider mb-1">Diskon</p>
                                                        <p className="font-black text-green-600 text-sm">- Rp {Number(order.discount_amount).toLocaleString("id-ID")}</p>
                                                    </div>
                                                )}
                                                <div className="bg-[#FFF8EC] rounded-2xl p-4">
                                                    <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider mb-1">Total Bayar</p>
                                                    <p className="font-black text-[#546B41] text-sm">Rp {Number(order.total_amount).toLocaleString("id-ID")}</p>
                                                </div>
                                                <div className="bg-yellow-50 rounded-2xl p-4">
                                                    <p className="text-[10px] font-black text-yellow-400 uppercase tracking-wider mb-1">Poin Didapat</p>
                                                    <p className="font-black text-yellow-600 text-sm flex items-center gap-1">
                                                        <FaStar /> {order.points_earned > 0 ? `+${order.points_earned}` : "—"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-bold text-[#DCCCAC] text-right">
                                                ID: {order.id}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ADMIN: table */}
                {!loading && isAdmin && orders.length > 0 && (
                    <div
                        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease-out" }}
                        className="bg-white rounded-[2.5rem] shadow-sm border border-[#DCCCAC]/20 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#FFF8EC]/50 border-b border-[#DCCCAC]/20">
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Order ID</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Member</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Total</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Diskon</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Poin</th>
                                        <th className="px-6 py-5 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Tanggal</th>
                                        <th className="px-6 py-5 text-center font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Update</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#FFF8EC]">
                                    {orders.map((order, i) => {
                                        const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                                        return (
                                            <tr key={order.id}
                                                style={{ transitionDelay: `${i * 35}ms`, opacity: isLoaded ? 1 : 0 }}
                                                className="hover:bg-[#FFF8EC]/40 transition-all duration-300 group">
                                                <td className="px-6 py-4 font-black text-[#546B41] text-xs">
                                                    #{order.id.slice(0, 8).toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-[#546B41] text-sm">
                                                    {order.member_id?.slice(0, 8).toUpperCase() ?? "—"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${status.bg} ${status.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-black text-sm text-[#546B41]">
                                                    Rp {Number(order.total_amount).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-sm text-green-600">
                                                    {Number(order.discount_amount) > 0
                                                        ? `- Rp ${Number(order.discount_amount).toLocaleString("id-ID")}`
                                                        : "—"}
                                                </td>
                                                <td className="px-6 py-4 font-black text-sm">
                                                    {order.points_earned > 0
                                                        ? <span className="text-yellow-500 flex items-center gap-1"><FaStar className="text-xs" />+{order.points_earned}</span>
                                                        : <span className="text-[#DCCCAC]">—</span>}
                                                </td>
                                                <td className="px-6 py-4 text-[#99AD7A] font-bold text-xs">
                                                    {new Date(order.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className="bg-[#FFF8EC] border border-[#DCCCAC] text-[#546B41] text-xs font-bold rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#546B41] transition-colors"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
