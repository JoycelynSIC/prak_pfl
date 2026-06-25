import React, { useState, useEffect, useCallback } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaStar, FaMedal } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrders";
import DeliveryTracker from "../components/DeliveryTracker";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { ordersService } from "../services/ordersService";

// ── Config tier untuk member dashboard ──
const TIER_CONFIG = {
  platinum: { label: "Platinum", nextLabel: null,    nextPoints: null,   color: "bg-purple-600", text: "text-white",        max: 1000 },
  gold:     { label: "Gold",     nextLabel: "Platinum", nextPoints: 1000, color: "bg-yellow-400", text: "text-yellow-900",   max: 1000 },
  silver:   { label: "Silver",   nextLabel: "Gold",     nextPoints: 500,  color: "bg-gray-400",   text: "text-white",        max: 500  },
  bronze:   { label: "Bronze",   nextLabel: "Silver",   nextPoints: 100,  color: "bg-[#DCCCAC]",  text: "text-[#546B41]",   max: 100  },
};

const TIER_DISCOUNT = {
  bronze: 0, silver: 5, gold: 10, platinum: 15,
};

// ── Admin stats hardcoded (bisa di-replace dengan fetch nantinya) ──
const ADMIN_STATS = [
  { label: "Total Orders", value: "—",   icon: <FaShoppingCart />, color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
  { label: "Delivered",    value: "—",   icon: <FaTruck />,        color: "bg-[#99AD7A]", shadow: "shadow-[#99AD7A]/20", textColor: "text-[#FFF8EC]" },
  { label: "Canceled",     value: "—",   icon: <FaBan />,          color: "bg-[#DCCCAC]", shadow: "shadow-[#DCCCAC]/20", textColor: "text-[#546B41]" },
  { label: "Revenue",      value: "—",   icon: <FaDollarSign />,   color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const [time, setTime]         = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  // State khusus member
  const [myOrders, setMyOrders]       = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch order milik member untuk stats personal
  const fetchMyOrders = useCallback(async () => {
    if (!profile || isAdmin) return;
    setOrdersLoading(true);
    try {
      const data = await ordersService.getMyOrders(profile.id);
      setMyOrders(data);
    } catch (err) {
      console.error("Gagal memuat orders:", err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, [profile, isAdmin]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const getGreeting = () => {
    const h = time.getHours();
    if (h < 11) return { text: "Selamat Pagi",  icon: "🌅" };
    if (h < 15) return { text: "Selamat Siang", icon: "☀️" };
    if (h < 19) return { text: "Selamat Sore",  icon: "🌆" };
    return       { text: "Selamat Malam", icon: "🌙" };
  };
  const greeting = getGreeting();

  // ── Hitung stats member ──
  const memberStats = React.useMemo(() => {
    const total     = myOrders.length;
    const completed = myOrders.filter((o) => o.status === "completed").length;
    const cancelled = myOrders.filter((o) => o.status === "cancelled").length;
    const totalSpend = myOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
    return { total, completed, cancelled, totalSpend };
  }, [myOrders]);

  const tier = TIER_CONFIG[profile?.current_tier] ?? TIER_CONFIG.bronze;
  const totalPoints = profile?.total_points ?? 0;

  // Progress menuju tier berikutnya
  const progressPercent = tier.nextPoints
    ? Math.min((totalPoints / tier.nextPoints) * 100, 100)
    : 100;

  // ════════════════════════════════════════
  // ── Render Admin ──
  // ════════════════════════════════════════
  if (isAdmin) {
    return (
      <div id="dashboard-container" className="min-h-screen bg-[#FFF8EC] pb-10">
        <div className="px-10">
          <PageHeader
            title={`${greeting.text} ${greeting.icon}`}
            breadcrumb={[profile?.full_name ?? "Admin", "Admin Mode"]}
          >
            <div className="flex flex-col items-end bg-white px-5 py-2.5 rounded-2xl border border-[#DCCCAC]/40 shadow-sm">
              <p className="text-[9px] font-black text-[#DCCCAC] uppercase tracking-[0.2em] mb-0.5">Live Time</p>
              <p className="text-lg font-black text-[#546B41] tabular-nums leading-none">
                {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </p>
            </div>
          </PageHeader>
        </div>

        <div id="dashboard-grid" className="px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-2">
          {ADMIN_STATS.map((item, i) => (
            <Card
              key={i}
              style={{ transitionDelay: `${i * 100}ms`, opacity: isLoaded ? 1 : 0, transform: isLoaded ? "scale(1)" : "scale(0.9) translateY(10px)" }}
              className="flex items-center space-x-5 bg-white rounded-[2rem] shadow-sm border-2 border-transparent hover:border-[#DCCCAC]/50 transition-all duration-500 p-5 group cursor-default"
            >
              <div className={`${item.color} rounded-2xl p-4 shadow-lg ${item.shadow} group-hover:rotate-6 transition-transform duration-300`}>
                {React.cloneElement(item.icon, { className: `text-xl ${item.textColor}` })}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#546B41] tracking-tight">{item.value}</span>
                <span className="text-[#99AD7A] text-[10px] font-black uppercase tracking-wider">{item.label}</span>
              </div>
            </Card>
          ))}
        </div>

        <div
          style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out 400ms" }}
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

  // ════════════════════════════════════════
  // ── Render Member ──
  // ════════════════════════════════════════
  const memberStatsCards = [
    { label: "Total Orders",   value: ordersLoading ? "…" : memberStats.total,     icon: <FaShoppingCart />, color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
    { label: "Completed",      value: ordersLoading ? "…" : memberStats.completed, icon: <FaTruck />,        color: "bg-[#99AD7A]", shadow: "shadow-[#99AD7A]/20", textColor: "text-[#FFF8EC]" },
    { label: "Cancelled",      value: ordersLoading ? "…" : memberStats.cancelled, icon: <FaBan />,          color: "bg-[#DCCCAC]", shadow: "shadow-[#DCCCAC]/20", textColor: "text-[#546B41]" },
    { label: "Total Belanja",  value: ordersLoading ? "…" : `Rp ${memberStats.totalSpend.toLocaleString("id-ID")}`, icon: <FaDollarSign />, color: "bg-[#546B41]", shadow: "shadow-[#546B41]/20", textColor: "text-[#FFF8EC]" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader
          title={`${greeting.text}, ${profile?.full_name?.split(" ")[0] ?? "Member"} ${greeting.icon}`}
          breadcrumb={[profile?.full_name ?? "Member", "My Dashboard"]}
        >
          <div className="flex flex-col items-end bg-white px-5 py-2.5 rounded-2xl border border-[#DCCCAC]/40 shadow-sm">
            <p className="text-[9px] font-black text-[#DCCCAC] uppercase tracking-[0.2em] mb-0.5">Live Time</p>
            <p className="text-lg font-black text-[#546B41] tabular-nums leading-none">
              {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
          </div>
        </PageHeader>
      </div>

      {/* ── Stats Cards ── */}
      <div className="px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-2">
        {memberStatsCards.map((item, i) => (
          <Card
            key={i}
            style={{ transitionDelay: `${i * 100}ms`, opacity: isLoaded ? 1 : 0, transform: isLoaded ? "scale(1)" : "scale(0.9) translateY(10px)" }}
            className="flex items-center space-x-5 bg-white rounded-[2rem] shadow-sm border-2 border-transparent hover:border-[#DCCCAC]/50 transition-all duration-500 p-5 group cursor-default"
          >
            <div className={`${item.color} rounded-2xl p-4 shadow-lg ${item.shadow} group-hover:rotate-6 transition-transform duration-300`}>
              {React.cloneElement(item.icon, { className: `text-xl ${item.textColor}` })}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-black text-[#546B41] tracking-tight truncate">{item.value}</span>
              <span className="text-[#99AD7A] text-[10px] font-black uppercase tracking-wider">{item.label}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ── CRM Widget — Tier & Poin ── */}
      <div
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out 300ms" }}
        className="px-10 mt-6"
      >
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#DCCCAC]/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Kiri: tier badge + poin */}
            <div className="flex items-center gap-5">
              <div className={`${tier.color} rounded-2xl p-5 shadow-lg`}>
                <FaMedal className={`text-3xl ${tier.text}`} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.2em] mb-1">Tier Saat Ini</p>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-black text-[#546B41]`}>{tier.label}</span>
                  {/* Badge tier pakai Shadcn-style */}
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${tier.color} ${tier.text}`}>
                    {tier.label}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#99AD7A] mt-1">
                  <span className="text-[#546B41] font-black">{totalPoints.toLocaleString("id-ID")}</span> poin terkumpul
                </p>
              </div>
            </div>

            {/* Kanan: info diskon */}
            <div className="bg-[#FFF8EC] rounded-2xl px-6 py-4 text-center">
              <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.2em] mb-1">Diskon Pembelian</p>
              <p className="text-3xl font-black text-[#546B41]">{TIER_DISCOUNT[profile?.current_tier] ?? 0}%</p>
              <p className="text-[10px] text-[#99AD7A] font-bold uppercase">untuk order berikutnya</p>
            </div>
          </div>

          {/* Progress bar menuju tier berikutnya */}
          {tier.nextLabel && (
            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider mb-2">
                <span>{tier.label}</span>
                <span>
                  {tier.nextLabel} ({tier.nextPoints?.toLocaleString("id-ID")} poin)
                </span>
              </div>
              <div className="w-full bg-[#FFF8EC] rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${tier.color}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-bold text-[#99AD7A] mt-2">
                Butuh{" "}
                <span className="font-black text-[#546B41]">
                  {Math.max(0, (tier.nextPoints ?? 0) - totalPoints).toLocaleString("id-ID")} poin
                </span>{" "}
                lagi untuk naik ke {tier.nextLabel}
              </p>
            </div>
          )}

          {profile?.current_tier === "platinum" && (
            <div className="mt-6 flex items-center gap-3 bg-purple-50 rounded-2xl px-5 py-3">
              <FaStar className="text-purple-600 text-xl" />
              <p className="text-sm font-black text-purple-700">
                Kamu sudah di tier tertinggi! Nikmati diskon 15% di setiap pembelian.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
