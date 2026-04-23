import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrders";
import DeliveryTracker from "../components/DeliveryTracker";

export default function Dashboard() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 11) return { text: "Selamat Pagi", icon: "🌅" };
        if (hour < 15) return { text: "Selamat Siang", icon: "☀️" };
        if (hour < 19) return { text: "Selamat Sore", icon: "🌆" };
        return { text: "Selamat Malam", icon: "🌙" };
    };

    const greeting = getGreeting();

    return (
        <div id="dashboard-container" className="bg-latar min-h-screen pb-10">
            <PageHeader />
            <div className="px-5 py-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tighter">
                        {greeting.text} {greeting.icon}
                    </h1>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">
                        Joycelyn Dhealiva • <span className="text-hijau">Admin Mode</span>
                    </p>
                </div>
            
                <div className="hidden md:block bg-white px-5 py-3 rounded-2xl shadow-sm border border-white text-right">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Live Time</p>
                    <p className="text-xl font-black text-gray-800 tabular-nums tracking-tight">
                        {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                </div>
            </div>
            
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold">75</span>
                        <span id="orders-text" className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-biru rounded-full p-4">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-merah rounded-full p-4">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-kuning rounded-full p-4">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-5 mt-2 items-start">
                <div className="lg:col-span-8">
                    <RecentOrders />
                </div>
                <div className="lg:col-span-4">
                    <DeliveryTracker />
                </div>
            </div>
        </div>
    );
}