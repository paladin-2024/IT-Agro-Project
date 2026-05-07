import React from "react";
import OwnerSidebar from "../components/OwnerSidebar";

export default function OwnerDashboard() {
    const parcels = [
        {
            id: "PRC-882-KW",
            region: "Kwilu",
            crop: "Cassava",
            yield: "842.5",
            status: "Harvesting",
            statusClass: "bg-green-100 text-green-800",
            last: "2 hours ago",
        },
        {
            id: "PRC-441-KC",
            region: "Kongo Central",
            crop: "Maize",
            yield: "610.2",
            status: "Irrigating",
            statusClass: "bg-blue-100 text-blue-800",
            last: "5 hours ago",
        },
        {
            id: "PRC-109-TK",
            region: "Tshuapa",
            crop: "Palm Oil",
            yield: "582.0",
            status: "Fertilizing",
            statusClass: "bg-orange-100 text-orange-800",
            last: "Yesterday",
        },
        {
            id: "PRC-323-LU",
            region: "Lualaba",
            crop: "Cassava",
            yield: "490.1",
            status: "Warning",
            statusClass: "bg-red-100 text-red-700",
            last: "Just now",
        },
    ];

    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#DEE2E6] bg-white px-6 font-[Work_Sans] text-sm antialiased">
                    <div className="flex items-center gap-6">
                        <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
                            <input
                                className="w-80 rounded-full border-none bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#0056B3]"
                                placeholder="Search parcels, crops, or logistics..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-50">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#b6171e]" />
                        </button>
                        <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-50">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2" />
                        <div className="flex cursor-pointer items-center gap-3">
                            <div className="text-right">
                                <p className="font-bold leading-none text-[#1b1c1c]">Kabangu Mulumba</p>
                                <p className="text-[10px] text-slate-500">Operation Owner</p>
                            </div>
                            <img
                                alt="User profile avatar"
                                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc4VUDp6M2hfXgyKsLrnuUt_WpoSfvo6PKg2uqu-pqJMVD-D5359tx8tG4RFZcRQr3Vf8QE8jAjGOKb95GihCYSIipXG8adO7wfomWaU3fVY3hTfWsT3FW8R31X35toYoKtLF746V4kefTvxVuRE0bR6VR1g1CHj0HSEAXYi8GShkkgZZgGsDzjhx5qx1TBVPlkd_295874qa6DBPBKOC4S-T6PgP852bNOQzFQTYiXQHBnj74w15iYut2jafTEFbwlcs-1q5mXTI"
                            />
                        </div>
                    </div>
                </header>

                <div className="space-y-8 p-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-semibold text-[#1b1c1c]">Operation Overview</h2>
                            <p className="text-base text-slate-500">
                                Real-time agricultural performance across DRC regions.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 rounded border border-[#DEE2E6] bg-white px-4 py-2 shadow-sm">
                <span className="material-symbols-outlined text-sm text-[#0056B3]">
                  calendar_today
                </span>
                                <span className="text-sm font-medium">Oct 2023 - Mar 2024</span>
                            </div>
                            <button className="flex items-center gap-2 rounded border border-[#DEE2E6] bg-white px-4 py-2 shadow-sm hover:bg-slate-50">
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <section className="group relative col-span-12 overflow-hidden rounded-xl bg-[#0056B3] p-6 text-white shadow-lg lg:col-span-4">
                            <div className="relative z-10 flex h-full flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <span className="text-sm font-medium opacity-80">Total Production</span>
                                    <span className="rounded-lg bg-white/20 p-2">
                    <span className="material-symbols-outlined">show_chart</span>
                  </span>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold">
                                        14,280 <span className="text-lg font-normal opacity-80">tons</span>
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded bg-green-500/20 px-2 py-0.5 text-xs font-bold text-green-300">
                      <span className="material-symbols-outlined text-xs">arrow_upward</span>
                      12.4%
                    </span>
                                        <span className="text-xs opacity-70">vs previous season</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-transform group-hover:scale-125" />
                        </section>

                        <StatCard title="Yield per Hectare" value="4.2" suffix="t/ha" progress={84} icon="grid_view" />
                        <StatCard title="Active Parcels" value="128" suffix="Total" icon="location_on" compact />
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <section className="col-span-12 rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#1b1c1c]">Production Trends</h3>
                                    <p className="text-sm text-slate-500">Actual Production vs. Seasonal Forecast</p>
                                </div>
                                <div className="flex gap-4">
                                    <LegendItem color="bg-[#0056B3]" label="Actual" />
                                    <LegendItem color="bg-slate-300" label="Forecast" />
                                </div>
                            </div>

                            <div className="relative h-64 w-full">
                                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                                    <line stroke="#F1F3F5" strokeWidth="1" x1="0" x2="800" y1="0" y2="0" />
                                    <line stroke="#F1F3F5" strokeWidth="1" x1="0" x2="800" y1="50" y2="50" />
                                    <line stroke="#F1F3F5" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
                                    <line stroke="#F1F3F5" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                                    <path d="M0,150 Q100,140 200,100 T400,110 T600,60 T800,80" fill="none" stroke="#CBD5E1" strokeDasharray="8,4" strokeWidth="3" />
                                    <path d="M0,160 Q100,150 200,120 T400,130 T600,40 T800,50" fill="none" stroke="#0056B3" strokeLinejoin="round" strokeWidth="4" />
                                    <path d="M0,160 Q100,150 200,120 T400,130 T600,40 T800,50 V200 H0 Z" fill="#0056B3" opacity="0.1" />
                                </svg>
                                <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                                </div>
                            </div>
                        </section>

                        <section className="col-span-12 flex flex-col rounded-xl border border-[#DEE2E6] bg-white p-6 lg:col-span-4">
                            <h3 className="mb-1 text-2xl font-semibold text-[#1b1c1c]">Best Crops</h3>
                            <p className="mb-8 text-sm text-slate-500">Yield contribution by crop type</p>

                            <div className="relative flex flex-1 items-center justify-center">
                                <svg className="h-48 w-48" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F3F5" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0056B3" strokeDasharray="163 251" strokeDashoffset="0" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#acc7ff" strokeDasharray="63 251" strokeDashoffset="-163" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#727784" strokeDasharray="25 251" strokeDashoffset="-226" strokeWidth="12" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold">65%</span>
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Cassava</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <LegendDot color="bg-[#0056B3]" label="Cassava (65%)" />
                                <LegendDot color="bg-[#acc7ff]" label="Maize (25%)" />
                                <LegendDot color="bg-[#727784]" label="Palm Oil (10%)" />
                            </div>
                        </section>
                    </div>

                    <section className="overflow-hidden rounded-xl border border-[#DEE2E6] bg-white">
                        <div className="flex items-center justify-between border-b border-[#DEE2E6] bg-slate-50/50 p-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#1b1c1c]">Top Performing Parcels</h3>
                                <p className="text-sm text-slate-500">Ranking by harvest efficiency and quality score</p>
                            </div>
                            <button className="text-sm font-semibold text-[#0056B3] hover:underline">View All Parcels</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4">Parcel ID</th>
                                    <th className="px-6 py-4">Region</th>
                                    <th className="px-6 py-4">Crop Type</th>
                                    <th className="px-6 py-4">Yield (Tons)</th>
                                    <th className="px-6 py-4">Growth Status</th>
                                    <th className="px-6 py-4">Last Activity</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-[#DEE2E6]">
                                {parcels.map((p, i) => (
                                    <tr key={p.id} className={`${i % 2 ? "bg-[#F1F3F5]/30" : ""} transition-colors hover:bg-slate-50`}>
                                        <td className="px-6 py-4 font-bold text-[#003f87]">{p.id}</td>
                                        <td className="px-6 py-4">{p.region}</td>
                                        <td className="px-6 py-4">{p.crop}</td>
                                        <td className="px-6 py-4">{p.yield}</td>
                                        <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${p.statusClass}`}>
                          {p.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{p.last}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <InfoCard icon="cloud_sync" title="Satellite Sync" subtitle="Last updated: 14:20 CAT" iconBg="bg-blue-50 text-[#003f87]" />
                        <InfoCard icon="inventory_2" title="Fertilizer Stock" subtitle="Optimal levels (88%)" iconBg="bg-green-50 text-green-700" />
                        <InfoCard icon="warning" title="Pending Alerts" subtitle="3 priority issues found" iconBg="bg-orange-50 text-orange-700" />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 right-8 md:hidden">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0056B3] text-white shadow-2xl transition-transform hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>
    );
}

function StatCard({ title, value, suffix, icon, progress, compact = false }) {
    return (
        <div className="col-span-12 flex flex-col justify-between rounded-xl border border-[#DEE2E6] bg-white p-6 md:col-span-6 lg:col-span-4">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{title}</span>
                <span className={`rounded-lg p-2 ${compact ? "bg-red-50 text-[#b6171e]" : "bg-blue-50 text-[#0056B3]"}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </span>
            </div>

            <div>
                <p className="text-3xl font-bold">
                    {value} <span className="text-sm font-medium text-slate-400">{suffix}</span>
                </p>

                {!compact ? (
                    <>
                        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full bg-[#0056B3]" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500">{progress}% of target efficiency reached</p>
                    </>
                ) : (
                    <div className="mt-4 flex gap-2">
                        <div className="flex-1 rounded bg-green-50 px-3 py-2 text-center text-xs font-bold text-green-700">
                            112 Healthy
                        </div>
                        <div className="flex-1 rounded bg-red-50 px-3 py-2 text-center text-xs font-bold text-[#b6171e]">
                            16 At Risk
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function LegendItem({ color, label }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-xs font-medium">{label}</span>
        </div>
    );
}

function LegendDot({ color, label }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${color}`} />
            <span className="text-xs font-medium">{label}</span>
        </div>
    );
}

function InfoCard({ icon, title, subtitle, iconBg }) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-[#DEE2E6] bg-white p-6">
            <div className={`rounded-lg p-3 ${iconBg}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
}