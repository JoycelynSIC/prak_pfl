import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div id="header-container" className="flex justify-between items-center p-6 bg-[#FFF8EC]">
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    className="border-2 border-[#DCCCAC] p-3 pr-12 bg-white w-full rounded-2xl outline-none focus:border-[#546B41] transition-all text-[#546B41] placeholder-[#DCCCAC] font-medium"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#99AD7A]" />
            </div>

            <div id="icons-container" className="flex items-center space-x-4">
                <div id="notification-icon" className="relative p-3 bg-white border border-[#DCCCAC] rounded-2xl text-[#546B41] cursor-pointer hover:bg-[#FFF8EC] transition-all">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#546B41] text-[#FFF8EC] rounded-full px-2 py-0.5 text-[10px] font-bold shadow-md">
                        50
                    </span>
                </div>
                
                <div id="chart-icon" className="p-3 bg-white border border-[#DCCCAC] rounded-2xl cursor-pointer hover:bg-[#FFF8EC] transition-all">
                    <FcAreaChart />
                </div>

                <div id="settings-icon" className="p-3 bg-white border border-[#DCCCAC] rounded-2xl text-[#99AD7A] cursor-pointer hover:bg-[#FFF8EC] transition-all">
                    <SlSettings />
                </div>

                <div id="profile-container" className="flex items-center space-x-4 border-l-2 pl-4 border-[#DCCCAC]">
                    <span id="profile-text" className="text-[#546B41] text-sm">
                        Hello, <b className="font-black">Joycelyn Dhealiva</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://avatar.iran.liara.run/public/28"
                        className="w-10 h-10 rounded-full border-2 border-[#546B41] p-0.5"
                    />
                </div>
            </div>
        </div>
    );
}