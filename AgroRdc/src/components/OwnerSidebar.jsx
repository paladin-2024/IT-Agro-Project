import React from "react";

export default function OwnerSidebar() {
    const items = [
        ["space_dashboard", "Dashboard", true],
        ["opacity", "Soil Moisture", false],
        ["grass", "Crop Yields", false],
        ["local_shipping", "Logistics", false],
        ["group", "User Management", false],
        ["settings", "System Settings", false],
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-[#DEE2E6] bg-white pt-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8 px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0056B3]">
                        <span className="material-symbols-outlined text-white">agriculture</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black leading-tight text-[#0056B3] dark:text-blue-400">
                            AgriPrecise
                        </h1>
                        <p className="text-[10px] font-medium text-slate-500">DRC Agriculture Portal</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {items.map(([icon, label, active]) => (
                    <a
                        key={label}
                        href="#"
                        className={`flex items-center gap-3 px-3 py-3 font-[Work_Sans] text-sm font-medium transition-all duration-150 ease-in-out ${
                            active
                                ? "border-r-4 border-[#0056B3] bg-slate-100 text-[#0056B3] dark:bg-slate-800 dark:text-blue-300"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#0056B3] dark:text-slate-400 dark:hover:bg-slate-800/50"
                        }`}
                    >
                        <span className="material-symbols-outlined">{icon}</span>
                        <span>{label}</span>
                    </a>
                ))}
            </nav>

            <div className="mt-auto border-t border-[#DEE2E6] px-6 py-6 dark:border-slate-800">
                <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0056B3] py-2.5 text-white transition-colors hover:bg-[#003f87] active:opacity-80">
                    <span className="material-symbols-outlined text-sm">description</span>
                    Generate Report
                </button>

                <div className="space-y-4">
                    <a href="#" className="flex items-center gap-3 font-semibold text-slate-600 transition-colors hover:text-[#0056B3]">
                        <span className="material-symbols-outlined">contact_support</span>
                        <span>Support</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 font-semibold text-[#b6171e] transition-colors hover:opacity-80">
                        <span className="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </aside>
    );
}