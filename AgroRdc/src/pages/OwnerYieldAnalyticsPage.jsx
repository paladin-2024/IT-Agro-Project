import React from "react";
import OwnerSidebar from "../components/OwnerSidebar";

/* ─── Static data ────────────────────────────────────────────────────── */

const chartData = [
    { label: "Manioc",        actualPct: 100, projPct: 85,  actualVal: "420 t", projVal: "380 t" },
    { label: "Maïs",          actualPct: 60,  projPct: 70,  actualVal: "280 t", projVal: "320 t" },
    { label: "Huile de Palme",actualPct: 95,  projPct: 90,  actualVal: "510 t", projVal: "490 t" },
];

const parcels = [
    { id: "B-14-NORD",   crop: "Huile de Palme", area: "45.0",  yield: "182.4", eff: "4.05", status: "Récolte",  statusClass: "bg-emerald-100 text-emerald-800", trend: "trending_up",   trendClass: "text-emerald-600" },
    { id: "A-02-VALLEE", crop: "Manioc",          area: "62.5",  yield: "248.0", eff: "3.97", status: "Stable",   statusClass: "bg-blue-100 text-blue-800",     trend: "trending_flat", trendClass: "text-blue-500" },
    { id: "C-09-PLAT.",  crop: "Maïs",            area: "28.0",  yield: "86.2",  eff: "3.08", status: "Alerte",   statusClass: "bg-amber-100 text-amber-800",   trend: "trending_down", trendClass: "text-amber-600" },
    { id: "B-15-SUD",    crop: "Huile de Palme", area: "40.0",  yield: "158.0", eff: "3.95", status: "Récolte",  statusClass: "bg-emerald-100 text-emerald-800", trend: "trending_up",   trendClass: "text-emerald-600" },
    { id: "D-01-FORET",  crop: "Manioc",          area: "110.0", yield: "412.5", eff: "3.75", status: "Dormant",  statusClass: "bg-slate-100 text-slate-800",    trend: "remove",        trendClass: "text-slate-400" },
];

const milestones = [
    { icon: "check_circle", fill: true,  label: "Plantation",  sub: "Terminé le 24 Mai",       state: "done" },
    { icon: "check_circle", fill: true,  label: "Traitement",  sub: "Terminé le 12 Août",      state: "done" },
    { icon: "pending",      fill: false, label: "Récolte",     sub: "En cours (82%)",          state: "active" },
    { icon: "inventory_2",  fill: false, label: "Logistique",  sub: "Prévu le 05 Nov",         state: "pending" },
];

/* ─── Page component ─────────────────────────────────────────────────── */

export default function OwnerYieldAnalyticsPage() {
    return (
        <div className="min-h-screen bg-[#f4f6f9] text-[#1b1c1c]">
            <OwnerSidebar />

            <main className="ml-64 min-h-screen">
                {/* Sticky header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-[#1b1c1c]">Analyse des Rendements</h1>
                        <p className="text-xs text-slate-500">Métriques de performance en temps réel sur tous les secteurs</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">search</span>
                            <input
                                className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]"
                                placeholder="Rechercher des données…"
                                type="text"
                            />
                        </div>
                        <span className="material-symbols-outlined cursor-pointer text-slate-500 transition-colors hover:text-[#003f87]">notifications</span>
                        <span className="material-symbols-outlined cursor-pointer text-slate-500 transition-colors hover:text-[#003f87]">account_circle</span>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl space-y-8 p-8">
                    {/* Page title + filters */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-[#003f87]">Analyse des Rendements</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Métriques de performance en temps réel sur tous les secteurs de plantation.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-end gap-3">
                            <FilterSelect label="Saison">
                                <option>Grand Hiver (Pluies)</option>
                                <option>Petit Hiver</option>
                                <option>Saison Sèche</option>
                            </FilterSelect>
                            <FilterSelect label="Année">
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                            </FilterSelect>
                            <button className="flex h-[42px] items-center gap-2 self-end rounded-lg bg-[#003f87] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#002d63] active:scale-95">
                                <span className="material-symbols-outlined text-base">download</span>
                                Générer Rapport
                            </button>
                        </div>
                    </div>

                    {/* Bento grid */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Bar chart — col-span-8 */}
                        <div className="col-span-12 overflow-hidden rounded-xl bg-white p-6 ring-1 ring-slate-200 shadow-sm lg:col-span-8">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-base font-bold text-[#1b1c1c]">
                                    Comparaison des Rendements (Tonnes)
                                </h3>
                                <div className="flex gap-5">
                                    <LegendDot color="bg-[#003f87]" label="Réel" />
                                    <LegendDot color="bg-slate-300"  label="Prévision" />
                                </div>
                            </div>

                            <div className="relative h-72 border-b border-slate-100">
                                {/* Grid lines */}
                                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="h-px w-full bg-slate-100" />
                                    ))}
                                </div>

                                {/* Bars */}
                                <div className="relative z-10 flex h-full items-end justify-around px-4">
                                    {chartData.map((d) => (
                                        <div key={d.label} className="flex flex-1 flex-col items-center gap-3">
                                            <div className="flex w-full items-end justify-center gap-2 h-64">
                                                <div
                                                    className="w-10 rounded-t-sm bg-[#003f87] transition-all hover:opacity-80"
                                                    style={{ height: `${d.actualPct}%` }}
                                                    title={d.actualVal}
                                                />
                                                <div
                                                    className="w-10 rounded-t-sm bg-slate-300 transition-all hover:opacity-80"
                                                    style={{ height: `${d.projPct}%` }}
                                                    title={d.projVal}
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-[#1b1c1c]">{d.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right column — col-span-4 */}
                        <div className="col-span-12 flex flex-col gap-5 lg:col-span-4">
                            {/* Best crop spotlight */}
                            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#003f87] to-[#0056b3] p-6 text-white shadow-md">
                                <div className="relative z-10">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                                        <span className="material-symbols-outlined text-sm">verified</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Meilleure Culture</span>
                                    </div>
                                    <h2 className="text-4xl font-extrabold leading-tight">Huile de Palme</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                                        Densité de rendement exceptionnelle dans le Secteur B-14 — performance de pointe cette saison.
                                    </p>
                                </div>

                                <div className="relative z-10 mt-6">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                                                Hausse du rendement
                                            </p>
                                            <p className="text-2xl font-extrabold">+14.2%</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                                                Score durabilité
                                            </p>
                                            <p className="text-2xl font-extrabold">94/100</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decoration */}
                                <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-10">
                                    <span
                                        className="material-symbols-outlined text-[160px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        eco
                                    </span>
                                </div>
                            </div>

                            {/* Weather mini-widget */}
                            <div className="rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500">Kinshasa Nord</span>
                                    <span className="material-symbols-outlined text-amber-600">cloud_sync</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-5xl text-[#003f87]">partly_cloudy_day</span>
                                    <div>
                                        <p className="text-2xl font-extrabold text-[#1b1c1c]">31°C</p>
                                        <p className="text-xs text-slate-500">82% Humidité · Vent faible</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parcel yield table — col-span-12 */}
                        <div className="col-span-12 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm">
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                                <h3 className="text-base font-bold text-[#1b1c1c]">
                                    Rendement par Hectare par Parcelle
                                </h3>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-1 text-sm font-semibold text-[#003f87] transition-colors hover:underline">
                                        <span className="material-symbols-outlined text-base">filter_alt</span>
                                        Filtrer
                                    </button>
                                    <button className="flex items-center gap-1 text-sm font-semibold text-[#003f87] transition-colors hover:underline">
                                        <span className="material-symbols-outlined text-base">ios_share</span>
                                        Exporter CSV
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                            <th className="px-6 py-3.5">ID Parcelle</th>
                                            <th className="px-6 py-3.5">Type de Culture</th>
                                            <th className="px-6 py-3.5 text-right">Superficie (Ha)</th>
                                            <th className="px-6 py-3.5 text-right">Rendement (T)</th>
                                            <th className="px-6 py-3.5 text-right">Efficacité (T/Ha)</th>
                                            <th className="px-6 py-3.5">Statut</th>
                                            <th className="px-6 py-3.5 text-center">Tendance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {parcels.map((p, i) => (
                                            <tr
                                                key={p.id}
                                                className={`transition-colors hover:bg-slate-50 ${i % 2 === 1 ? "bg-slate-50/50" : "bg-white"}`}
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-xs font-bold text-[#003f87]">
                                                        {p.id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-700">{p.crop}</td>
                                                <td className="px-6 py-4 text-right text-slate-600">{p.area}</td>
                                                <td className="px-6 py-4 text-right font-semibold text-[#1b1c1c]">{p.yield}</td>
                                                <td className="px-6 py-4 text-right font-bold text-[#1b1c1c]">{p.eff}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.statusClass}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`material-symbols-outlined text-xl ${p.trendClass}`}>
                                                        {p.trend}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3.5">
                                <span className="text-xs text-slate-500">Affichage de 5 sur 42 parcelles</span>
                                <div className="flex gap-1">
                                    <button className="rounded border border-slate-200 p-1 transition-colors hover:bg-white">
                                        <span className="material-symbols-outlined text-base text-slate-500">chevron_left</span>
                                    </button>
                                    <button className="rounded border border-slate-200 p-1 transition-colors hover:bg-white">
                                        <span className="material-symbols-outlined text-base text-slate-500">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supply chain milestones */}
                    <section>
                        <h4 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Jalons de la Chaîne d'Approvisionnement
                        </h4>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {milestones.map((m) => (
                                <MilestoneCard key={m.label} {...m} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function FilterSelect({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</label>
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]">
                {children}
            </select>
        </div>
    );
}

function LegendDot({ color, label }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-xs text-slate-500">{label}</span>
        </div>
    );
}

function MilestoneCard({ icon, fill, label, sub, state }) {
    const styles = {
        done:    { wrap: "border-slate-200 bg-white",       icon: "bg-emerald-100 text-emerald-700", text: "text-[#1b1c1c]" },
        active:  { wrap: "border-slate-200 bg-white border-l-4 border-l-[#003f87]", icon: "bg-blue-100 text-[#003f87]", text: "text-[#1b1c1c]" },
        pending: { wrap: "border-slate-200 bg-white opacity-50", icon: "bg-slate-100 text-slate-400", text: "text-[#1b1c1c]" },
    }[state];

    return (
        <div className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm ${styles.wrap}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
                <span
                    className="material-symbols-outlined"
                    style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                    {icon}
                </span>
            </div>
            <div>
                <p className={`text-sm font-bold ${styles.text}`}>{label}</p>
                <p className="text-[11px] text-slate-500">{sub}</p>
            </div>
        </div>
    );
}
