import { FaThLarge, FaShoppingBasket, FaUsers, FaPlus, FaExclamationTriangle, FaLock, FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all duration-200
        ${
          isActive
            ? "text-hijau bg-green-100 font-extrabold shadow-sm"
            : "text-gray-600 hover:text-hijau hover:bg-green-100 hover:font-extrabold"
        }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-80 flex-col bg-white p-10 shadow-lg"
    >
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900 leading-tight"
        >
          Sedap
          <b id="logo-dot" className="text-hijau ml-1">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      <div id="sidebar-menu" className="mt-10 flex-1 overflow-y-auto">
        <p className="px-4 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Main Menu
        </p>
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <FaThLarge className="mr-4 text-xl" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <FaShoppingBasket className="mr-4 text-xl" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <FaUsers className="mr-4 text-xl" /> Customers
            </NavLink>
          </li>
        </ul>

        <p className="px-4 mt-10 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Error Pages
        </p>
        <ul id="error-menu-list" className="space-y-3">
          <li>
            <NavLink id="menu-e400" to="/error-400" className={menuClass}>
              <FaExclamationTriangle className="mr-4 text-xl text-amber-500" /> Error 400
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-e401" to="/error-401" className={menuClass}>
              <FaLock className="mr-4 text-xl text-orange-500" /> Error 401
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-e403" to="/error-403" className={menuClass}>
              <FaUserShield className="mr-4 text-xl text-rose-500" /> Error 403
            </NavLink>
          </li>
        </ul>
      </div>

      <div id="sidebar-footer" className="mt-10">
        <div
          id="footer-card"
          className="bg-hijau p-6 rounded-2xl shadow-lg mb-8 flex items-center relative overflow-hidden"
        >
          <div className="z-10 w-2/3">
            <span className="text-white text-xs font-medium leading-relaxed block">
              Please organize your menus through button below!
            </span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2.5 mt-4 bg-white rounded-xl cursor-pointer"
            >
              <span className="text-gray-700 text-[11px] font-bold flex items-center">
                <FaPlus className="mr-2" /> Add Menus
              </span>
            </div>
          </div>
          <img
            id="footer-avatar"
            src="https://avatar.iran.liara.run/public/28"
            className="w-24 absolute -right-2 -bottom-2"
          />
        </div>
        
        <div className="px-2">
          <span id="footer-brand" className="font-bold text-gray-400 text-sm block">
            Sedap Restaurant Admin Dashboard
          </span>
          <p id="footer-copyright" className="font-light text-gray-400 text-xs mt-1">
            &copy; 2026 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}