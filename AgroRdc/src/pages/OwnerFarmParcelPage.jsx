import React from "react";
import OwnerSidebar from "../components/OwnerSidebar";

const parcels = [
    {
        group: "KIPUSHI MAIN - Haut-Katanga",
        rows: [
            {
                id: "KP-A01",
                crop: "White Maize (H614)",
                area: "24.5 Ha",
                date: "Nov 12, 2023",
                status: "In Progress",
                statusClass: "bg-green-100 text-green-800",
                icon: "corn",
                iconClass: "text-amber-600",
            },
            {
                id: "KP-B12",
                crop: "Soybean (S-02)",
                area: "18.2 Ha",
                date: "Dec 05, 2023",
                status: "Irrigating",
                statusClass: "bg-blue-100 text-blue-800",
                icon: "potted_plant",
                iconClass: "text-emerald-600",
                filled: true,
            },
        ],
    },
    {
        group: "LIKASI NORTH - Haut-Katanga",
        rows: [
            {
                id: "LK-N05",
                crop: "Yellow Maize",
                area: "45.0 Ha",
                date: "Oct 28, 2023",
                status: "Harvest Ready",
                statusClass: "bg-amber-100 text-amber-800",
                icon: "corn",
                iconClass: "text-amber-600",
            },
            {
                id: "LK-N08",
                crop: "Fallow",
                area: "12.0 Ha",
                date: "—",
                status: "Resting",
                statusClass: "bg-slate-100 text-slate-600",
                icon: "texture",
                iconClass: "text-slate-400",
            },
        ],
    },
];

export default function OwnerFarmParcelPage() {
    return (
        <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
            <OwnerSidebar active="Parcels" />

            <header className="sticky top-0 z-40 ml-64 flex items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur-sm">
                <div className="w-1/3">
                    <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#424752]">
              search
            </span>
                        <input
                            className="w-full rounded-full border border-[#c2c6d4] bg-[#f5f3f3] py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                            placeholder="Search farms or parcels..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-[#424752]">
                        <button className="transition-colors hover:text-[#003f87]">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="transition-colors hover:text-[#003f87]">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                        <button className="transition-colors hover:text-[#003f87]">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>

                    <div className="h-8 w-px bg-[#c2c6d4]" />

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold leading-tight text-[#1b1c1c]">Jean-Luc Kabila</p>
                            <p className="text-xs text-[#424752]">Owner</p>
                        </div>
                        <img
                            alt="Manager profile"
                            className="h-10 w-10 rounded-full border border-[#c2c6d4] object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVqDSySggsKRmErZr4wgvpBaX-Og3qd22koWL66U1BzOCNTROUKpTLwwYPTI4ExxaxCfn5bBKAqZYe9qNE2uIzRZ9iZraMJK415r0er6lRgPI2LAzsXTMnNSLglSkljjF-o5WSe7ROTpbc-Gg-B6oei9jc6pOeTQpU7ACdw2zFyY-WGWHClZE4cAmZwjyONI6SGiDMSoZMxmpxIq1wB5UpR6JCcNra-4zWsYKMHU9--dC5t23XGJa2Ox_I38bmzUUQs9vvyqOSUeA"
                        />
                    </div>
                </div>
            </header>

            <main className="ml-64 p-8">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="mb-1 text-[32px] font-semibold leading-10 text-[#1b1c1c]">
                            Farm & Parcel Management
                        </h2>
                        <p className="text-base text-[#424752]">
                            Oversee your agricultural assets across the Haut-Katanga region.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-[#003f87] px-4 py-2 text-sm font-semibold text-[#003f87] transition-colors hover:bg-[#d7e2ff]">
                            <span className="material-symbols-outlined">add_location</span>
                            Add New Farm
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-[#003f87] px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90">
                            <span className="material-symbols-outlined">grid_view</span>
                            Create Parcel
                        </button>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-12 gap-6">
                    <section className="col-span-12 flex flex-col gap-4 rounded-xl border border-[#c2c6d4] bg-white p-6 lg:col-span-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold text-[#1b1c1c]">Active Farm Locations</h3>
                            <button className="text-sm text-[#003f87] hover:underline">View map detail</button>
                        </div>

                        <div className="relative h-[240px] overflow-hidden rounded-lg bg-[#e4e2e1]">
                            <img
                                alt="map representation"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALBK0bS3Ng_3nkskuXwuhQfOWZef4Aw5KJd-OKWnUnAHf9QH_HwEuPJ83HuXBUYK59U902Bv-NWkuVo2aLgijsPPJrbYqaJXzj9dMzMt1Yedj5hw_j3lIX7G3LVJVtg8WNcE-eV5lxW9n3IQEG5ksFm-1DobJrbRzarFeB4Vih7-BjkilGq_5xnsWDxxkFHA_4C4zOtnVrhg7E7b2LR5yrc3GIZ0z1wMkjn5vHKrsKbjsc84r_dP1nf2oUMb06uH3qeMWkMA8Sn2g"
                            />
                            <div className="absolute inset-0 bg-[#003f87]/10" />
                            <div className="absolute left-4 top-4 rounded border border-[#c2c6d4] bg-white/90 p-3 shadow-sm backdrop-blur">
                                <InfoDot color="bg-[#003f87]" label="Kipushi Main: 450 Ha" />
                                <InfoDot color="bg-[#b6171e]" label="Likasi North: 120 Ha" />
                            </div>
                        </div>
                    </section>

                    <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
                        <StatCard
                            title="Total Surface Area"
                            value="570.4"
                            suffix="Ha"
                            icon="straighten"
                            iconBg="bg-[#acc7ff]"
                            iconText="text-[#003f87]"
                            trend="+12% Increase from last season"
                        />
                        <StatCard
                            title="Current Parcel Count"
                            value="24"
                            icon="category"
                            iconBg="bg-[#ffb694]"
                            iconText="text-[#722b00]"
                            chips={["18 Maize", "6 Soybeans"]}
                        />
                    </div>
                </div>

                <section className="overflow-hidden rounded-xl border border-[#c2c6d4] bg-white">
                    <div className="flex items-center justify-between border-b border-[#c2c6d4] p-6">
                        <h3 className="text-2xl font-semibold text-[#1b1c1c]">Detailed Inventory</h3>
                        <div className="flex gap-2">
                            <select className="rounded-lg border border-[#c2c6d4] bg-white px-3 py-2 text-sm outline-none focus:border-[#003f87]">
                                <option>All Farm Locations</option>
                                <option>Kipushi Main</option>
                                <option>Likasi North</option>
                            </select>
                            <button className="rounded-lg border border-[#c2c6d4] p-2 text-[#424752] transition-colors hover:bg-[#f0eded]">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                            <tr className="border-b border-[#c2c6d4] bg-[#f5f3f3]">
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-[#424752]">Farm / Parcel ID</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-[#424752]">Crop Type</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-[#424752]">Surface Area</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-[#424752]">Planting Date</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-[#424752]">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-[#424752]">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[#c2c6d4]">
                            {parcels.map((group) => (
                                <React.Fragment key={group.group}>
                                    <tr className="bg-[#e4e2e1]">
                                        <td className="px-6 py-2 text-sm font-semibold text-[#003f87]" colSpan={6}>
                                            {group.group}
                                        </td>
                                    </tr>
                                    {group.rows.map((row) => (
                                        <tr key={row.id} className="transition-colors hover:bg-[#f5f3f3]">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-blue-700">
                                                        <span className="material-symbols-outlined text-sm">tag</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-[#1b1c1c]">{row.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                            <span
                                className={`material-symbols-outlined text-lg ${row.iconClass}`}
                                style={row.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                            >
                              {row.icon}
                            </span>
                                                    <span className="text-sm">{row.crop}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">{row.area}</td>
                                            <td className="px-6 py-4 text-sm">{row.date}</td>
                                            <td className="px-6 py-4">
                          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${row.statusClass}`}>
                            {row.status}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-[#424752] transition-colors hover:text-[#003f87]">
                                                    <span className="material-symbols-outlined text-base">edit</span>
                                                </button>
                                                <button className="p-2 text-[#424752] transition-colors hover:text-[#003f87]">
                                                    <span className="material-symbols-outlined text-base">analytics</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#c2c6d4] bg-[#f5f3f3] p-6">
                        <p className="text-xs text-[#424752]">Showing 4 of 24 parcels</p>
                        <div className="flex gap-1">
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 text-sm disabled:opacity-50" disabled>
                                Previous
                            </button>
                            <button className="rounded border border-[#003f87] bg-[#003f87] px-3 py-1 text-sm text-white">
                                1
                            </button>
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 text-sm hover:bg-[#f0eded]">
                                2
                            </button>
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 text-sm hover:bg-[#f0eded]">
                                3
                            </button>
                            <button className="rounded border border-[#c2c6d4] bg-white px-3 py-1 text-sm hover:bg-[#f0eded]">
                                Next
                            </button>
                        </div>
                    </div>
                </section>

                <div className="mt-8 grid grid-cols-12 gap-6">
                    <section className="col-span-12 rounded-xl border border-[#c2c6d4] bg-white p-6 md:col-span-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-[#1b1c1c]">Local Climate - Lubumbashi</h4>
                            <span className="material-symbols-outlined text-amber-500">sunny</span>
                        </div>
                        <div className="mb-4 flex items-end gap-3">
                            <span className="text-[40px] font-bold leading-tight text-[#1b1c1c]">28°C</span>
                            <span className="mb-2 text-sm text-[#424752]">High humidity</span>
                        </div>
                        <MetricBar label="Precipitation Chance" value="15%" width="15%" color="bg-[#003f87]" />
                        <MetricBar label="Soil Moisture" value="Optimal (72%)" width="72%" color="bg-emerald-500" />
                    </section>

                    <section className="col-span-12 flex items-center justify-between rounded-xl bg-[#003f87] p-6 text-white md:col-span-8">
                        <div className="max-w-md">
                            <h4 className="mb-1 text-2xl font-semibold">Logistics Ready?</h4>
                            <p className="mb-4 text-sm opacity-90">
                                4 parcels in Likasi are approaching harvest window. Pre-booking transport now can save up to 15% in logistics costs.
                            </p>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#003f87] transition-colors hover:bg-[#d7e2ff]">
                                Book Transport Fleet
                            </button>
                        </div>
                        <div className="hidden sm:block">
                            <span className="material-symbols-outlined text-[80px] opacity-20">local_shipping</span>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

function InfoDot({ color, label }) {
    return (
        <div className="mb-1 flex items-center gap-2 text-sm text-[#424752] last:mb-0">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            <span>{label}</span>
        </div>
    );
}

function StatCard({ title, value, suffix, icon, iconBg, iconText, trend, chips }) {
    return (
        <section className="flex flex-1 flex-col justify-between rounded-xl border border-[#c2c6d4] bg-white p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-[#424752]">{title}</p>
                    <h4 className="text-[40px] font-bold leading-[48px] text-[#1b1c1c]">
                        {value} {suffix && <span className="text-2xl font-normal text-[#424752]">{suffix}</span>}
                    </h4>
                </div>
                <div className={`rounded-full p-3 ${iconBg}`}>
                    <span className={`material-symbols-outlined ${iconText}`}>{icon}</span>
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2 text-sm text-green-700">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>{trend}</span>
                </div>
            )}

            {chips && (
                <div className="mt-4 flex gap-2">
                    {chips.map((chip) => (
                        <span key={chip} className="rounded bg-[#f0eded] px-2 py-1 text-xs text-[#1b1c1c]">
              {chip}
            </span>
                    ))}
                </div>
            )}
        </section>
    );
}

function MetricBar({ label, value, width, color }) {
    return (
        <div className="mb-3">
            <div className="mb-1 flex justify-between text-xs">
                <span className="text-[#424752]">{label}</span>
                <span className="text-[#1b1c1c]">{value}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-[#f0eded]">
                <div className={`h-1 rounded-full ${color}`} style={{ width }} />
            </div>
        </div>
    );
}