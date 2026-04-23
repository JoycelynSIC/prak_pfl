import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Customer() {
    return (
        <div id="dashboard-container" className="bg-latar min-h-screen pb-10">
            <PageHeader />
            <p>Ini adalah halaman Customer</p>
        </div>
    );
}