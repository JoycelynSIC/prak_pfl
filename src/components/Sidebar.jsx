import React from "react";
import {
  FaThLarge,
  FaShoppingBasket,
  FaUsers,
  FaBoxOpen,
  FaExclamationTriangle,
  FaLock,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = profile?.role === "admin";

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 space-x-2 transition-all duration-300
      ${
        isActive
          ? "text-[#FFF8EC] bg-[#546B41] font-black shadow-lg shadow-[#546B41]/20 scale-[1.02]"
          : "text-[#99AD7A] hover:text-[#546B41] hover:bg-[#FFF8EC] hover:font-bold"
      }`;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div
      id="sidebar"
      className="flex w-80 h-screen sticky top-0 flex-col bg-white border-r border-[#DCCCAC]/30 shadow-xl shrink-0"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col flex-shrink-0 px-10 pt-10">
        <span className="font-poppins text-[48px] text-[#546B41] leading-tight tracking-tighter">
          Sedap
          <b className="text-[#99AD7A] ml-1">.</b>
        </span>
        <span className="font-bold text-[#DCCCAC] text-xs uppercase tracking-[0.2em]">
          {isAdmin ? "Admin Panel" : "Member Area"}
        </span>
      </div>

      {/* Menu utama — scrollable */}
      <div id="sidebar-menu" className="mt-12 flex-1 overflow-y-auto px-10">
        <p className="px-4 mb-5 text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em]">
          Main Menu
        </p>
        <ul className="space-y-3">
          {/* Dashboard — semua role */}
          <li>
            <NavLink to="/" end className={menuClass}>
              <FaThLarge className="mr-4 text-xl" />
              <span className="tracking-tight">Dashboard</span>
            </NavLink>
          </li>

          {/* Orders — semua role (tampilan berbeda per role, sudah di-handle di page) */}
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaShoppingBasket className="mr-4 text-xl" />
              <span className="tracking-tight">{isAdmin ? "Orders" : "My Orders"}</span>
            </NavLink>
          </li>

          {/* Products — semua role */}
          <li>
            <NavLink to="/products" className={menuClass}>
              <FaBoxOpen className="mr-4 text-xl" />
              <span className="tracking-tight">Products</span>
            </NavLink>
          </li>

          {/* Customers — hanya admin */}
          {isAdmin && (
            <li>
              <NavLink to="/customers" className={menuClass}>
                <FaUsers className="mr-4 text-xl" />
                <span className="tracking-tight">Customers</span>
              </NavLink>
            </li>
          )}
        </ul>

        {/* Error pages — hanya admin */}
        {isAdmin && (
          <>
            <p className="px-4 mt-12 mb-5 text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em]">
              Error Pages
            </p>
            <ul className="space-y-3">
              <li>
                <NavLink to="/error-400" className={menuClass}>
                  <FaExclamationTriangle className="mr-4 text-xl" />
                  <span className="tracking-tight">Error 400</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/error-401" className={menuClass}>
                  <FaLock className="mr-4 text-xl" />
                  <span className="tracking-tight">Error 401</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/error-403" className={menuClass}>
                  <FaUserShield className="mr-4 text-xl" />
                  <span className="tracking-tight">Error 403</span>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Footer sidebar — selalu di bawah, tidak ikut scroll */}
      <div className="flex-shrink-0 px-10 pb-10 pt-4 border-t border-[#DCCCAC]/20 bg-white">
        {/* Profil singkat */}
        <div className="bg-[#FFF8EC] rounded-[2rem] p-5 mb-4 flex items-center gap-4 border border-[#DCCCAC]/20">
          <img
            src={`https://avatar.iran.liara.run/public/${isAdmin ? "28" : "45"}`}
            className="w-12 h-12 rounded-full border-2 border-[#546B41] p-0.5 shrink-0"
            alt="avatar"
          />
          <div className="min-w-0">
            <p className="font-black text-[#546B41] text-sm truncate">
              {profile?.full_name ?? "—"}
            </p>
            <p className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">
              {profile?.role ?? "—"}
              {!isAdmin && profile?.current_tier ? ` · ${profile.current_tier}` : ""}
            </p>
          </div>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white border-2 border-[#DCCCAC]/30 text-[#99AD7A] hover:text-red-500 hover:border-red-200 font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
        >
          <FaSignOutAlt />
          Sign Out
        </button>

        <div className="px-2 mt-6">
          <span className="font-black text-[#546B41] text-[10px] uppercase tracking-widest block opacity-60">
            Sedap Restaurant
          </span>
          <p className="font-bold text-[#DCCCAC] text-[9px] mt-1 tracking-tighter uppercase">
            &copy; 2026 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
