import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function FiturXYZ() {
    return (
        <div id="fiturxyz-container" className="min-h-screen bg-[#FFF8EC] pb-10">
            <div className="px-10">
                <PageHeader title="Fitur XYZ" breadcrumb={["Home", "Fitur XYZ"]} />
                <p>Ini halaman Fitur XYZ</p>
            </div>
        </div>
    );
}
