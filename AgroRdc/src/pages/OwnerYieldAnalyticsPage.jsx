import React from "react";
import OwnerSidebar from "../components/OwnerSidebar";

export default function OwnerYieldAnalyticsPage() {
    const parcels = [
        {
            id: "B-14-NORTH",
            crop: "Palm Oil",
            area: "45.0",
            yield: "182.4",
            efficiency: "4.05",
            status: "Harvesting",
            statusClass: "bg-emerald-100 text-emerald-800",
            trend: "trending_up",
            trendClass: "text-emerald-600",
        },
        {
            id: "A-02-VALLEY",
            crop: "Cassava",
            area: "62.5",
            yield: "248.0",
            efficiency: "3.97",
            status: "Stable",
            statusClass: "bg-blue-100 text-blue-800",
            trend: "trending_flat",
            trendClass: "text-blue-500",
        },
        {
            id: "C-09-PLATEAU",
            crop: "Maize",
            area: "28.0",
            yield: "86.2",
            efficiency: "3.08",
            status: "Warning",
            statusClass: "bg-amber-100 text-amber-800",
            trend: "trending_down",
            trendClass: "text-amber-600",
        },
        {
            id: "B-15-SOUTH",
            crop: "Palm Oil",
            area: "40.0",
            yield: "158.0",
            efficiency: "3.95",
            status: "Harvesting",
            statusClass: "bg-emerald-100 text-emerald-800",
            trend: "trending_up",
            trendClass: "text-emerald-600",
        },
        {
            id: "D-01-FOREST",
            crop: "Cassava",
            area: "110.0",
            yield: "412.5",
            efficiency: "3.75",
            status: "Dormant",
            statusClass: "bg-slate-100 text-slate-800",
            trend: "remove",
            trendClass: "text-slate-400",
        },
    ];

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="min-h-screen pl-64">
                <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-[#0056b3]">Operations Hub</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <input
                                className="w-64 rounded-full border-none bg-[#f5f3f3] px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#0056b3]"
                                placeholder="Search data points..."
                                type="text"
                            />
                            <span className="material-symbols-outlined absolute right-3 top-2