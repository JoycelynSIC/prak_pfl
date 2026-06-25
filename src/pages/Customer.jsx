import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../components/PageHeader";
import { FaUserCircle, FaSpinner } from "react-icons/fa";
import { customersService } from "../services/customersService";

// Konfigurasi tampilan per tier
const TIER_CONFIG = {
  platinum: { label: "Platinum",  bg: "bg-purple-600",  text: "text-white" },
  gold:     { label: "Gold",      bg: "bg-yellow-400",  text: "text-yellow-900" },
  silver:   { label: "Silver",    bg: "bg-gray-400",    text: "text-white" },
  bronze:   { label: "Bronze",    bg: "bg-[#DCCCAC]",   text: "text-[#546B41]" },
};

export default function Customer() {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await customersService.getMembers();
      setMembers(data);
    } catch (err) {
      console.error("Gagal memuat data customer:", err.message);
    } finally {
      setLoading(false);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <div className="bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]} />
      </div>

      <div className="px-10 mt-2">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-[#99AD7A]">
            <FaSpinner className="animate-spin text-3xl mr-3" />
            <span className="font-black uppercase tracking-widest text-sm">Memuat data customer...</span>
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 text-[#DCCCAC]">
            <FaUserCircle className="text-5xl mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">Belum ada member terdaftar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {members.map((member, i) => {
              const tier = TIER_CONFIG[member.current_tier] ?? TIER_CONFIG.bronze;

              return (
                <div
                  key={member.id}
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  }}
                  className="bg-white p-6 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-[#DCCCAC]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out group"
                >
                  {/* Header kartu */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <FaUserCircle className="text-5xl text-[#DCCCAC] group-hover:text-[#99AD7A] transition-colors duration-500" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                    </div>
                    {/* Badge tier */}
                    <span
                      className={`text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-sm transition-all group-hover:rotate-6 ${tier.bg} ${tier.text}`}
                    >
                      {tier.label}
                    </span>
                  </div>

                  {/* Info utama */}
                  <h4 className="font-black text-[#546B41] text-lg mb-1 tracking-tight group-hover:text-[#99AD7A] transition-colors">
                    {member.full_name}
                  </h4>
                  <p className="text-[10px] text-[#99AD7A] font-black mb-4 tracking-[0.1em] uppercase opacity-60">
                    Member sejak {new Date(member.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                  </p>

                  {/* Poin & tier */}
                  <div className="space-y-2 border-t border-[#FFF8EC] pt-4">
                    <div className="flex justify-between items-center text-xs font-bold text-[#546B41]">
                      <span className="text-[#99AD7A]">Total Points</span>
                      <span className="font-black text-[#546B41]">
                        {member.total_points.toLocaleString("id-ID")} poin
                      </span>
                    </div>
                    {/* Progress bar simpel */}
                    <div className="w-full bg-[#FFF8EC] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${tier.bg}`}
                        style={{ width: `${Math.min((member.total_points / 1000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
