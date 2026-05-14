import React from "react";
import { FaThLarge, FaShoppingBasket, FaUsers, FaBoxOpen, FaPlus, FaExclamationTriangle, FaLock, FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 space-x-2 transition-all duration-300
        ${
          isActive
            ? "text-[#FFF8EC] bg-[#546B41] font-black shadow-lg shadow-[#546B41]/20 scale-[1.02]"
            : "text-[#99AD7A] hover:text-[#546B41] hover:bg-[#FFF8EC] hover:font-bold"
        }`;

  return (
    <div
      id="sidebar"
      className="flex w-80 min-h-full flex-col bg-white p-10 border-r border-[#DCCCAC]/30 shadow-xl shrink-0"
    >
      <div id="sidebar-logo" className="flex flex-col flex-shrink-0">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-[#546B41] leading-tight tracking-tighter"
        >
          Sedap
          <b id="logo-dot" className="text-[#99AD7A] ml-1">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-bold text-[#DCCCAC] text-xs uppercase tracking-[0.2em]">
          Selamat Datang di React Git App
        </span>
      </div>

      <div id="sidebar-menu" className="mt-12 flex-1">
        <p className="px-4 mb-5 text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em]">
          Main Menu
        </p>
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <FaThLarge className="mr-4 text-xl" /> 
              <span className="tracking-tight">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <FaShoppingBasket className="mr-4 text-xl" /> 
              <span className="tracking-tight">Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <FaUsers className="mr-4 text-xl" /> 
              <span className="tracking-tight">Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-4" to="/products" className={menuClass}>
              <FaBoxOpen className="mr-4 text-xl" /> 
              <span className="tracking-tight">Products</span>
            </NavLink>
          </li>
        </ul>

        <p className="px-4 mt-12 mb-5 text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em]">
          Error Pages
        </p>
        <ul id="error-menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-e400" to="/error-400" className={menuClass}>
              <FaExclamationTriangle className="mr-4 text-xl" /> 
              <span className="tracking-tight">Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-e401" to="/error-401" className={menuClass}>
              <FaLock className="mr-4 text-xl" /> 
              <span className="tracking-tight">Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-e403" to="/error-403" className={menuClass}>
              <FaUserShield className="mr-4 text-xl" /> 
              <span className="tracking-tight">Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div id="sidebar-footer" className="mt-20 flex-shrink-0">
        <div
          id="footer-card"
          className="bg-[#546B41] p-6 rounded-[2rem] shadow-xl shadow-[#546B41]/20 mb-8 flex items-center relative overflow-hidden"
        >
          <div className="z-10 w-2/3">
            <span className="text-[#FFF8EC] text-[11px] font-bold leading-relaxed block opacity-90">
              Please organize your menus through button below!
            </span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-3 mt-4 bg-[#FFF8EC] rounded-xl cursor-pointer hover:bg-[#DCCCAC] transition-colors shadow-sm"
            >
              <span className="text-[#546B41] text-[11px] font-black flex items-center uppercase tracking-tighter">
                <FaPlus className="mr-2" /> Add Menus
              </span>
            </div>
          </div>
          <img
            id="footer-avatar"
            src="https://avatar.iran.liara.run/public/28"
            className="w-24 absolute -right-2 -bottom-2 grayscale-[0.2] brightness-90 shadow-2xl"
          />
        </div>
        
        <div className="px-2">
          <span id="footer-brand" className="font-black text-[#546B41] text-[10px] uppercase tracking-widest block opacity-60">
            Sedap Restaurant
          </span>
          <p id="footer-copyright" className="font-bold text-[#DCCCAC] text-[9px] mt-1 tracking-tighter uppercase">
            &copy; 2026 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}